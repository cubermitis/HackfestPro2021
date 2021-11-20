# 10 - Stalking you

I solved this at the same time that I solved [08 - Building the perfect crime]().

Just dump the CloudTrail audit logs bucket:

```console
$ aws s3 sync s3://carousel-app-appbucketscloudtrailbackupbucket045b-1572bcos4y7hp carousel-app-appbucketscloudtrailbackupbucket045b-1572bcos4y7hp
download: s3://carousel-app-appbucketscloudtrailbackupbucket045b-1572bcos4y7hp/AWSLogs/146213847915/CloudTrail/us-east-1/2021/11/15/146213847915_CloudTrail_us-east-1_20211115T2330Z_FwvQBJgITLqwux1R.json.gz to carousel-app-appbucketscloudtrailbackupbucket045b-1572bcos4y7hp/AWSLogs/146213847915/CloudTrail/us-east-1/2021/11/15/146213847915_CloudTrail_us-east-1_20211115T2330Z_FwvQBJgITLqwux1R.json.gz
download: s3://carousel-app-appbucketscloudtrailbackupbucket045b-1572bcos4y7hp/AWSLogs/146213847915/CloudTrail/us-east-1/2021/11/15/146213847915_CloudTrail_us-east-1_20211115T2335Z_YtYOIOXm5tGlYLI8.json.gz to carousel-app-appbucketscloudtrailbackupbucket045b-1572bcos4y7hp/AWSLogs/146213847915/CloudTrail/us-east-1/2021/11/15/146213847915_CloudTrail_us-east-1_20211115T2335Z_YtYOIOXm5tGlYLI8.json.gz
```

`gunzip` the larger of the two audit logs:

```console
$ gunzip 'carousel-app-appbucketscloudtrailbackupbucket045b-1572bcos4y7hp/AWSLogs/146213847915/CloudTrail/us-east-1/2021/11/15/146213847915_CloudTrail_us-east-1_20211115T2330Z_FwvQBJgITLqwux1R.json.gz'
```

And, once again, we use `ripgrep`:

```console
$ rg HF- carousel-app-appbucketscloudtrailbackupbucket045b-1572bcos4y7hp
[...] {"key": "FLAG10", "value": "HF-SCkpLLUIrZCZfK67sI7OAYQmDxBargWl"} [...]
```

🚩
