<template>
  <div :class="rendered_content[28]">
    <Banner />
    <Navbar :rendered_content="rendered_content" />
    <Carousel />
    <br /><br /><br />
    <Services :rendered_content="rendered_content" />
    <Partners :rendered_content="rendered_content" />
    <Certifications :rendered_content="rendered_content" />
    <Footer :rendered_content="rendered_content" />
  </div>
</template>

<script>
import Carousel from "./index/Carousel.vue";
import Navbar from "./index/Navbar.vue";
import Services from "./index/Services.vue";
import Partners from "./index/Partners.vue";
import Certifications from "./index/Certifications.vue";
import Footer from "./index/Footer.vue";
import Banner from "./index/Banner.vue";

export default {
  name: "Index",
  components: {
    Carousel,
    Navbar,
    Services,
    Partners,
    Certifications,
    Footer,
    Banner,
  },
  data() {
    return {
      original_content: [
        "/images/original/twelve.png",
        "/images/original/service2.png",
        "/images/original/cert3.png",
        "/images/original/cert1.png",
        "/images/original/cert2.png",
        "/images/original/cert4.png",
        "/images/original/cert5.png",
        "/images/original/cert6.png",
        "/images/original/cert7.png",
        "/images/original/cert8.png",
        "/images/original/cert9.png",
        "/images/original/cert10.png",
        "/images/original/cert11.png",
        "/images/original/cert12.png",
        "/images/original/adblock.png",
        "/images/original/ds9.png",
        "/images/original/oaa.png",
        "/images/original/starfleet.png",
        "/images/original/service1.png",
        "/images/original/service3.png",
        "company-name",
        "",
        "",
        "",
        "Contact",
        "Copyright© 2021 secure'nt, Inc.",
        "header",
        "footer",
        "",
        "Language",
      ],
      glitched_content: [
        "/images/glitch/twelve.png",
        "/images/glitch/service2.png",
        "/images/glitch/cert3.png",
        "/images/glitch/cert1.png",
        "/images/glitch/cert2.png",
        "/images/glitch/cert4.png",
        "/images/glitch/cert5.png",
        "/images/glitch/cert6.png",
        "/images/glitch/cert7.png",
        "/images/glitch/cert8.png",
        "/images/glitch/cert9.png",
        "/images/glitch/cert10.png",
        "/images/glitch/cert11.png",
        "/images/glitch/cert12.png",
        "/images/glitch/adblock.png",
        "/images/glitch/ds9.png",
        "/images/glitch/oaa.png",
        "/images/glitch/starfleet.png",
        "/images/glitch/service1.png",
        "/images/glitch/service3.png",
        "glitch20",
        "glitch21",
        "glitch22",
        "glitch23",
        "K".repeat(Math.random() * 101),
        "Y".repeat(Math.random() * 101),
        "glitch26",
        "glitch27",
        "glitch28",
        "F".repeat(Math.random() * 101),
      ],
      rendered_content: [],
    };
  },
  methods: {
    getTokenFromHash(token_type) {
      const hashRawData = location.hash.substring(1);
      const hashData = {};
      for (const param of hashRawData.split("&")) {
        const splittedParam = param.split("=");
        hashData[splittedParam[0]] = splittedParam[1];
      }
      if (hashData[`${token_type}_token`]) {
        return hashData[`${token_type}_token`];
      } else {
        return undefined;
      }
    },
    handleRedirection() {
      const access_token = this.getTokenFromHash("access");
      const id_token = this.getTokenFromHash("id");

      if (id_token) {
        localStorage.setItem("id_token", id_token);
      }

      if (access_token) {
        localStorage.setItem("access_token", access_token);
        this.$router.push({
          name: "Monitor",
        });
      }
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    async generateRenderedContent() {
      const x = 0;
      this.rendered_content = Array.from(this.original_content);
      while (x === 0) {
        const contentToGlitch = Math.round(Math.random() * this.rendered_content.length - 1);
        if (Math.random() < 0.5) {
          this.rendered_content.splice(contentToGlitch, 1, this.glitched_content[contentToGlitch]);
        } else {
          this.rendered_content.splice(contentToGlitch, 1, this.original_content[contentToGlitch]);
        }
        await this.sleep(this.getRandomIntInclusive(1000, 2000));
      }
    },
  },
  created() {
    this.handleRedirection();
    this.generateRenderedContent();
  },
};
</script>

<style>
:root {
  --T: #5b204b;
}

body {
  background-color: #f2f3f3;
  font-family: Arial, sans-serif !important;
  color: #16191f;
}

.glitch28 {
  color: var(--T);
}
</style>
