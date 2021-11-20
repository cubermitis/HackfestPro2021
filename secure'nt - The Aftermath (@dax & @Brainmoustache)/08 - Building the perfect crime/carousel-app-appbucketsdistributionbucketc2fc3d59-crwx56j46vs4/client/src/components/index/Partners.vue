<template>
  <b-row>
    <b-col offset-sm="2" sm="8">
      <h2 :class="rendered_content[21]" style="font-weight: bold">
        They trust us
      </h2>
      <center>
        <img class="partner-logo" width="200px" :src="rendered_content[14]" />
        <img class="partner-logo" width="200px" :src="rendered_content[15]" />
        <img class="partner-logo" width="200px" :src="rendered_content[16]" />
        <img class="partner-logo" width="200px" :src="rendered_content[17]" />
        <img class="partner-logo" width="200px" :src="rendered_content[0]" />
      </center>
      <br />
      <hr />
      <br />
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Partners",
  props: ["rendered_content"],
};
</script>

<style scoped>
@font-face {
  font-family: "6";
  src: url("/fonts/6.ttf");
}

.partner-logo {
  margin-right: 20px;
  margin-left: 20px;
}

.glitch21 {
  font-family: "6";
}
</style>
