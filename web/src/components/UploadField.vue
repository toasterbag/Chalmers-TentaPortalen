<template lang="pug">
.sp-upload-field
  .upload-button.d-flex.justify-content-center.align-items-center.text-center
    .text {{ text }}
    input(ref="uploadInput", type="file", @input="onInput")

  .file.d-flex.align-items-center.p-2(v-if="modelValue")
    i.fa.file-icon.text-primary.pe-2(:class="modelValue.icon")
    span {{ modelValue.name }}
    //- i.fa.fa-times.fa-lg.text-accent.ms-auto(@click="remove(file)")

  //- .error(v-if="error") {{ error }}
</template>

<script lang="ts">
import { defineComponent, PropType, ref, Ref } from "vue"

export default defineComponent({
  name: "UploadField",
  props: {
    modelValue: {
      required: false,
      type: Object as PropType<(File & { icon: string })>
    },
    text: {
      required: false,
      default: "Upload",
    },
    error: {
      required: false,
      default: "",
    },
    multi: {
      default: false,
    },
  },
  setup(props, { emit }) {
    const uploadInput: Ref<HTMLInputElement | undefined> = ref(undefined)

    const getFileIcon = (type: string) => {
      const [category, kind] = type.split("/");
      if (kind == "pdf") {
        return "fa-file-pdf";
      }

      if (category == "image") {
        return "fa-file-image";
      }

      const documentMimeTypes = [
        "vnd.openxmlformats-officedocument.wordprocessingml.document",
        "msword",
        "vnd.oasis.opendocument.text",
        "plain",
      ];
      if (documentMimeTypes.includes(kind)) {
        return "fa-file-alt";
      }

      const archiveMimeTypes = ["zip", "vnd.rar", "x-7z-compressed"];
      if (archiveMimeTypes.includes(kind)) {
        return "fa-file-archive";
      }

      return "fa-file";
    };


    const onInput = () => {
      const file = Array.from(uploadInput.value?.files ?? [])
        .map(f => Object.assign(f, { icon: getFileIcon(f.type) }))
        .first();
      console.log(file)

      emit("update:modelValue", file);
    }

    return {
      onInput,
      uploadInput,
    }
  },
});
</script>

<style lang="scss" scoped>
.sp-upload-field {
  .upload-button {
    position: relative;
    font-size: 1.2rem;
    border: solid #4a4a4a4a 1px;
    border-radius: 8px;

    width: 100%;
    height: 128px;

    input[type="file"] {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
    }
  }

  .file {
    .file-icon {
      font-size: 2rem;
    }
  }
}
</style>
