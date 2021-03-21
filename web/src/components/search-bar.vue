<template lang="pug">
.container
  .row.justify-content-center
    .col-md-4
      .input.input--nao(:class="{ filled: search.length != 0 }")
        input#input-1.input__field.input__field--nao(
          type="text",
          v-model="search"
        )
        label.input__label.input__label--nao(for="input-1")
          span.input__label-content.input__label-content--nao Course Name, Code, Owner
        svg.graphic.graphic--nao(
          width="300%",
          height="100%",
          viewBox="0 0 1200 60",
          preserveAspectRatio="none"
        )
          path(
            d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"
          )

  .row.justify-content-center(v-if="items.length > 0")
    .col-md-10
      .row.tenta-table
        .col-12
          .row.header
            .col-4 Name
            .col-4 Code
            .col-4 Owner

          .row.align-middle.link(
            v-for="item in items",
            :key="item.code",
            @click="goto(item.code)"
          )
            .col-6.capitalize {{ item.name }}
            .col-2.uppercase {{ item.code }}
            .col-4.capitalize {{ item.owner }}
</template>

<script>
import Http from "../plugins/http";
export default {
  name: "search-bar",
  data: () => ({
    search: "",
    items: [],
  }),
  methods: {
    goto(code) {
      this.items = [];
      this.$router.push({ name: "course", params: { code } });
    },
  },
  watch: {
    async search() {
      if (this.$route.name !== "home") {
        this.$router.push({ name: "home" });
      }
      this.$emit("search");
      const term = this.search.toLowerCase();

      if (term.length < 3) {
        this.items = [];
        return;
      }
      this.items = await Http.get(`course/search/${term}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  position: relative;
  margin: 1em;
  width: 100%;
  height: 100px;
}

.input__field {
  position: relative;
  display: block;
  float: right;
  padding: 0.8em;
  width: 60%;
  border: none;
  border-radius: 0;
  background: #f0f0f0;
  color: #aaa;
  font-weight: 400;
  font-family: "Avenir Next", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-appearance: none; /* for box shadows to show on iOS */
}

.input__field:focus {
  outline: none;
}

.input__label {
  display: inline-block;
  padding: 0 1em;
  width: 40%;
  color: #6a7989;
  font-weight: bold;
  font-size: 70.25%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.input__label-content {
  position: relative;
  display: block;
  padding: 1.6em 0;
  width: 100%;
}

.graphic {
  position: absolute;
  top: 0;
  left: 0;
  fill: none;
}

.icon {
  color: #ddd;
  font-size: 150%;
}

/* Nao */
.input--nao {
  overflow: hidden;
  padding-top: 1em;
}

.input__field--nao {
  padding: 0.5em 0em 0.25em;
  width: 100%;
  background: transparent;
  color: #9da8b2;
  font-size: 2.75em;
}

.input__label--nao {
  position: absolute;
  top: 1.25em;
  font-size: 1.25em;
  left: 0;
  display: block;
  width: 100%;
  text-align: left;
  padding: 0em;
  pointer-events: none;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transition: -webkit-transform 0.3s 0.1s, color 1s;
  transition: transform 0.3s 0.1s, color 1s;
  -webkit-transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1);
}

.graphic--nao {
  stroke: #92989e;
  pointer-events: none;
  -webkit-transition: -webkit-transform 0.7s, stroke 0.7s;
  transition: transform 0.7s, stroke 0.7s;
  -webkit-transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 0.25, 0.5, 1);
}

.animation-override-label {
  color: #333;
  -webkit-transform: translate3d(0, -1.5em, 0) scale3d(0.7, 0.7, 1);
  transform: translate3d(0, -1.5em, 0) scale3d(0.7, 0.7, 1);
}

.animation-override-graphic {
  stroke: #333;
  -webkit-transform: translate3d(-66.6%, 0, 0);
  transform: translate3d(-66.6%, 0, 0);
}

.input__field--nao:focus + .input__label--nao,
.input__field--nao:focus + .input__label--nao,
.input.filled .input__label--nao {
  color: #333;
  -webkit-transform: translate3d(0, -1.5em, 0) scale3d(0.7, 0.7, 1);
  transform: translate3d(0, -1.5em, 0) scale3d(0.7, 0.7, 1);
}

.input__field--nao:focus ~ .graphic--nao,
.input.filled .graphic--nao {
  stroke: #333;
  -webkit-transform: translate3d(-66.6%, 0, 0);
  transform: translate3d(-66.6%, 0, 0);
}
</style>
