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
        .text-error {{ errors.get('email') }}
      .mb-3.form-floating
        label(for="message")
        textarea#message.form-control(
          placeholder="Leave a message here",
          v-model="message"
        )
        .text-error {{ errors.get('message') }}
      .btn.bg-primary(@click="submit") Submit
</template>

<script lang="ts">
import { useAPI } from "@plugins/api";
import { defineComponent, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import Http from "../plugins/http";
import { useToastStore } from "../plugins/toaster";
export default defineComponent({
  name: "Feedback",
  setup() {
    const router = useRouter();
    const toast = useToastStore();
    const api = useAPI();

    const email = ref("");
    const message = ref("");
    const errors: Ref<Map<string, string | undefined>> = ref(new Map());

    const submit = async () => {
      if (message.value === "")
        return errors.value.set("message", "You can't send an empty message");

      const res = await api.sendFeedback(
        message.value,
        email.value === "" ? undefined : email.value,
      );
      errors.value.clear();

      if (!res.isEmpty()) {
        for (const error of res) {
          errors.value.set(error.path[0] ?? "message", error.message);
        }
      } else {
        // router.push({ name: "Home" });
        toast.push({ content: "Thanks for your feedback!" });
      }
    };

    return {
      email,
      message,
      submit,
      errors,
    };
  },
});
</script>
