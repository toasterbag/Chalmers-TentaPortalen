<template lang="pug">
.row.justify-content-center
  .col-8.col-md-3
    h2.mb-4 Sign in
    form
      .mb-3
        label.form-label(for="password") Email
        input#password.form-control(type="text", v-model="email")
      .mb-3
        label.form-label(for="password") Password
        input#password.form-control(type="password", v-model="password")
        .form-text.text-red(v-if="error") {{ error }}

    button.btn(@click="trySignIn") Sign in
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
