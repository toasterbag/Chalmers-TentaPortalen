<template lang="pug">
.row.justify-content-center
  .col-md-6
    form.mb-3(@submit.prevent="submit")
      label.form-label(for="password") Password
      input#password.form-control(type="password", v-model="password")
      .form-text.text-red(v-if="error") {{ error }}

    button.btn.bg-link.text-white(@click="submit") Submit
</template>

<script>
import Http from "../plugins/http";

export default {
  name: "App",
  data: () => ({
    password: "",
    error: undefined,
  }),
  methods: {
    async submit() {
      const res = await Http.post("auth", {
        body: { password: this.password },
      });
      if (res.status == "ok") {
        sessionStorage.setItem("password", this.password);
        this.$router.push({ name: "admin/import" });
      } else {
        this.error = "Invalid password";
      }
    },
  },
};
</script>

<style lang="scss"></style>
