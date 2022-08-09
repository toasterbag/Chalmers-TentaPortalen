<template lang="pug">
.w-full.relative.border-transparent
  .retro-input.relative.border-transparent(:class="{ 'items-end': label }")
    input.bg-transparent.w-full(
      class="focus:outline-none disabled:opacity-75 disabled:select-none",
      :class="{ 'pr-3': password }",
      :style="{ cursor: disabled ? 'not-allowed' : 'pointer' }",
      :type="password && !showPassword ? 'password' : 'text'",
      :placeholder="placeholder",
      :disabled="disabled",
      name="field",
      v-model="v$.field.$model",
      @input="update",
      @focus="focus = true",
      @blur="blur"
    )
    .absolute.w-8.right-1.top-8.cursor-pointer(
      v-if="password",
      :style="{ transform: `translateY(-0.4rem)` }",
      @click="showPassword = !showPassword"
    )
      .fa.center(
        :class="{ 'fa-eye': showPassword, 'fa-eye-slash': !showPassword }",
        :style="{ opacity: showPassword ? 1 : 0.7 }"
      )
    .underline.transition.duration-300.w-full.bg-primary.absolute.bottom-0.right-0(
      class="h-[2px]",
      :style="{ transform: `scaleX(${focus ? 1 : 0})` }"
    ) 
  .absolute.transition-all.pl-3.pointer-events-none(
    :style="labelStyle",
    :class="{ 'text-secondary': activated }"
  ) {{ label }}
  .h-4.w-full.text-sm.text-error(v-if="validation") {{ v$.field.$errors.first()?.$message ?? " " }}
</template>

<script lang="ts">
import useVuelidate, { Validation } from "@vuelidate/core";
import { computed, defineComponent, PropType, ref } from "vue";
export default defineComponent({
  name: "RetroInput",
  props: {
    modelValue: {
      required: true,
    },
    label: {
      required: false,
      type: String,
    },
    placeholder: {
      required: false,
      type: String,
    },
    disabled: {
      default: false,
    },
    password: {
      default: false,
    },
    validation: {
      required: false,
      type: Object as PropType<Array<Validation>>,
    },
  },
  setup(props, { emit }) {
    const focus = ref(false);
    const activated = computed(
      () =>
        focus.value ||
        props.modelValue !== undefined ||
        props.modelValue !== "",
    );
    const labelStyle = computed(() => ({
      transform: `translateY(${
        activated.value || props.placeholder ? -2.6 : -2.1
      }rem)`,
      fontSize: `${activated.value || props.placeholder ? 0.7 : 1.125}rem`,
    }));

    const update = (event: any) => {
      emit("update:modelValue", event.target?.value);
      emit("input", event.target?.value);
    };

    const showPassword = ref(false);

    const rules = {
      field: { ...props.validation },
    };
    const field = ref(props.modelValue);

    const v$ = useVuelidate(rules, { field }, { $rewardEarly: true });

    const validate = async () => {
      await v$.value.$validate;
    };

    const blur = () => {
      focus.value = false;
      v$.value.field.$commit();
    };

    return {
      update,
      focus,
      activated,
      labelStyle,
      showPassword,
      validate,
      blur,
      v$,
    };
  },
});
</script>
