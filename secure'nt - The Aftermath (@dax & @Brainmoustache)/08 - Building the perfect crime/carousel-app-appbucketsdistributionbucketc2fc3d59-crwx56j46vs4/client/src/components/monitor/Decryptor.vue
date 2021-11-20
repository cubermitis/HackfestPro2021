<template>
  <b-tab title="Decryptor">
    <iframe src="/decryptor/index.html" width="100%" height="100%" />
  </b-tab>
</template>

<script>
export default {
  name: "DecryptorTab",
};
</script>

<style scoped>
iframe {
  position: absolute;
  border: none;
}
</style>
