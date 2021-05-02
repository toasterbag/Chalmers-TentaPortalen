<template lang="pug">
.row.justify-content-around(v-if="current")
  .row
    .col-md-9.col-lg-7.d-flex.align-items-center.justify-content-center.border
      //- embed.pdf(
      //-   :src="`http://docs.google.com/gview?url=${url}&embedded=true`",
      //-   frameborder="0",
      //-   type="application/pdf"
      //- )
      embed(v-if="display.is_embed", :src="display.url")
      .text-start.flex-fill(v-else-if="display.is_txt") 
        pre {{ display.contents }}
      .text-center(v-else)
        div No preview available
        a(:href="display.url", target="_blank") 
          .fa.fa-download.pe-2
          span Download
        a.d-block.text(:href="display.url", target="_blank") {{ display.url }}

      //canvas(ref="pdf")
    .col-md-3.col-lg-5
      .row.align-items-end
        .col-6
          sp-combobox(
            v-model="display.course_codes",
            :multi="true",
            :suggestions="display.course_code_suggestions",
            label="Course codes",
            @update:search-input="autocomplete_courses",
            @blur="clear_course_suggestions"
          )
        .col-6
          .input-group.mb-3
            .input-group-text Date
            input.form-control(v-model="display.date", placeholder="Date")

      sp-switch.pb-2(
        left-text="Thesis",
        right-text="Solution",
        v-model="is_thesis",
        :dual="true"
      )

      .form-check.mb-2(v-if="this.is_thesis")
        input#includes-solutions.form-check-input(
          type="checkbox",
          v-model="display.includes_solution"
        )
        label.form-check-label(for="includes-solutions")
          | Includes solutions
      div
        .btn.bg-primary.me-2(@click="approve") Approve
        .btn.bg-accent(@click="reject") Reject
.d-flex.justify-content-around(v-else)
  .fs-2.fw-light There are no exams waiting to be verified!
</template>

<script>
import Http from "../../plugins/http";

export default {
  name: "Exams",
  data: () => ({
    ready: false,
    current: undefined,
    display: {
      is_thesis: true,
      is_embed: false,
      is_txt: false,
      contents: "",
      url: "",

      includes_solution: false,

      date: "",
      course_codes: [],
      course_code_suggestions: [],
    },

    exams: [],
  }),
  async created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.exams = await Http.get("exams/pending", {
        headers: {
          Authorization: sessionStorage.getItem("password"),
        },
      });
      if (this.exams) {
        await this.next();
        this.ready = true;
      }
    },
    async next() {
      this.display = {
        type: undefined,
        is_embed: false,
        is_txt: false,
        contents: "",
        url: "",

        includes_solution: false,

        date: "",
        course_codes: [],
        course_code_suggestions: [],
      };

      if (this.exams[0]) {
        const exam = this.exams.splice(0, 1)[0];
        if (exam.thesis && !exam.thesis.verified) {
          this.display.is_thesis = true;
          this.display.course_codes.push(exam.course_code);
          this.display.date = exam.date;
          this.display.url = `${global.env.HOST_URL}/public/courses/${exam.course_code}/${exam.date}/exam.${exam.thesis.filetype}`;
          this.display.includes_solution = exam.thesis.includes_solution;
          if (
            exam.thesis.filetype === "pdf" ||
            exam.thesis.filetype === "png" ||
            exam.thesis.filetype === "jpeg"
          ) {
            this.display.is_embed = true;
          } else if (exam.thesis.filetype === "txt") {
            this.display.is_txt = true;
            const res = await fetch(this.display.url);
            this.display.contents = await res.text();
          }
        }

        if (exam.solution && !exam.solution.verified) {
          this.display.is_thesis = false;
          this.display.course_codes.push(exam.course_code);
          this.display.date = exam.date;
          this.display.url = `${global.env.HOST_URL}/public/courses/${exam.course_code}/${exam.date}/solution.${exam.solution.filetype}`;
          if (
            exam.solution.filetype === "pdf" ||
            exam.solution.filetype === "png" ||
            exam.solution.filetype === "jpeg"
          ) {
            this.display.is_embed = true;
          } else if (exam.solution.filetype === "txt") {
            this.display.is_txt = true;
            const res = await fetch(this.display.url);
            this.display.contents = await res.text();
          }
        }

        this.current = exam;
      } else {
        this.current = undefined;
      }
    },

    async autocomplete_courses(term) {
      if (term.length == 0) {
        return;
      }

      if (term.length < 3) {
        this.items = undefined;
        return;
      }
      const res = await Http.get(`search/${term}`);
      this.display.course_code_suggestions = res.courses
        .take(8)
        .map((e) => e.course_code);
      this.$forceUpdate();
    },

    clear_course_suggestions() {
      setTimeout(() => {
        this.display.course_code_suggestions = [];
      }, 100);
    },

    async approve() {
      if (this.display.is_thesis) {
        Http.put("exams/thesis", {
          body: {
            courses: this.display.course_codes,
            uploaded_for: this.current.course_code,
            verified: true,
            includes_solution: this.display.includes_solution,
            thesis_id: this.current.thesis_id,
            date: this.current.date,
          },
        });
      } else {
        Http.put("exams/solution", {
          body: {
            courses: this.display.course_codes,
            uploaded_for: this.current.course_code,
            verified: true,
            solution_id: this.current.solution_id,
            date: this.current.date,
          },
        });
      }

      await this.next();
    },
    async reject() {
      switch (true) {
        case this.display.type == "thesis":
          Http.put("exams/thesis", {
            body: {
              verified: false,
              thesis_id: this.current.thesis_id,
            },
          });
          break;
        case this.display.type == "solution":
          Http.put("exams/solution", {
            body: {
              verified: false,
              solution_id: this.current.solution_id,
            },
          });
          break;
      }

      await this.next();
    },
  },
};
</script>

<style lang="scss" scoped>
embed {
  width: 100%;
  height: 90vh;
}
</style>
