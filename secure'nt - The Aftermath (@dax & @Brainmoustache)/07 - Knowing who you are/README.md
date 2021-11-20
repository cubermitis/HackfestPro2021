# 07 - Knowing who you are

The Kanban Board alluded to a sensitive `id_token` that shouldn't be accessible clientside:

> Discard Cognito id_token instead of storing it since it could be a security issue

I discovered that this was a JWT and decoded it using [token.dev](https://token.dev/). 

The `id_token` JWT:

```plaintext
eyJraWQiOiJUR3RiaGJkODVkVnZ2M01yVDNmKzY0Y2xEdGJzb2JNZEt6VnVIWHo4UGl3PSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiR1NiX2lxcjVOYXlWY2dCcWdTX2lJUSIsInN1YiI6IjRhMjE5MDU3LTg5M2YtNGQ3ZS05MzE4LWRmYjczYmNhZDgzOSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9wZXJ1bFZPTmciLCJjb2duaXRvOnVzZXJuYW1lIjoiNGEyMTkwNTctODkzZi00ZDdlLTkzMTgtZGZiNzNiY2FkODM5IiwiYXVkIjoiNGlucm8wOWloNDNuZ2dnY2VnOXJwazRiazUiLCJldmVudF9pZCI6IjQ0NTcxMjAzLWNjMWQtNGJmYi05ZmNlLTc1ZDMxNDFlN2FiMyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjM3NDMxMzAyLCJleHAiOjE2Mzc0MzQ5MDIsImlhdCI6MTYzNzQzMTMwMywianRpIjoiODMwNzJmMzEtN2EyNC00NjIwLTlmZDktM2JkMzA4YmNmMGVhIiwiZW1haWwiOiJicmVzbG93cm9ja3lAZ21haWwuY29tIn0.DHHsCPRCBlEkczR_-bKZBXmMM2LC1XsmjZaT7a92rG9arBnXMR_q2lW_0IZZ6H8hIgyYCncg__s-pYL7gB6sqGCZxB4ebIEusPzgpw3Xp_W7E2eR2sDIju7P6mc1LX-0Vap636kIceyD1ZZad0DPwXmByd3uiWeEjH-WmCaajH1FbEL2EfkrtXFBXvx1kBuBOHB-RKHyFH7ltwiV_A8zuHlih_IpvVFE7HN-zfnu0kibldoAmveNCP4mTLpoaVfKPTMAxueHvZx25JzZF08wFRf5j43vEOloAdJYQVeT2Cz7sOT3s9HReYrJcDijNmH4T23BAHeOHayDh7LhhGOq1A
```

Decoded payload:

```json
{
  "at_hash": "GSb_iqr5NayVcgBqgS_iIQ",
  "sub": "4a219057-893f-4d7e-9318-dfb73bcad839",
  "email_verified": true,
  "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_perulVONg",
  "cognito:username": "4a219057-893f-4d7e-9318-dfb73bcad839",
  "aud": "4inro09ih43ngggceg9rpk4bk5",
  "event_id": "44571203-cc1d-4bfb-9fce-75d3141e7ab3",
  "token_use": "id",
  "auth_time": 1637431302,
  "exp": 1637434902,
  "iat": 1637431303,
  "jti": "83072f31-7a24-4620-9fd9-3bd308bcf0ea",
  "email": "joker@joker.org"
}
```

Next, I wrote a small NodeJS script, following the AWS docs and some googling that is now lost to time, to gain AWS CLI credentials for the Cognito user I created in the previous challenge.

```console
$ COGNITO_USERNAME="joker@joker.org" \
    COGNITO_PASSWORD="joker" node index.js

export AWS_ACCESS_KEY_ID=ASIASECYGINVVUVISEJK
export AWS_SECRET_ACCESS_KEY=AfTCRA4/e09pwGRT3alFsqK6k/Q0XEuu+5KDo4IH
export AWS_SESSION_TOKEN='IQoJb3JpZ2luX2VjEDoaCXVzLWVhc3QtMSJHMEUCIQDSQDaZWJIXl9CGn+umQVAcU5F3bHNaFSw3RuIlza4VAgIgOeA4V2JwcC0Vea45AgMABj9QDIb6fBy0VhgEe6q70QwqzQQI8///////////ARABGgwxNDYyMTM4NDc5MTUiDE9Kk+COfMPKVHXV9SqhBBUze1XaJarbOyZ71VfqhXsO2TNDSat5GPckTSJJe3hZKlapswS+JwVRrMcqs/W/ddAc1cktQAoaDNZnOck3LgWkLsrfPjeIDoEt7fV96HFlX9ufbMP45FrDE+MLi+bFfjSUaozaKLsU8e5sOnyzPKGrYGmEM0qS4OpliuYcT+jYPZsVU1ilLf8cWQDxH+2bsIw4Ed6kXRZGzAJMBFvhOJF169jeC6j2x5zlaojWxfAP4xsLo2/jkos88SrPKUXkDdpNo7SgqLWH9/JndP4LrmKVZgqss+5P5LVwdo5ztgWSEGQIJLTTevy5qVPpIdd9nu+sbe6zIRds6TtGooa9REayu1AcpaJ+YoIR/u1higtFtFk9/mfjGeNeR9B/Hhq/9a02yndFMVWSag9kdtEuHJ5hM8fkx5o5VpV1eawWZL3fCXohThDPiGT69NJFxpyjkj+VC1bWUhyhth2So9KGASRldwwAR9c2drJyFq3kHGzQyORx73dTurHBGEJe4K7ZBuQYI/oZ4mwm+Qo4UURN42oWLVOg2C/x2pK1h+3638/1tJm9QTZK7Q+mckhL7SdDT9DSapHdV9icqGH1fPe1nCByrSSNL2qvh6V6OgrYhrGDjzuW/F4JlN3kWlyQdEvvIMe9gNN+j8t06zCWnEYA2BD7Aq0tN6WxU6TzOTRCN3oG5wrxs+VO+rDGcznTrV4FI+4Si3VhKbTAOqgG9r2DRw/bMKPr5IwGOoUC8xeq7jJ81CGgrzK6Xl1xxgG2VytOLeRkadLr1KfMZUC/jCmWexJxxUNlWwsYBuLa363fJuYWDFkySt4Nagpq5gy/V/DbRxWnPQu+7A9q02rwjBXXSaqgbx/OnMWDNHylQb3ngywfI0oxPck18bu9VFAXRmXUxjdy4qNK0DIbYCfe5lXU3Cyc5Xhao5sZWOEH2PmbtSWGTkTnGQ1IFl0+FVFV6PaE3k5InOAhFv4NyLNCgssmIBr8XfRiVRc8iL/hslxXVMjXaxWRLuBR01CvQKqYusqJQRGHKPjs96wu+wIOWyb3NM4BtZ63gVNRDaOUg6v6S6RVZX0TfJ/dff8XJwT3/zNr'
```

1. And, the flag is in the caller identity / the name of the assumed role.

```console
$ aws sts get-caller-identity | tee | grep HF
{
    "UserId": "AROASECYGINVT2H3NVXL2:CognitoIdentityCredentials",
    "Account": "146213847915",
    "Arn": "arn:aws:sts::146213847915:assumed-role/HF-cfUz7VrRrpkrlvljFb66z2kMNwwD1yNz/CognitoIdentityCredentials"
}
```

🚩

Resources I found helpful:
- https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-browser-credentials-cognito.html
- https://docs.aws.amazon.com/cognito/latest/developerguide/getting-credentials.html
- https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-integrating-user-pools-with-identity-pools.html
