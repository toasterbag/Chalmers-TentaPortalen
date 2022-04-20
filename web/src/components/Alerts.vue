<template lang="pug">
.sp-alerts
  //- .sp-alert.p-3.bg-error.text-white.mobile-only
  //-   .d-flex.justify-content-center.align-items-center
  //-     .fa.fa-mobile.pe-2
  //-     span This site is not yet mobile friendly, the desktop version is recommended.
  .sp-alert.p-3.bg-error.text-white(v-if="!isProduction")
    .d-flex.justify-content-center.align-items-center
      .fa.fa-exclamation-circle.pe-2
      a(href="https://tenta.davebay.net", target="_blank") This is the beta version, do not expect it to work as intended. Click here to return to the stable version.
  .sp-alert.p-3.d-flex.justify-content-center.align-items-center(
    v-for="(alert, index) in visible_alerts",
    :class="[alert.style.background, alert.style.color, alert]"
  )
    .fa.pe-2(:class="[alert.style.icon]")
    a(v-if="alert.link", :href="alert.link", target="_blank") {{ alert.message }}
    .text(v-else) {{ alert.message }}
    .fa.fa-times.dismiss.pe-2(
      v-if="alert.dismissable",
      @click="dismiss(index)"
    )
</template>

<script lang="ts">
import { defineComponent } from "vue";

//import Http from "../plugins/http";
export default defineComponent({
  name: "Alerts",
  data: () => ({
    dummy: false,
    alerts: [
      //      {
      //id: 1,
      //start: new Date(2018, 1),
      //end: new Date(2022, 1),
      //style: "info",
      //message:
      //"The master programme application is now open at antagning.se and closes April 15th",
      //link: "https://antagning.se",
      //  dismissable: true,
      //},
      {
        id: 12,
        start: new Date(2018, 1),
        end: new Date(2022, 4, 11),
        style: "info",
        message: "Exams and survey data from study period 3 will be available on April 12th!",
        dismissable: true,
        link: undefined
      },
    ],
    isProduction: import.meta.env.MODE === "production",
    styles: new Map(
      [
        ["info", {
          icon: "fa-info-circle",
          color: "text-white",
          background: "bg-primary",
        }],
        ["warning", {
          icon: "fa-exclamation-triangle",
          color: "text",
          background: "bg-warning",
        }],
        ["error", {
          icon: "fa-exclamation-circle",
          color: "text-white",
          background: "bg-error",
        },]
      ]),
  }),
  computed: {
    seen_alerts: {
      get() {
        this.dummy;
        let seen = localStorage.getItem("seen_alerts");
        if (seen === null) {
          return [];
        }
        return JSON.parse(seen);
      },
      set(val: Object) {
        localStorage.setItem("seen_alerts", JSON.stringify(val));
        this.dummy = !this.dummy;
      },
    },
    visible_alerts() {
      return this.alerts
        .filter((a) => !this.seen_alerts.includes(a.id))
        .map((a) =>
          Object.assign(a, {
            style: this.styles.get(a.style ?? "info"),
          }),
        );
    },
  },

  methods: {
    dismiss(index: any) {
      const alert = this.alerts[index];
      this.seen_alerts = [...this.seen_alerts, alert.id];
    },
  },
});
</script>

<style lang="scss" scoped>
.sp-alerts {
  .sp-alert {
    border-right: solid 8px rgba(200, 200, 200, 0.1);
    width: 100%;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(0, 0, 0, 0.14),
      0 0 0 0 rgba(0, 0, 0, 0.12);

    a:hover {
      text-decoration: underline;
    }

    .dismiss {
      position: absolute;
      right: 2rem;
    }

    * {
      color: inherit;
    }
  }
}
</style>
