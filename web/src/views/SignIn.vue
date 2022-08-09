<template lang="pug">
.flex.justify-center
  .flex.flex-col.justify-center.w-96
    h2.mb-4 Sign in
    .mb-3
      .font-bold Email
      RetroInput(type="text", v-model="email")
    .mb-3
      .font-bold Password
      RetroInput(:password="true", v-model="password")
      .form-text.text-red(v-if="error") {{ error }}
    .flex.justify-end
      .btn(@click="trySignIn") Sign in
</template>

<script lang="ts">
import { useTheme } from "@plugins/theme";
import { useToastStore } from "@plugins/toaster";
import { defineComponent, Ref, ref } from "vue";
import { useRouter } from "vue-router";
import { useAPI } from "../plugins/api";

export default defineComponent({
  name: "SignIn",
  setup() {
    const router = useRouter();
    const api = useAPI();
    const toast = useToastStore();
    const theme = useTheme();
    const email = ref("");
    const password = ref("");
    const error: Ref<string | undefined> = ref(undefined);

    const trySignIn = async () => {
      const res = await api.signIn(email.value, password.value);

      if (res.isEmpty()) {
        router.push({ name: "Home" });
      } else {
        for (const { message } of res) {
          toast.push({ content: message, color: theme.get("sp-error") });
        }
      }
    };

    return {
      email,
      password,
      error,
      trySignIn,
    };
  },
});
</script>

<style lang="scss"></style>
