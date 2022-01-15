<template lang="pug">
teleport(to="sp-toaster")
  .sp-toast-container
    .sp-toast.d-flex.align-items-center(
      v-for="({ id, toast }, index) in queue",
      :key="id",
      :style="{ top: `${index * 64 + 12}px` }",
      :class="[toast.exiting ? 'exit' : '', toast.background || 'bg-primary', toast.color]"
    )
      .fa.pe-2(:class="[toast.icon]")
      div
        .fw-bold(v-if="toast.title") {{ toast.title }}
        .content {{ toast.content }}
</template>

<script lang="ts">
const wait = (t) => new Promise((resolve) => setTimeout(resolve, t));
export default {
  name: "sp-toast-portal",
  data: () => ({
    queue: [],
    styles: {
      success: {
        icon: "fa-check",
        color: "text-white",
        background: "bg-primary",
      },
      warning: {
        icon: "fa-exclamation-triangle",
        color: "text",
        background: "bg-warning",
      },
      error: {
        icon: "fa-exclamation-circle",
        color: "text-white",
        background: "bg-error",
      },
    },
  }),
  async mounted() {
    let counter = 0;
    this.$onToast(async (toast) => {
      if (toast.style) {
        toast = Object.assign({}, this.styles[toast.style], toast);
      }
      const id = counter++;
      toast.exiting = false;
      this.queue.unshift({ id, toast });
      wait(100);

      let index;
      await wait(toast.timeout);
      index = this.queue.findIndex((e) => e.id == id);
      this.queue[index].toast.exiting = true;

      await wait(400);
      index = this.queue.findIndex((e) => e.id == id);
      this.queue.splice(index, 1);
    });
  },
};
</script>

<style lang="scss" scoped>
.sp-toast-container {
  position: fixed;
  top: 12px;
  right: 12px;
  .sp-toast {
    border-right: solid 8px rgba(200, 200, 200, 0.1);
    border-radius: 2px;
    position: absolute;
    right: 12px;
    transition: all 0.3s;
    width: 320px;
    padding: 16px;
    animation: slide-in;
    animation-duration: 0.3s;
    animation-iteration-count: 1;
    vertical-align: middle;
    box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
      0px 24px 38px 3px rgba(0, 0, 0, 0.14),
      0px 9px 46px 8px rgba(0, 0, 0, 0.12);
    .v-icon {
      padding: 0px 8px 2px 0px;
      color: #fff;
      vertical-align: middle;
    }

    .title {
      font-size: 16px !important;
      color: #fff;
    }

    .content {
      vertical-align: middle;

      color: #fff;
      //color: rgba(255, 255, 255, 0.8);
    }
  }

  .exit {
    opacity: 0;
    animation: exit ease;
    animation-duration: 0.3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
}

@keyframes exit {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    display: none;
  }
}

@keyframes slide-in {
  0% {
    top: -100px;
  }
  100% {
    top: 12px;
  }
}
</style>
