## 01 - Take a look around

The challenge link opened up a page with only a background picture. Clicking on the picture, we download a compressed file of ssl certificates.
Once decompressed, the files were:

![alt text](certs.png)

To read and search for potential flags in all the certificate files, we can run the following command: 

```bash
$ openssl x509 -in server.crt -text -noout | grep HF
[...]
Subject: CN=tls.maxwhite.hfctf.ca,
O=HF-nJWua9gfNJPN3RFJXQQUwnNFypvi4wUn, 
OU=A true Jedi uses its lightsaber to exchange keys...
[...]
```

Doing so, we get the flag for the first SSL Nightmare challenge: 
```bash
HF-nJWua9gfNJPN3RFJXQQUwnNFypvi4wUn
```
🚩
