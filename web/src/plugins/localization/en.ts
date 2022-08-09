import { MessageSchema } from ".";

export const en: MessageSchema = {
  terms: {
    uor: "Education area representative",
    irr: "Department council representative",
    sn: "Student Board of Education",
    courses: "courses",
    solution: "Solution",
    exam: "Exam",
    exams: "Exams",
    department: "Department",
    owner: "Owner",
    programme_plan: "Programme plan",
    academic_year: "Academic year",
    electivity: "Electivity",
    master_of_engineering: "Master of engineering (Civilingenjör)",
    engineering_bachelor: "Engineering bachelor (Högskoleingenjör)",
    mastersprogramme: "Masters programme",
    study_period: "Study period",
    academic_council: "Academic council",
    survey: "Survey",
  },

  ui: {
    email: "Email",
    mean: "Mean",
    median: "Median",
    this_course: "This course",
    incuded_in_thesis: "Included in thesis",
    download: "Download",
    missing: "Missing",
    date: "Date",
    students: "Students",
    hint: "Hint",
    clear: "Clear",
    other: "Other",
    hide_reexams: "Hide re-exams",
    stack_bars: "Stack bars",
    values_in_precent: "Format values as percentages",
    minimum_responses: "Minimum responses",
    maximum_responses: "Maximum responses",
    min_participants: "Minimum participants",
    max_participants: "Maximum participants",
    start_period: "Start period",
    end_period: "End period",
    sort_order_hint: "",
    // Sort columns
    course_code: "Course code",
    name: "Name",
    overall_impression: "Overall impression",
    respondents: "Respondents",
    responses: "Responses",
    answer_frequency: "Answer frequency",
    passrate: "Passrate",
    participants: "Participants",
    results: "results",
    no_results: "No results",
  },
  survey: {
    answer_frequency: {
      title: "Answer Frequency",
      caption: "How many students responded to the survey? (percentage)",
    },
    overall_impression: {
      title: "Overall impression",
      caption: "What is your overall impression of the course?",
    },
    prerequisites: {
      title: "Prerequisites",
      caption: "I had enough prior knowledge to be able to follow the course.",
    },
    learning_outcomes: {
      title: "Learning outcomes",
      caption:
        "The learning outcomes clearly describe what I was expected to learn in the course.",
    },
    structure: {
      title: "Course structure",
      caption:
        "The course structure (as divided into lectures, exercises, lab sessions, simulations etc.) is appropriate in order to reach the intended learning outcome of the course.",
    },
    teaching: {
      title: "Teaching",
      caption: "The teaching worked well.",
    },
    litterature: {
      title: "Course litterature",
      caption:
        "The course literature (including other course material) supported the learning well.",
    },
    assessment: {
      title: "Assessment",
      caption:
        "The assessment (including all compulsory elements, exams, assignments etc.) tested whether I had reached the intended learning outcomes of the course.",
    },
    administration: {
      title: "Course administration",
      caption:
        "The course administration (information during the course, course memo, course homepage etc.) worked well.",
    },
    workload: {
      title: "Workload",
      caption:
        "The course workload as related to the number of credits was... (1: Too low, 5: Too high)",
    },
  },
  header: {
    home: "Home",
    rankings: {
      _: "Rankings",
      course_impressions: "Course impressions",
      course_performance: "Course performance",
      programme_impressions: "Programme impressions",
      answer_frequency: "Answer frequency",
    },
    contact: "Contact",
    faq: "FAQ",
  },
  footer: {
    code: {
      title: "Code",
      github: "Code on Github",
      me: 'Karl David "pDave" Hedgren',
    },
    admin: {
      title: "Admin",
      control_panel: "Dashboard",
    },
    about: {
      title: "About",
      maintained_by: "Maintained by",
      feedback: "Leave feedback",
    },
  },
  pages: {
    home: {
      title: "Home",
      greeting_heading: "Course statistics at Chalmers",
      greeting_content:
        "Looking for course stastistics or old exams? You have come to the right place! Try searching for your course name or code in the search bar or compare courses using our ranking page.",
      uploaded_exams: "Uploaded exam theses",
      courses_with_thesis: "Courses with exam thesis",
      action_find_missing_exams: "Find out which exams are missing",
      news_heading: "News",
    },
    course: {
      nav: {
        exam_statistics: "Exam statistics",
        old_theses: "Old exam theses",
        survey_analysis: "Survey analysis",
        old_surveys: "Surveys & minutes",
      },
      hint_only_turned_in_exams:
        "Only turned in assesments are counted in the total",
      avg_failrate: "Average failrate",
      view_on_student_portal: "View on the student portal",
      no_exams_found: "No exams found",
      low_participation:
        "Some exams have low participation ( n < 20 ) and may have rounding errors.",
      hint_upload:
        "Did you know that you can help by contributing with old exam theses? Press on a missing exam to upload. TentaPortalen is powered by peope like you!",
      hint_minutes:
        "Minutes can be found on the survey page, if they have been published.",
      no_surveys_found: "Could not find any surveys for this course.",
    },
    contact: {
      title: "Contact",
      heading: "Contact information",
      caption:
        "Here are some useful email addresses if you need to contact study boards or other student representatives.",
    },
    passrate_by_exam_period: {
      title: "Passrate by exam period",
      heading: "Passrate by exam period",
      caption:
        "Ever wondered how exam pass rates look between different exam periods? Take a look at this chart to find out.",
    },
    answer_frequency_by_division: {
      title: "Answer frequency by division",
      heading: "Answer frequency by student division",
      // caption: "How many students responded to their course surveys?",
    },
    faq: {
      title: "FAQ",
      when_is_the_page_updated: {
        title: "When is the data updated?",
        answer: `Ordinary exams are usually added in study week 4, this is to ensure that all exams have been graded.  Re-exams are added at the same time.

        Exams are uploaded by students (like you!) so the number of exams for your programme will depend on how many students upload exams when they find them.
        
        Surveys are continously added and should show up within days of the survey closing. Normally Sunday in study week 2.`,
      },
      what_is_tento_ergo_sum: {
        title: "What does 'Tentō, ergo sum' mean?",
        answer:
          "It is derived from the latin proverb 'Cogito, ergo sum', 'I think, therefore I am' but using the word 'tentare' which means 'to attempt' and is the etymological source of the Swedish word for exam, 'Tentamen' instead of Cogito. It therefore translates to 'I write exams, therefore I exist'",
      },
    },
    course_performance: {
      title: "Course performance",
    },
    course_impressions: {
      title: "Course impressions",
    },
    programme_impressions: {
      title: "Programme impressions",
    },
    courses_without_thesis: {
      title: "Courses without thesis",
    },
  },
};
