<template>
  <b-navbar type="dark" class="header">
    <b-navbar-brand href="#" class="company-name"
      ><span class="orange">></span> secure'nt
      <span class="orange">|</span> Secure your new technologies</b-navbar-brand
    >
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.company-name {
  font-family: "Courier New", Courier, monospace;
  font-weight: bold;
}
.header {
  background-color: #232f3e;
}
.orange {
  color: #ff7300;
}
</style>
