import { MessageSchema } from ".";

export const sv: MessageSchema = {
  terms: {
    uor: "Utbildningsområdesrepresentant",
    irr: "Institutionsrådsrepresentant",
    sn: "Studienämnd",
    courses: "Kurser",
    solution: "Lösning",
    exam: "Tentamen",
    exams: "Tentamina",
    department: "Institution",
    owner: "Ägare",
    programme_plan: "Programplan",
    academic_year: "Läsår",
    electivity: "Valbarhet",
    engineering_bachelor: "Högskoleingenjör",
    master_of_engineering: "Civilingenjör",
    mastersprogramme: "Masterprogram",
    study_period: "Läsperiod",
    academic_council: "Studienämnd",
    survey: "Enkät",
  },
  ui: {
    email: "E-post",
    mean: "Medel",
    median: "Median",
    this_course: "Denna kursen",
    incuded_in_thesis: "Inkluderad i tesen",
    download: "Ladda ner",
    missing: "Saknas",
    date: "Datum",
    students: "Studenter",
    hint: "Tips",
    clear: "Återställ",
    other: "Övrigt",
    hide_reexams: "Dölj omtentor",
    stack_bars: "Stapla värden",
    values_in_precent: "Formatera värden till procentsatser",
    minimum_responses: "Lägre svargräns",
    maximum_responses: "Övre svarsgräns",
    min_participants: "Lägre deltagargräns",
    max_participants: "Övre deltagargräns",
    start_period: "Startperiod",
    end_period: "Slutperiod",
    sort_order_hint:
      "Du kan klicka på kolumnrubrikerna för att ändra sorteringsordning",
    // Sort columns
    course_code: "Kurskod",
    name: "Namn",
    overall_impression: "Sammanfattat intryck",
    respondents: "Respondenter",
    responses: "Svar",
    answer_frequency: "Svarsfrekvens",
    passrate: "Godkänningsgrad",
    participants: "Deltagare",
    results: "resultat",
    no_results: "Inga resultat",
  },
  survey: {
    answer_frequency: {
      title: "Svarsfrekvens",
      caption: "Hur många studenter svarade på enkäten? (procent)",
    },
    overall_impression: {
      title: "Sammanfattande intryck",
      caption: "Vad är ditt sammanfattande intryck av kursen?",
    },
    prerequisites: {
      title: "Förkunskaper",
      caption: "Jag hade tillräckliga förkunskaper för att kunna följa kursen.",
    },
    learning_outcomes: {
      title: "Lärandemål",
      caption:
        "Lärandemålen (se kursplanen) beskriver tydligt vad jag förväntades lära mig i kursen.",
    },
    structure: {
      title: "Kursstrukturen",
      caption:
        "Kursens struktur (uppdelningen i föreläsningar, övningar, laborationer, simuleringar etc.) är lämplig för att uppnå kursens lärandemål",
    },
    teaching: {
      title: "Undervisning",
      caption: "Undervisningen fungerade väl.",
    },
    litterature: {
      title: "Kurslitteratur",
      caption:
        "Kurslitteraturen (inklusive övrigt kursmaterial) stödjer lärandet väl",
    },
    assessment: {
      title: "Examination",
      caption:
        "Examinationen (inklusive alla obligatoriska moment, tentamen, inlämningsuppgifter etc.) testade om jag hade uppnått kursens lärandemål.",
    },
    administration: {
      title: "Kursadministration",
      caption:
        "Kursadministrationen (löpande information, kurs-PM, kurshemsida etc.) fungerade väl.",
    },
    workload: {
      title: "Arbetsbelastning",
      caption:
        "Kursens arbetsbelastning i förhållande till antalet poäng var... (1: För låg, 5: För hög)",
    },
  },
  header: {
    home: "Hem",
    rankings: {
      _: "Rankningar",
      course_impressions: "Kursintryck",
      course_performance: "Kursprestationer",
      programme_impressions: "Programintryck",
      answer_frequency: "Svarsfrekvens",
    },
    contact: "Kontakt",
    faq: "Frågor & svar",
  },
  footer: {
    code: {
      title: "Källkod",
      github: "Kod på GitHub",
      me: "Karl David 'pDave' Hedgren",
    },
    admin: {
      title: "Admin",
      control_panel: "Kontrollpanel",
    },
    about: {
      title: "Om sidan",
      maintained_by: "Underhålls av",
      feedback: "Lämna feedback",
    },
  },
  pages: {
    home: {
      title: "Startsida",
      greeting_heading: "Kursstatistik på Chalmers",
      greeting_content:
        "Letar du efter kursstatistik eller gamla tentor? Då har du kommit rätt! Testa att söka på kursnamn eller kurskod eller jämför kurser på rankningssidorna.",
      uploaded_exams: "Uppladdade tentamensteser",
      courses_with_thesis: "Kurser med tentamenstes",
      action_find_missing_exams: "Ta reda på vilka kurser som saknar tenta",
      news_heading: "Nyheter",
    },
    course: {
      nav: {
        exam_statistics: "Tentastatistik",
        old_theses: "Tentamensteser",
        survey_analysis: "Enkätsanalys",
        old_surveys: "Enkäter & protokoll",
      },
      hint_only_turned_in_exams:
        "Endast inlämnade tentor och projekt räknas med i totalen",
      avg_failrate: "Kuggfrekvens",
      view_on_student_portal: "Kursen på studentportalen",
      no_exams_found: "Kunde inte hitta några tentamina",
      low_participation:
        "På grund av lågt deltagande (n < 20) kan visa värden ha avrundningsfel",
      hint_upload:
        "Visste du att du kan bidra med gamla tentamensteser genom att klicka på en tentamen som är markerad som 'Saknas'? TentaPortalen drivs av personer som dig!",
      hint_minutes:
        "Protokollet för en kursomgång kan hittas överst på enkäten, om det är publicerat.",
      no_surveys_found: "Kunde inte hitta några enkäter.",
    },
    contact: {
      title: "Kontakt",
      heading: "Kontaktinformation",
      caption:
        "Här hittar du några användbara epost-adresser till studienämnder och andra representanter.",
    },
    passrate_by_exam_period: {
      title: "Kuggstatistik per tentaperiod",
      heading: "Kuggning per tentamensperiod",
      caption:
        "Har du någonsit undrat hur kuggningsgraden ser ut för de olika tentamensperioderna? Denna grafen visar dig hur det ser ut.",
    },
    answer_frequency_by_division: {
      title: "Svarsfrekvens per sektion",
      heading: "Svarsfrekvens indelat på sektion",
    },
    faq: {
      title: "Frågor & svar",
      when_is_the_page_updated: {
        title: "När uppdateras datan?",
        answer: `Ordinarie tentor uppdateras oftast måndag LV4 för att försäkra att även sent rättade tentor räknas med.  Omtentor brukar uppdateras samtidigt, men ibland dyker de upp tidigare.

        Gamla teser är helt crowdsourcade så tillgången beror på hur flitigt studenter på ditt program laddar upp tentor till sidan.
        
        Kursenkätsresultat importeras så fort de är tilgängliga. Man brukar kunna se resultaten redan måndag LV3`,
      },
      what_is_tento_ergo_sum: {
        title: "Vad betyder 'Tentō, ergo sum'?",
        answer:
          "TL;DR, 'Jag tenterar, därför existerar jag'.\n\nDet är baserat på det latinska ordspråket 'Cogito, ergo sum', 'Jag tänker, därför existerar jag' men med det latinska ordet 'tentare' som är ursprunget för ordet 'Tentamen'.",
      },
    },
    course_impressions: {
      title: "Kursintryck",
    },
    course_performance: {
      title: "Kursprestationer",
    },
    courses_without_thesis: {
      title: "Kurser utan gamlateser",
    },
    programme_impressions: {
      title: "Programintryck",
    },
  },
};
