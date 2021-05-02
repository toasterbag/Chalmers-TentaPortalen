<template lang="pug">
.row.justify-content-center
  .col-12.col-md-8
    .fs-4 Why can't I find my exam?
    div
      | There are a lot of reasons. The short answer is that LADOK does not know about the exam or that it is not recorded as an exam (tentamen).
      | It is very difficult to import the LADOK data so there may be special cases which we may have missed. If you think that your exam shouldn't be missing
      router-link.ps-1.text-accent(:to="{ name: 'feedback' }") please contact us.
    br

    .fs-4 Why is "Working environment" missing from so many surveys?
    div The question was added in 2019 and so is missing from earlier survey reports.
    br

    .fs-4 When is the data updated?
    div Ordinary exams are usually added in study week 4, this is to ensure that all exams have been graded. &nbsp;
      | Re-exams are added at the same time. Because of this they may be missing for some time.
    br
    div 
      | Exams are uploaded by students (like you!) so depending on your luck many or few relevant exams may be available.
      | DNS usually gives away gift cards to students at the D programme who contributes.
      | Reach out to your local education committe if you want them to do the same!
    br
    div Surveys are continously added and should show up within days of the survey closing.
</template>

<script>
export default {
  name: "faq",
};
</script>

<style lang="scss" scoped></style>
