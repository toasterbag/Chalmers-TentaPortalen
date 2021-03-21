<template lang="pug">
.row
  .col-12.col-md-8.fs-4
    div We would appreciate any feedback you may have, be it bugs or feature request. You can write to us in both Swedish and English! 😊
  .row.p-4
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
      button.btn.text.bg-link(@click="submit") Submit
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
        this.success = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.relative {
  position: relative;
}
.suggestions {
  z-index: 1000;
  top: calc(100% - 20px);
  position: absolute;
  width: 100%;
}
.list-group-item:hover {
  background: var(--link-color);
  color: white;
  transition: all 0.2s ease;
}

.upload {
  padding-top: 2rem;

  .upload-button {
    position: relative;
    margin-top: 1rem;
    font-size: 1.2rem;
    border: solid #4a4a4a4a 1px;
    border-radius: 8px;

    width: 100%;
    height: 128px;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    input[type="file"] {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
    }
  }
  .error {
    padding-top: 1rem;
    color: #ea6962;
    font-size: 1.5rem;
  }
}
</style>
