<template lang="pug">
.row.justify-content-center
  .col-10.col-lg-8
    tabs.mb-4(:entries="nav_items")

  View
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AdminIndex",
  data: () => ({
    pending_exams: 0,
  }),
  computed: {
    nav_items() {
      return [
        {
          title: "Import",
          route: "Admin/Import",
        },
        {
          title: "Verify exam",
          route: "admin/verify-exams",
          badge: this.pending_exams,
        },
      ];
    },
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
