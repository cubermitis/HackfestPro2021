<template>
  <b-row>
    <b-col offset-sm="2" sm="8">
      <h2 :class="rendered_content[21]" style="font-weight: bold">
        Our services
      </h2>
      <b-row>
        <b-col>
          <b-card
            :class="rendered_content[22]"
            align="center"
            title="Cloud configuration hardening"
          >
            <img height="100px" :src="rendered_content[18]" />
            <p :class="rendered_content[23]">
              We're CEH certified and we're pretty good with Linux so it should
              be fine
            </p>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            :class="rendered_content[22]"
            align="center"
            title="Security by obscurity"
          >
            <img height="100px" :src="rendered_content[1]" />
            <p :class="rendered_content[23]">
              If nobody can figure out how your infrastructure works, then it's
              secure by design
            </p>
          </b-card>
        </b-col>
        <b-col>
          <b-card
            :class="rendered_content[22]"
            align="center"
            title="Hidding your deepest secrets"
          >
            <img height="100px" :src="rendered_content[19]" />
            <p :class="rendered_content[23]">
              We can put all your secrets in a place were hackers aren't
              supposed to go
            </p>
          </b-card>
        </b-col>
      </b-row>
      <br />
      <hr />
      <br />
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "Services",
  props: ["rendered_content"],
};
</script>

<style scoped>
@font-face {
  font-family: "6";
  src: url("/fonts/6.ttf");
}
@font-face {
  font-family: "E";
  src: url("/fonts/E.ttf");
}
@font-face {
  font-family: "U";
  src: url("/fonts/U.ttf");
}

.glitch21 {
  font-family: "6";
}

.glitch22 h4 {
  font-family: "E";
}

.glitch23 {
  font-family: "U";
}
</style>

