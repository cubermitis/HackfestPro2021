# 02 - BBB - Broken Bzz Broker

We continue our enumeration from the FS we dumped in HAUNTED. We can investigate normally interesting directories. Looking in `/root` we find a suspicious `decode.py` script:

```python
def decode():
	value = ['4648', '572d', '3030', '7370', '6854', '7331', '3043', '6564', '7331', '7634', '3134', '346c','6c62','33']
	newVal = ""
	decode = ""
	for i in value:
		valSwap = bytearray.fromhex(i)
		valSwap.reverse()
		newVal = str(valSwap, "utf-8")
		decode = decode + newVal
	return decode
```

Given the description, the contents of the array appear to be the flag. We can modify the code to print the decode method:

```python
print(decode())
```

This gives the flag without the `HF-` header, that we can add when submitting.
