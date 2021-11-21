# 02 - Lovecrypt - Homework

The problem is pretty self explanatory. Follow the rules that are described on the page and it should yield one hash. This is our script:

```python
import string
import re

with open("hash") as h:
    d = h.read()

valid = []
for h in d.split():
    if h[0] in "02468" or not h[0] in "aeiou":
        continue

    if h[1] in string.digits:
        continue

    if not "c" in h:
        continue

    if len(re.findall("[aeiou]{2}", h[h.index("c"):])) == 0:
        continue

    if len(re.findall(r"\d{4}.$", h)) == 0:
        continue

    if not h[-1] in "1357":
        continue
    
    print(h)
```

The resulting hash can be decrypted on: https://crackstation.net/.
