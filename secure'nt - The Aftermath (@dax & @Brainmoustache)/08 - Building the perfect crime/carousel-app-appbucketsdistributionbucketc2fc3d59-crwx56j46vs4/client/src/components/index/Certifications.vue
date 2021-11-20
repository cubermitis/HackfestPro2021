<template>
  <b-row>
    <b-col offset-sm="2" sm="8">
      <h2 :class="rendered_content[21]" style="font-weight: bold">
        Our certifications
      </h2>
      <center>
        <img width="100px" height="100px" :src="rendered_content[3]" />
        <img width="100px" height="100px" :src="rendered_content[4]" />
        <img width="100px" height="100px" :src="rendered_content[2]" />
        <img width="100px" height="100px" :src="rendered_content[5]" />
        <img width="100px" height="100px" :src="rendered_content[6]" />
        <img width="100px" height="100px" :src="rendered_content[7]" />
        <img width="100px" height="100px" :src="rendered_content[8]" />
        <img width="100px" height="100px" :src="rendered_content[9]" />
        <img width="100px" height="100px" :src="rendered_content[10]" />
        <img width="100px" height="100px" :src="rendered_content[11]" />
        <img width="100px" height="100px" :src="rendered_content[12]" />
        <img width="100px" height="100px" :src="rendered_content[13]" />
      </center>
      <br /><br /><br />
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Certifications",
  props: ["rendered_content"],
};
</script>

<style scoped>
@font-face {
  font-family: "6";
  src: url("/fonts/6.ttf");
}

.glitch21 {
  font-family: "6";
}
</style>
