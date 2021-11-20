<template>
  <div>
    <b-alert class="no-margin" show variant="danger" dismissible
      >secure'nt is a resilient company, and that is why we are proud to
      announce that, even after the terrible hack of June 19th, we are back in
      business and ready to help you scale your cloud infrastructure. We have
      fixed the bug and implemented monitoring measures, but we are still in the
      process of cleaning up the Website defacement. If you notice any visual
      glitches, please contact a secure'nt administrator at junk@{{
        domainName
      }}.</b-alert
    >
  </div>
</template>
<script>
export default {
  name: "Banner",
  data() {
    return {
      domainName: process.env.VUE_APP_DOMAIN_NAME,
    };
  },
};
</script>
<style scoped>
.no-margin {
  margin-bottom: 0px;
}
</style>
