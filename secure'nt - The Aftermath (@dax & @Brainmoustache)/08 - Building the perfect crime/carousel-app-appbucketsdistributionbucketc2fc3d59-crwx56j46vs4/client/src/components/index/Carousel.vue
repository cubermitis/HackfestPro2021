<template>
  <b-carousel
    align="center"
    v-model="slideConfig.slideNumber"
    :interval="slideConfig.slideInterval"
    controls
    indicators
    :background="slideConfig.backgroundColor"
  >
    <b-carousel-slide v-for="url in imageUrlList" :key="url">
      <template #img>
        <img width="100%" :src="url" />
      </template>
    </b-carousel-slide>
  </b-carousel>
</template>
<script>
export default {
  name: "Carousel",
  data() {
    return {
      imageUrlList: process.env.VUE_APP_IMAGES.split(","),
      slideConfig: {
        slideNumber: 0,
        slideInterval: 5000,
        backgroundColor: "#ffffff",
      },
    };
  },
};
</script>
