<template lang="pug">
.row.justify-content-center
  .row.p-4.justify-content-center
    .col-12.col-md-8.fs-4
      div We would appreciate any feedback you may have, be it bugs or feature request. You can write to us in both Swedish and English! 😊
  .row.p-4.justify-content-center
    .col-12.col-md-8(v-if="success")
      .fs-3 Thanks for your feedback!
    .col-12.col-md-6(v-else)
      .mb-3.relative
        label.form-label(for="email") Email (leave empty to be anonymous)
        input#code.form-control(v-model="email")
      .mb-3.form-floating
        textarea#message.form-control(
          placeholder="Leave a message here",
          v-model="message"
        )
        label(for="message")
      .btn.bg-primary(@click="submit") Submit
  </div>
</template>

<script>
import Http from "../plugins/http";
export default {
  name: "feedback",
  data: () => ({
    email: "",
    message: "",
    success: false,
  }),
  methods: {
    async submit() {
      if (this.message == "") return;

      const res = await Http.post(`feedback`, {
        body: { message: this.message, email: this.email },
      });

      if (res.ok) {
        this.$router.push({ name: "home" });
        this.$toast({ style: "success", content: "Thanks for your feedback" });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
