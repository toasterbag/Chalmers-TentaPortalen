<template lang="pug">
.row.justify-content-center
  .row.p-4.justify-content-center
    .col-12.col-md-8.fs-4
      div We would appreciate any feedback you may have, be it bugs or feature request. You can write to us in both Swedish and English! 😉
  .row.p-4.justify-content-center
    .col-12.col-md-6
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
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import Http from "../plugins/http";
import { useToastStore } from "../plugins/toaster";
export default defineComponent({
  name: "Feedback",
  setup() {
    const router = useRouter();
    const toast = useToastStore();

    const email = ref("");
    const message = ref("");

    const submit = async () => {
      if (message.value === "") return;

      const res = await Http.post(`feedback`, {
        body: { message: message.value, email: email.value },
      });

      if (res.ok) {
        router.push({ name: "Home" });
        toast.push({ content: "Thanks for your feedback!" });
      }
    }

    return {
      email,
      message,
      submit
    }
  },
});
</script>

