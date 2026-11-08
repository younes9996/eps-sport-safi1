
export const translations = {
  ar: {
    direction: "rtl",
    language: "العربية",
    switchLanguage: "Français",

    topTitle: "المملكة المغربية - وزارة التربية الوطنية والتعليم الأولي والرياضة",
    branch: "الفرع الإقليمي للرياضة المدرسية - آسفي",

    home: "الرئيسية",
    news: "الأخبار",
    competitions: "البطولات",
    schedule: "البرمجة",
    results: "النتائج",
    schools: "المؤسسات التعليمية",
    champions: "سجل الأبطال",

    heroBadge: "🏆 الطموح والإنجازات",
    heroTitle: "أبطال الرياضة المدرسية",
    heroDescription:
      "نحتفي بالبطولات والإنجازات الرياضية ونشجع روح المثابرة والتميز.",
    heroButton: "سجل الأبطال",

    statsTitle: "إحصائيات الرياضة المدرسية",
    institutions: "المؤسسات التعليمية",
    championships: "البطولات الرياضية",
    athletes: "الرياضيون المشاركون",
    achievements: "الإنجازات الرياضية",

    servicesTitle: "فضاء الرياضة المدرسية",
    servicesDescription:
      "جميع المعلومات والخدمات الرياضية المدرسية في مكان واحد.",

    newsTitle: "الأخبار والأنشطة",
    galleryTitle: "معرض الصور",
    galleryDescription: "لحظات رياضية وذكريات من المنافسات المدرسية",

    callTitle: "الرياضة المدرسية، فضاء للتربية والتميز",
    callDescription:
      "نعمل على تعزيز الممارسة الرياضية داخل المؤسسات التعليمية وترسيخ قيم التعاون والروح الرياضية والمواطنة.",

    importantLinks: "روابط مهمة",
    platformInfo: "معلومات المنصة",
    copyright: "جميع الحقوق محفوظة",
  },

  fr: {
    direction: "ltr",
    language: "Français",
    switchLanguage: "العربية",

    topTitle:
      "Royaume du Maroc - Ministère de l'Éducation Nationale",
    branch: "Branche Provinciale du Sport Scolaire - Safi",

    home: "Accueil",
    news: "Actualités",
    competitions: "Compétitions",
    schedule: "Programmation",
    results: "Résultats",
    schools: "Établissements",
    champions: "Palmarès",

    heroBadge: "🏆 Ambition et performance",
    heroTitle: "Les champions du sport scolaire",
    heroDescription:
      "Célébrons les compétitions et les performances sportives, et encourageons l'esprit de persévérance et d'excellence.",
    heroButton: "Voir le palmarès",

    statsTitle: "Le sport scolaire en chiffres",
    institutions: "Établissements scolaires",
    championships: "Compétitions sportives",
    athletes: "Sportifs participants",
    achievements: "Performances sportives",

    servicesTitle: "Espace du sport scolaire",
    servicesDescription:
      "Toutes les informations et les services du sport scolaire réunis au même endroit.",

    newsTitle: "Actualités et activités",
    galleryTitle: "Galerie photos",
    galleryDescription:
      "Des moments sportifs et des souvenirs des compétitions scolaires",

    callTitle: "Le sport scolaire, un espace d'éducation et d'excellence",
    callDescription:
      "Nous encourageons la pratique sportive dans les établissements scolaires et promouvons les valeurs de coopération, de fair-play et de citoyenneté.",

    importantLinks: "Liens utiles",
    platformInfo: "Informations sur la plateforme",
    copyright: "Tous droits réservés",
  },
};

export type Locale = keyof typeof translations;
