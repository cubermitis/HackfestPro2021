# 06 - Something is hiding behind this crypto magic

We were not able to solve this challenge because of the `/api/secret` endpoint. We are unsure if we actually needed this endpoint or could break the `AES`? Eitherway, the mangled code can be manually cleaned up to the following function:

```js
function decryption(data, key_b64) {
    let key = CryptoJS['enc']['Base64']['parse'](key_b64);
    let iv_b64 = "NI0foiIx+nT+mt8qWKUJQw==";
    let iv = CryptoJS['enc']['Base64']['parse'](iv_b64);
    return CryptoJS['AES']['decrypt'](data, key, {
        'iv': iv
    })['toString'](CryptoJS['enc']['Utf8']);
}
```

Given the content, it seems to indicate that we actually needed the key, which was probably accessible through bad AWS configs.
