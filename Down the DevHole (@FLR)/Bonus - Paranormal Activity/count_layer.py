import os
import json

layer_stats = {}

for file in os.listdir(os.getcwd()):
   filename = os.fsdecode(file)
   if filename.endswith(".json"):
     with open(file, "r") as f:
       manifest = json.loads(f.read())
       f.close()
       for layer in manifest["fsLayers"]:
         blob_sum = layer["blobSum"]
         if blob_sum not in layer_stats:
           layer_stats[blob_sum] = 1
         else:
           layer_stats[blob_sum] += 1
   else:
     continue

for k, v in layer_stats.items():
  print(f"{k}: {v}")