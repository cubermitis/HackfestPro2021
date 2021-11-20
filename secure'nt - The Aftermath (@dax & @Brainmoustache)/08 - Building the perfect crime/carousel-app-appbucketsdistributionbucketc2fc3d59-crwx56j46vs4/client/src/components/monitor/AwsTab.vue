<template>
  <b-tab title="AWS Monitoring Dashboard">
    <iframe :src="dashboard_url" width="100%" height="100%" />
  </b-tab>
</template>

<script>
import axios from "axios";

export default {
  name: "AwsTab",
  data() {
    return {
      dashboard_url: "",
    };
  },
  methods: {
    getDashboardUrl() {
      axios
        .get("/api/dashboard_url")
        .then((response) => {
          this.dashboard_url = response.data.dashboard_url;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getDashboardUrl();
  },
};
</script>

<style scoped>
iframe {
  position: absolute;
  border: none;
}
</style>
