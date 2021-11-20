# 09 - Uncovering your deepest secrets

We discovered the flag for the previous challenge within the [`buildspec.yml`]() file for an AWS CodeBuild pipeline. In the `buildspec.yml` file, we also discover this:

```yml
version: 0.2
env:
  shell: bash
  secrets-manager:
    # ToDo: Review Secretsmanager access
    INVOKE_API_ROLE: carousel-app-infra-role-secret:role_arn
. . .
```

The Kanban Board from [02 - Letting you in if you ask nicely]() contained a to-do card mentioning:

> Review secretsmanager accesses

And, we find the flag (and a new role ARN we can presumably assume 
👀).

```console
$ aws secretsmanager get-secret-value --secret-id carousel-app-infra-role-secret --region us-east-1
{
    "ARN": "arn:aws:secretsmanager:us-east-1:146213847915:secret:carousel-app-infra-role-secret-I1dta2",
    "Name": "carousel-app-infra-role-secret",
    "VersionId": "f7d4c530-d7ed-42ad-b5b5-76f16f14bd6a",
    "SecretString": "{\"role_arn\":\"arn:aws:iam::146213847915:role/carousel-app-CiCdInvokeApiRole56EA5614-1PJVKR4MUSPFS\",\"flag9\":\"HF-wCA4zhtZwAO0SR5f0asfv9R1N9V9Zaxd\"}",
    "VersionStages": [
        "AWSCURRENT"
    ],
    "CreatedDate": 1637018674.232
}
```

🚩
