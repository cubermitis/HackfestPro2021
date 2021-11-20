# LvlUp 03 - Untold Horror

Using the Gitea access token I obtained in challenge #1 and the search result obtained in challenge #2, I cloned the only private repository the `Nemesis` user had.

```console
$ git clone https://devhole.hfctf.ca:3000/Umbrella_Corp/Alice.git
Cloning into 'Alice'...
Username for 'https://devhole.hfctf.ca:3000': Nemesis
Password for 'https://Nemesis@devhole.hfctf.ca:3000': 5111e2159e3e3cf1dc3bcfe6c8ad2bdd72d58438
remote: Enumerating objects: 44, done.
remote: Counting objects: 100% (44/44), done.
remote: Compressing objects: 100% (41/41), done.
remote: Total 44 (delta 15), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (44/44), 15.95 KiB | 7.97 MiB/s, done.
Resolving deltas: 100% (15/15), done.
```

I looked for stuff in the repository and found credentials for the private docker registry on port 8888 in `config.json`.

```console
$ echo "cHJpdmF0ZV9yZWFkOnZ0OWdzaFlCS3c1aFVrNEtXOTBi" | base64 -d
private_read:vt9gshYBKw5hUk4KW90b
```

Using those credentials, I could use cli and the docker registry api to poke around and list images in a similar way to challenge #1.

```shell
$ podman search devhole.hfctf.ca:8888/       
INDEX          NAME                              DESCRIPTION  STARS       OFFICIAL    AUTOMATED
hfctf.ca:8888  devhole.hfctf.ca:8888/antichrist               0                       
hfctf.ca:8888  devhole.hfctf.ca:8888/anubis                   0                       
hfctf.ca:8888  devhole.hfctf.ca:8888/cursed                   0                       
hfctf.ca:8888  devhole.hfctf.ca:8888/doom                     0                       
hfctf.ca:8888  devhole.hfctf.ca:8888/ezekiel                  0                       
hfctf.ca:8888  devhole.hfctf.ca:8888/hell                     0                       
hfctf.ca:8888  devhole.hfctf.ca:8888/nazgul                   0                       
hfctf.ca:8888  devhole.hfctf.ca:8888/plague                   0 
```

After some poking and prodding, it became apparent that each of those image repositories had numerous tags with random names. Though there were some tag names that stood out, namely tags `part1` to `part20`. Each of those tags' manifests had an additional layer setting an argument variable called `FLAGPART` with a value ranging from 1-3 characters.

```json
{
    "v1Compatibility": "{\"created\":\"2021-11-12T19:53:11.6427863Z\",\"docker_version\":\"20.10.8\",\"architecture\":\"amd64\",\"config\":{\"Hostname\":\"\",\"Domainname\":\"\",\"User\":\"\",\"AttachStdin\":false,\"AttachStdout\":false,\"AttachStderr\":false,\"Tty\":false,\"OpenStdin\":false,\"StdinOnce\":false,\"Env\":[\"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\",\"AWS_IAM_AUTH_VERSION=0.5.2\",\"FLAGPART=HF-\"],\"Cmd\":[\"/bin/sh\"],\"Image\":\"sha256:d9d7b3e4cf8ce6369356bbffd2b4adcd493e8e75f6bcd945c72aa6b959b2c14f\",\"Volumes\":null,\"WorkingDir\":\"/root\",\"Entrypoint\":null,\"OnBuild\":null,\"Labels\":null},\"container\":\"f524fd45cc4b7cad43140a7e8ddf5df21c81a0a50f8c4ca61a35a2c53f8959cb\",\"os\":\"linux\",\"container_config\":{\"Hostname\":\"f524fd45cc4b\",\"Domainname\":\"\",\"User\":\"\",\"AttachStdin\":false,\"AttachStdout\":false,\"AttachStderr\":false,\"Tty\":false,\"OpenStdin\":false,\"StdinOnce\":false,\"Env\":[\"PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\",\"AWS_IAM_AUTH_VERSION=0.5.2\",\"FLAGPART=HF-\"],\"Cmd\":[\"/bin/sh\",\"-c\",\"#(nop) \",\"ENV FLAGPART=HF-\"],\"Image\":\"sha256:d9d7b3e4cf8ce6369356bbffd2b4adcd493e8e75f6bcd945c72aa6b959b2c14f\",\"Volumes\":null,\"WorkingDir\":\"/root\",\"Entrypoint\":null,\"OnBuild\":null,\"Labels\":{}},\"id\":\"c42c4d01a4880b3cac2530a1fe5e992c7adcf176086ef950f5baa84738c7a24f\",\"parent\":\"18cc3e573a61d160ca6494dd15d8f1fce838153022b2b98f71be86eb1994105c\"}"
},
{                                                              
    "v1Compatibility": "{\"id\":\"18cc3e573a61d160ca6494dd15d8f1fce838153022b2b98f71be86eb1994105c\",\"created\":\"2021-11-12T19:53:10.1424741Z\",\"Cmd\":{\"container_config\":\"/bin/sh -c #(nop)  ARG FLAGPART\"},\"parent\":\"08174dde0223cb66c3996287a7ecefa9cd9d8a7c0504b5fad191e4bf5c2d0c84\",\"throwaway\":true}"
}
```

So, we need to traverse all of the images, read all of our tags and re-assemble the flag like a puzzle.

Challenge accepted. I wrote the solution in `solution.py`.

```console
$ python solution.py
HF-d05bf62f-b396-4c71-83ae-3cee5c637f93
```

🚩