<template>
  <div>
    <Navbar />
    <b-tabs fill>
      <KanbanTab />
      <AwsTab />
      <DecryptorTab />
    </b-tabs>
  </div>
</template>

<script>
import AwsTab from "./monitor/AwsTab.vue";
import KanbanTab from "./monitor/KanbanTab.vue";
import DecryptorTab from "./monitor/Decryptor.vue";
import Navbar from "./monitor/Navbar.vue";

import axios from "axios";

export default {
  name: "Monitor",
  components: {
    AwsTab,
    KanbanTab,
    DecryptorTab,
    Navbar,
  },
  data() {
    return {
      userPoolDomain: process.env.VUE_APP_USER_POOL_DOMAIN,
      userPoolRegion: process.env.VUE_APP_USER_POOL_REGION,
      userPoolClientId: process.env.VUE_APP_USER_POOL_CLIENT_ID,
      cognitoIdentityPoolId: process.env.VUE_APP_COGNITO_IDENTITY_POOL_ID,
      userPoolClientResponseType: "token",
      userPoolClientScope: ["openid"],
    };
  },
  computed: {
    redirectUrl: function () {
      return encodeURIComponent(location.origin);
    },
    cognitoUrl: function () {
      return `https://${this.userPoolDomain}.auth.${
        this.userPoolRegion
      }.amazoncognito.com/login?client_id=${
        this.userPoolClientId
      }&response_type=${
        this.userPoolClientResponseType
      }&scope=${this.userPoolClientScope.join("+")}&redirect_uri=${
        this.redirectUrl
      }`;
    },
  },
  created() {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 422) {
          location.href = this.cognitoUrl;
        }
        return Promise.reject(error);
      }
    );
  },
};
</script>
