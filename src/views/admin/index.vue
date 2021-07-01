<template lang="pug">
.row.justify-content-between
  tabs.mb-4(:entries="nav_items")

  .row.justify-content-center
    .col-12
      transition(name="fade", mode="out-in")
        router-view
  </div>
</template>

<script>
import Http from "../../plugins/http";

export default {
  name: "Admin",
  data: () => ({
    pending_exams: 0,
  }),
  computed: {
    nav_items() {
      return [
        {
          title: "Import",
          route: "admin/import",
        },
        {
          title: "Verify exam",
          route: "admin/verify-exams",
          badge: this.pending_exams,
        },
      ];
    },
  },
  async created() {
    this.refresh();
    this.timer = setInterval(async () => {
      //this.refresh();
    }, 15 * 1000);
    const { count } = await Http.get("exams/pending");
    this.pending_exams = count;
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

      request.open("PUT", `${global.env.API_URL}/datasheet`);
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
