<template lang="pug">
.row.justify-content-center
  .col-12.col-md-8.fs-4
    div We would appreciate any exams and solutions you may by able to provide. You can either upload them on the course pages or just drop a bunch of them in the box below. If you choose to mass upload please follow the naming conventions below to make our work a little bit easier 😊. It does not have to be a pdf file. If there are attachments you can name them whatever you think is reasonable.

    pre
      code 
        br
        | Exam without solutions
        br
        | 2020-03-10.pdf
        br
        br
        | Exam solutions
        br
        | 2020-03-10-solutions.pdf
        br
        br
        | Exam with solutions
        br
        | 2020-03-10-with-solutions.pdf
        br
        br
        | Exam attachment examples
        br
        | 2020-03-10-formelsamling.pdf
        br
        | 2020-03-10-attachment.jpg
        br
        | 2020-03-10-notes.pdf

  .row.justify-content-center.p-4
    .col-12.col-md-8
      .mb-3.relative
        label.form-label(for="code") Course code
        input#code.form-control(
          v-model="code",
          @input="autocomplete",
          @focus="autocomplete",
          @blur="clear_suggestions"
        )
        .form-text A course code such as SSY080, EDA322 or DAT047 (does not have to be uppercase, we'll fix that for you 😉)
        ul.list-group.suggestions(v-if="!suggestions.isEmpty()")
          li.list-group-item.link(
            v-for="item in suggestions",
            @click="select_code(item)"
          ) {{ item }}
      .mb-3.relative
        label.form-label(for="code") Course code
        input#code.form-control(
          v-model="code",
          @input="autocomplete",
          @focus="autocomplete",
          @blur="clear_suggestions"
        )
        .form-text )
      form.upload(@submit.prevent="submit")
        div Upload
        .uploads
          div(v-for="[file, progress, link] in uploads", :key="link")
            | {{ file }} ->
            span(v-if="progress == 100")
              a(:href="link") {{ link }}
            span(v-else) {{ progress }}%
        .upload-button
          span Click here or drag and drop exams
          input(ref="upload", type="file", @input="submit")
        .error {{ error }}
  </div>
</template>

<script>
import Http from "../plugins/http";
export default {
  name: "Exams",
  data: () => ({
    code: "",
    form: {
      code: undefined,
    },
    suggestions: [],
  }),

  methods: {
    select_code(item) {
      this.code = item;
      this.suggestions = [];
    },
    async autocomplete() {
      if (this.code.length == 0) {
        return;
      }
      const res = await Http.get(`course/search/${this.code}`);
      this.suggestions = res.map((e) => e.code).take(5);
    },
    clear_suggestions() {
      setTimeout(() => {
        this.suggestions = [];
      }, 100);
    },
    async submit() {
      var formData = new FormData();
      const file = this.$refs.upload.files[0];
      if (file.size > 511 * 1000 * 1000) {
        this.error = "File too big";
        return;
      }
      formData.append("image", file);

      const i = this.uploads.length;
      this.uploads.push([file.name, 0, ""]);

      let source =
        this.$route.query.nocaptcha !== undefined ? "web-nocaptcha" : "web";

      let request = new XMLHttpRequest();
      request.open("POST", `/upload?source=${source}`);

      request.upload.addEventListener("progress", (e) => {
        const progress = Math.round((e.loaded / e.total) * 100);

        const [name, prev_prog, url] = this.uploads[i];
        if (prev_prog === 100 || url !== "") return;

        this.uploads[i] = [name, progress, url];
        this.$forceUpdate();
      });

      request.addEventListener("load", () => {
        const [name, ,] = this.uploads[i];
        this.uploads[i] = [name, 100, request.responseText];
        this.$forceUpdate();
      });

      request.send(formData);
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
