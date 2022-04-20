<template lang="pug">
.row.justify-content-center
  .col-10.col-md-8
    .row.justify-content-around
      .col-6
        .fs-4 Tentastatistik
        //- .text.muted Updated {{ status.exam_statistics.updated | distanceToNow }}
        p För att få tag i senaste statistiken, mejla systemstod@chalmers.se med text i stil med:
        code.text
          br
          | Halloj!
          br
          | Skulle man kunna få ut den senaste tentastatistiken?
          br
          | Tack på förhand!
        form.upload
          .uploads(v-if="examSheetUploadFilename")
            .fs-4.align-center
              span.text-success(v-if="examSheetUploadFinished === true") Successfully imported new data!
              span.text-success(v-else-if="examSheetUploadProgress === 100") Processing data..
              span(v-else) {{ examSheetUploadProgress }}%

          .upload-button(v-else)
            span Click or drop the ladok datasheet here
            input(ref="examSheetUpload", type="file", @input="uploadExamSheet")
          .error(v-if="examSheetUploadError") {{ examSheetUploadError }}

      //- .col-6
      //-   .fs-4 Studieportalen
      //-   //- .text-muted Updated {{ status.study_portal.updated | distanceToNow }}
      //-   .text-accent ⚠️⚠️⚠️ This takes A LONG TIME and is usually done automatically ⚠️⚠️⚠️
      //-   .pt-4
      //-     button.btn.bg-accent.btn-lg.text-white.ml-1(
      //-       @click="trigger_survey_scan"
      //-     ) Manually trigger scan
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue";
import { useAPI } from "../../plugins/api";
import Http from "../../plugins/http";
import { isErr } from "../../std/result";

export default defineComponent({
  name: "ImportExams",
  setup() {
    const api = useAPI();
    const examSheetUpload: Ref<HTMLInputElement | undefined> = ref(undefined);
    const examSheetUploadFilename: Ref<string | undefined> = ref(undefined);
    const examSheetUploadProgress: Ref<number> = ref(0);
    const examSheetUploadFinished: Ref<boolean> = ref(false);
    const examSheetUploadError: Ref<string | undefined> = ref(undefined);

    const onProgress = (progress: number) => {
      examSheetUploadProgress.value = progress;
    }

    const onFinished = () => {
      examSheetUploadProgress.value = 100;
      examSheetUploadFinished.value = true;
    }

    const uploadExamSheet = async () => {
      const file = examSheetUpload.value?.files?.item(0);
      if (!file) return;

      examSheetUploadFilename.value = file.name;

      const res = await api.uploadExamSheet(file, onProgress, onFinished);
      if (isErr(res)) {
        examSheetUploadError.value = res.val;
      }
    }

    return {
      examSheetUpload,
      examSheetUploadFilename,
      examSheetUploadProgress,
      examSheetUploadFinished,
      examSheetUploadError,
      uploadExamSheet
    }
  },
});
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
