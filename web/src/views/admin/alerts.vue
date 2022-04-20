<template lang="pug">
.row.justify-content-around(v-if="ready")
  .row
    .col-6
      .fs-4 Tentastatistik
      .text.muted Updated {{ status.exam_statistics.updated | distanceToNow }}
      p För att få tag i senaste statistiken, mejla ladok@chalmers.se med text i stil med:
      code.text
        br
        | Halloj!
        br
        | Skulle man kunna få ut den senaste tentastatistiken?
        br
        | Tack på förhand!
      form.upload(@submit.prevent="submit")
        .uploads(v-if="datasheet.filename")
          .fs-4.align-center
            span.text-success(v-if="datasheet.progress == true") Successfully imported new data!
            span.text-success(v-else-if="datasheet.progress == 100") Processing data..
            span(v-else) {{ datasheet.progress }}%

        .upload-button(v-else)
          span Click or drop the ladok datasheet here
          input(ref="upload", type="file", @input="submit")
        .error(v-if="datasheet.error") {{ datasheet.error }}
    //- .col-6
    //-   .fs-4 Course material (exams, solutions, etc.)
    //-   .text.muted Updated {{ status.course_material.updated | distanceToNow }}
    //-   .pt-4(v-if="!status.course_material.running")
    //-     button.btn.bg-accent.btn-lg.text-white.ml-1(
    //-       @click="trigger_material_scan"
    //-     ) Manually trigger scan
    //-   .pt4(v-else)
    //-     div A scan is currently running..
    .col-6
      .fs-4 Studieportalen
      .text-muted Updated {{ status.study_portal.updated | distanceToNow }}
      .text-accent ⚠️⚠️⚠️ This takes A LONG TIME and is usually done automatically ⚠️⚠️⚠️
      .pt-4(v-if="!status.study_portal.running")
        button.btn.bg-accent.btn-lg.text-white.ml-1(
          @click="trigger_survey_scan"
        ) Manually trigger scan
      .pt4(v-else)
        div A scan is currently running..
</template>

<script>
import Http from "../../plugins/http";

export default {
  name: "Exams",
  data: () => ({
    ready: false,
    timer: undefined,
    datasheet: {
      filename: undefined,
      progress: undefined,
      error: undefined,
    },
    status: undefined,
    suggestions: [],
  }),
  async created() {
    this.refresh();
    this.timer = setInterval(async () => {
      //this.refresh();
    }, 15 * 1000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    async refresh() {
      this.status = await Http.get("admin/status", {
        headers: {
          Authorization: sessionStorage.getItem("password"),
        },
      });
      if (this.status) {
        this.ready = true;
      }
    },
    async trigger_material_scan() {
      this.status.course_material.running = true;
      await Http.post("admin/material/scan", {
        headers: {
          Authorization: sessionStorage.getItem("password"),
        },
      });
    },
    async trigger_survey_scan() {
      //this.status.study_portal.running = true;
      await Http.post("admin/study_portal/scan", {
        headers: {
          Authorization: sessionStorage.getItem("password"),
        },
      });
    },
    async submit() {
      var formData = new FormData();
      const file = this.$refs.upload.files[0];
      if (file.size > 50 * 1000 * 1000) {
        this.error = "File too big";
        return;
      }
      formData.append("datasheet", file);
      this.datasheet.filename = file.name;

      let request = new XMLHttpRequest();

      request.open("PUT", `${window.env.API_URL}/datasheet`);
      request.setRequestHeader(
        "Authorization",
        sessionStorage.getItem("password")
      );

      request.upload.addEventListener("progress", (e) => {
        const progress = e.loaded.div(e.total).mul(100).round();

        if (this.datasheet.progress === 100) return;
        this.datasheet.progress = progress;
      });

      request.addEventListener("load", () => {
        this.datasheet.progress = true;
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
