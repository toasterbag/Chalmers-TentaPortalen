<template lang="pug">
.sp-upload-field
  .upload-button.d-flex.justify-content-center.align-items-center.text-center
    .text {{ text }}
    input(ref="upload", type="file", @input="onInput", :multiple="multi")

  .file.d-flex.align-items-center.p-2(v-for="file in files")
    i.fa.file-icon.text-primary.pe-2(:class="file.icon")
    span {{ file.name }}
    //- i.fa.fa-times.fa-lg.text-accent.ms-auto(@click="remove(file)")

  .error(v-if="error") {{ error }}
</template>

<script>
export default {
  name: "sp-upload-field",
  props: {
    text: {
      required: false,
      default: "Upload",
    },
    multi: {
      default: false,
    },
  },
  data: () => ({
    error: undefined,
    files: [],
  }),
  mounted() {
    this.value = this.$attrs.value;
  },
  methods: {
    onInput() {
      this.files = Array.from(this.$refs.upload.files);
      this.files.forEach((f) => {
        f.icon = this.icon_for_type(f.type);
      });

      this.$emit("input", this.$refs.upload.files);
    },
    icon_for_type(type) {
      const split = type.split("/");
      // type is a reserved js keyword..
      const type_ = split[0];
      const subtype = split[1];
      if (subtype == "pdf") {
        return "fa-file-pdf";
      }

      if (type_ == "image") {
        return "fa-file-image";
      }

      const doc_types = [
        "vnd.openxmlformats-officedocument.wordprocessingml.document",
        "msword",
        "vnd.oasis.opendocument.text",
        "plain",
      ];
      if (doc_types.includes(subtype)) {
        return "fa-file-alt";
      }

      const archive_types = ["zip", "vnd.rar", "x-7z-compressed"];
      if (archive_types.includes(subtype)) {
        return "fa-file-archive";
      }

      return "fa-file";
    },
  },
};
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
  .error {
    padding-top: 1rem;
    color: #ea6962;
    font-size: 1.5rem;
  }
}
</style>
