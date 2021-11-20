<template>
  <b-navbar type="dark" :class="rendered_content[26]">
    <b-navbar-brand href="#" :class="rendered_content[20]"
      ><span class="orange">></span> secure'nt
      <span class="orange">|</span> Secure your new technologies</b-navbar-brand
    >

    <b-navbar-nav class="ml-auto">
      <b-nav-item href="#" right>Blog</b-nav-item>
      <b-nav-item href="#" right>{{ rendered_content[24] }}</b-nav-item>
      <b-nav-item href="#" right>Career</b-nav-item>

      <b-nav-item-dropdown :text="rendered_content[29]" right>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">FR</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">JP</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar",
  props: ["rendered_content"],
};
</script>

<style scoped>
:root {
  --Q: #8d1e1f;
}

@font-face {
  font-family: "W";
  src: url("/fonts/W.ttf");
}

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
.glitch20 {
  font-family: "W";
}
.glitch26 {
  background-color: var(--Q);
}
</style>
