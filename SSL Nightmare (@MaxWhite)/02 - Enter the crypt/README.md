## 02 - Enter the crypt

We did not solve this challenge but we found relevant information while doing the first ssl challenge that would've been vital to solving this second one.

- Running openssl to read the certificate files downloaded previously printed out error messages leading us to believe that the certificates are using a key algorithm that openssl doesn't understand.

```bash
[...]
Subject Public Key Info:
Public Key Algorithm: 1.3.9999.3.4
Unable to load Public Key
 
4338157100:error:06FFF09C:digital envelope routines:CRYPTO_internal:unsupported algorithm:/System/Volumes/Data/SWE/macOS/BuildRoots/6b362bc7f6/Library/Caches/com.apple.xbs/Sources/libressl/libressl-63/libressl-2.8/crypto/evp/p_lib.c:245:

4338157100:error:0BFFF06F:x509 certificate routines:CRYPTO_internal:unsupported algorithm:/System/Volumes/Data/SWE/macOS/BuildRoots/6b362bc7f6/Library/Caches/com.apple.xbs/Sources/libressl/libressl-63/libressl-2.8/crypto/asn1/x_pubkey.c:197:
[...]
```

- The server **tls.maxwhite.hfctf.ca** wouldn't connect because it was also using those unknown cipher suites

- We later learned that the the star wars lightsaber reference found in challenge 1 was hinting at Saber key exchange from liboqs

- Tools included in [this](https://hub.docker.com/r/openquantumsafe/curl#!) docker image would have been useful to connect to the server. 
