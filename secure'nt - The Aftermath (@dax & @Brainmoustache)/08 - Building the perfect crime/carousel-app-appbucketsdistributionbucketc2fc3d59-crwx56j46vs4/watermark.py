import os
import re
import uuid
from typing import Dict, List
from urllib.parse import urlparse

import boto3
import requests
from aws_requests_auth.aws_auth import AWSRequestsAuth

INVOKE_URL_REGEX = r"^[a-z0-9]+\.execute-api\.(?P<region>[a-z]{2}-[a-z]+-\d)\.amazonaws\.com$"

SOURCE_BUCKET_NAME = os.environ["SOURCE_BUCKET_NAME"]
API_GATEWAY_URL = os.environ["API_GATEWAY_URL"]
INVOKE_API_ROLE = os.environ["INVOKE_API_ROLE"]

s3_client = boto3.client("s3")
sts_client = boto3.client("sts")


def main():
    key_list = get_key_list()
    aws_auth = get_aws_auth()
    image_list = []

    for key in key_list:
        image = watermark_image(generate_presigned_url(key), aws_auth)
        image_list.append(f"/public/{image}")

    print(",".join(image_list))


def get_key_list() -> List[str]:

    key_list = []

    paginator = s3_client.get_paginator("list_objects_v2")

    response_iterator = paginator.paginate(Bucket=SOURCE_BUCKET_NAME, Delimiter="/", EncodingType="url", FetchOwner=False)

    for page in response_iterator:
        for object in page["Contents"]:
            key_list.append(object["Key"])

    return key_list


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
    return response.json()["uploaded_image"].split("/")[-1]


def generate_presigned_url(key: str, expiration: int = 60) -> str:
    return s3_client.generate_presigned_url("get_object", Params={"Bucket": SOURCE_BUCKET_NAME, "Key": key}, ExpiresIn=expiration)


if __name__ == "__main__":
    main()
