<template lang="pug">
.flex.justify-center
  div(class="lg:max-w-[700px]")
    .flex.justify-center.mb-4
      .text-xl We would appreciate any feedback you may have, be it bugs or feature request. You can write to us in both Swedish and English! 😉
    .flex.flex-col.gap-2
      RetroInput(v-model="email", label="Email (leave empty to be anonymous)")
      .text-error {{ errors.get("email") }}
      label(for="message")
      RetroInput(v-model="message", label="Message")
      .text-error {{ errors.get("message") }}
      .flex.justify-end
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
        router.push({ name: "Home" });
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
