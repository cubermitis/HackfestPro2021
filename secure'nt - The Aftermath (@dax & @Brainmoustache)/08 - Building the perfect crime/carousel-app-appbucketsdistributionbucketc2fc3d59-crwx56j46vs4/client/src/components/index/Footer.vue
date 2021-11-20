<template>
  <div :class="rendered_content[27]">
    <b-row>
      <b-col offset-sm="2" sm="8">
        <p class="footer-text">{{ rendered_content[25] }}</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: ["rendered_content"],
};
</script>

<style scoped>
:root {
  --P: #c23e27;
}

.footer {
  left: 0;
  bottom: 0;
  height: 40px;
  width: 100%;
  background-color: #232f3e;
}
.footer-text {
  margin-top: 9px;
  margin-bottom: -1rem;
  color: #aab7b8;
}

.glitch27 {
  left: 0;
  bottom: 0;
  height: 40px;
  width: 100%;
  background-color: var(--P);
}
</style>
