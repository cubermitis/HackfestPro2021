# 06 - Device Exorcism 2

We need to build off of the knowledge of the previous challenge. Given the ROM is encrypted, maybe they used a drive encryption and hide the flag multiple times? We can try to use `LUKS` to mount the image and decrypt:

```
sudo cryptsetup luksOpen ./spookyIoTP2 spooky2
```

Attempting to do the previous leads to an error... Maybe the ROM is encrypted with a common algorithm? How about `AES`? It could be an option from the text but the key is not standard. This is the same issue for more "complex" algorithms. Therefore, we are probably again thinking too far. How about `XOR`? We can give it a try with a simple Python script:

```python
with open("spookyIoTP2", "rb") as h:
    data = h.read()

key = f"ENTER_EXO_P1_FLAG"

dec = []
for d, k in zip(data, key * 100):
    key.append(d ^ k)

print(bytes(dec))
```

If we look at the result, we see the `OpenWRT` header once again, therefore we must be on the right track. We can modify the previous script to iterate all the file and dump to a file:

```python
with open("spookyIoTP2", "rb") as h:
    data = h.read()

key = f"ENTER_EXO_P1_FLAG"

dec = []
for d, k in zip(data, key * (len(data) // len(key) + 1)):
    key.append(d ^ k)

with open("spookIoTP2.dec", "wb") as h:
    h.write(bytes(dec))
```

This gives a ROM like the for part 1. We can use `binwalk` again to dump the content of the SquashFS:

```
binwalk -e spookIoTP2.dec
```

We can again investigate the files and find `/root/flag`. This will fail because the file does not have read permissions. We can add it onto the file:

```
chmod a+r /root/flag
```

Now we can open the file and see space seperated digits. This is a decimal ASCII representation of the text. We can use `CyberChef` with `From Decimal` to decode the flag.
