# Bonus - Paranormal Activity

The description for this one said something about chasing down a poltergeist in hiding or something. To be honest, I love this description because that's exactly how this challenge felt but I actually found this flag by accident in a last ditch effort to look for a way to keep going in this track.

Remember how in challenge #3, we end up with a ton of images and tags? My gut feeling is that something was being hidden in that noise (other than the `FLAGPART` thing) because nearly all of those tags downloaded the exact same blobs. What if only one manifest downloads a secret blob with secret stuff in it? A needle in the haystack so to say... My strategy here was to read every single manifest in the registry, then count the usage of every blob downloaded. Surely we could find suspicious blobs with only one usage?

For this task, I started by writing `pullall.py` to download every single manifest in the registry:

```console
$ python pullall.py
$ ls -1 *.json
antichrist:az-girun.json
antichrist:brakoz.json
antichrist:dalrolos.json
antichrist:darzillon.json
antichrist:donniron.json
antichrist:dugrimid.json
antichrist:garganar.json
[...]
```
Yay, we have a ton of json manifests!

I then wrote `count_layer.py` to find out if we have any suspicious layers:

```console
$ python count_layer.py 
sha256:a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4: 1282
sha256:8beb9172fc3fd394735e93846d28885045c0100df2bd5708680df0c3c72904b1: 256
sha256:f29c8ecae6eae5e9e1b755eb7c2db2f9ad20feadfa4c7804bfd42fce4cf5aed8: 256
sha256:891a81dd41e9d09fe752d8f5405063d2e9cee4c85d727066ed8e977407ff6c45: 256
sha256:27203935de030ad318a6b085dbd8dbd6bde4b8a204c8893d6c42df635817dd1c: 256
sha256:280e0c739dbf56927fcd45f7289e2150b92d6d7f3518dbefd80272e587343ee3: 257
sha256:3ca2471c32d1d6612de2f5c112bd6525492ee188952e6e41b8a07aea7a1b2b3d: 257
sha256:99ac553f7759371090d6a2e6ac9e124abbfb769d586256a2cadb38a2da5e51cc: 257
sha256:98f1f36800083276fdf1a07f904cf5dff8419f7a5fe6fceab2f0dfdcfa61018e: 257
sha256:16a3784435db0c0e1fac0a959c8196821ad15123fb71669c9f9eb12677e98560: 257
sha256:41ccf86acdd7c84c2fc23b887c1458d476c978ab0a8858fc37ebf3ab8aeeb37e: 257
sha256:31c44ea08d43232760c11c30551862582d2ef692e2a8ba39ff658192cbdcc340: 257
sha256:b4ff4fcafd9557e53ba9c0f1485b641ec871beb77de4112ed25c81da67993707: 257
sha256:53c243bd6897dfd162f0e26c751a7e87cb19999bf70d105b8600dae4832a2601: 257
sha256:da7756e2f32fc72620b4b95cbaabd3923d15b7fe888dd47f930f83067960cf25: 257
sha256:eeb68859595b06999840e0c26ac446b1272c913435b08b1b1bf0fe19f2bc8965: 257
sha256:a0d0a0d46f8b52473982a3c466318f479767577551a53ffc9074c9fa7035982e: 257
sha256:41df43981f1fc47506c90b1f4cf099af53bc88b1e2f9117e3ff1a7526e171a25: 1
sha256:cc1e9486f9fbc00fb03665376904b226279d85fcd0d6c814519e91aca20f912a: 1
sha256:9e4a604921153e013d9c44466440dea5124caa030b6be60c35c8910a947fcd20: 1
sha256:bea0a24cc570b27609624b399c4685c8987e55be97d77e6dff3f1381154deecd: 1
sha256:a8529e4999a8bb5fc670190d829423b64b04ecfd7d4e6ecb3d57818cfb58304a: 1
sha256:670466dbfe412db824b195895af2b8caeb84a4cc8a0673701ed42efefda2477c: 1
```
What would you know? We have a bunch of sussy impostors! I quickly wrote `pullsus.py` to pull all of those sus layers to inspect them. I then extracted the sus layers, they all had the same contents:

```console
$ python pullsus.py
[...]
$ tar zxvf sha256\:41df43981f1fc47506c90b1f4cf099af53bc88b1e2f9117e3ff1a7526e171a25
usr/
usr/bin/
usr/bin/utils
```

*Hmmmmmmm* what could possibly be in that file???

```console
$ file usr/bin/utils 
usr/bin/utils: ASCII text, with no line terminators
$ cat usr/bin/utils 
HF-5a1afcc0-bca6-49c2-a0e6-0749375f2ce0
```

🚩