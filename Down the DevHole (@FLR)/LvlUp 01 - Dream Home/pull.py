import requests
import tarfile

# r = requests.get("https://devhole.hfctf.ca:8081/repository/Left4Dead/v2/28/manifests/sha256:754eb69af077088001dc06be68d1e8edf80dcf1bc59febc00a39efb914ab319e")
r = requests.get("https://devhole.hfctf.ca:8081/repository/Left4Dead/v2/28/manifests/sha256:d02b8e953239b8063edc91910e920e722958a455577acb0649b5dfc83fb621c9")
manifest = r.json()

def download_file(url):
    local_filename = url.split('/')[-1]
    # NOTE the stream=True parameter below
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                # If you have chunk encoded response uncomment if
                # and set chunk_size parameter to None.
                #if chunk:
                f.write(chunk)
    return local_filename

for layer in manifest["layers"]:
  digest = layer["digest"]
  download_file(f"https://devhole.hfctf.ca:8081/repository/Left4Dead/v2/-/blobs/{digest}")
  print(f"downloaded digest {digest}")
  digest_tar = tarfile.open(digest)
  for member in digest_tar.getmembers():
    print(member.name)
  digest_tar.extractall("./rootfs") # specify which folder to extract to
  digest_tar.close()
  input("press enter to continue")