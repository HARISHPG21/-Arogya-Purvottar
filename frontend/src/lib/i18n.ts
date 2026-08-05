/**
 * i18n Translation Provider
 * Supports: English, Assamese (অসমীয়া), Bengali (বাংলা), Meitei (মৈতৈ), Nagamese
 */

export type Language = 'en' | 'as' | 'bn' | 'mni' | 'nag';

export const LANGUAGES: { code: Language; name: string; nativeName: string; flag: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🏔' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🌿' },
  { code: 'mni', name: 'Meitei', nativeName: 'মৈতৈ', flag: '🏞' },
  { code: 'nag', name: 'Nagamese', nativeName: 'Nagamese', flag: '🌄' },
];

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    app_name: 'ArogyaPurvottar',
    tagline: 'Smart Health Monitoring for Northeast India',
    report_symptom: 'Report Symptom',
    water_test: 'Water Test',
    high_risk: 'High Risk',
    medium_risk: 'Medium Risk',
    low_risk: 'Low Risk',
    critical: 'CRITICAL',
    outbreak_alert: 'Outbreak Alert!',
    village: 'Village',
    disease: 'Disease',
    cases: 'Cases',
    status: 'Status',
    submit: 'Submit Report',
    symptom_prompt: 'What symptoms are you experiencing?',
    diarrhea: 'Diarrhea',
    vomiting: 'Vomiting',
    fever: 'Fever',
    stomach_pain: 'Stomach Pain',
    weakness: 'Weakness',
    jaundice: 'Jaundice',
    water_source: 'Water Source',
    boil_water: 'Boil water before drinking',
    see_doctor: 'Visit the nearest PHC immediately',
    ors_advice: 'Drink ORS solution to prevent dehydration',
    alert_msg: 'Water contamination detected near your village. Do NOT drink untreated water.',
  },
  as: {
    app_name: 'আৰোগ্য পূৰ্বোত্তৰ',
    tagline: 'উত্তৰ-পূব ভাৰতৰ বাবে স্বাস্থ্য নিৰীক্ষণ',
    report_symptom: 'লক্ষণ জনাওক',
    water_test: 'পানী পৰীক্ষা',
    high_risk: 'উচ্চ বিপদ',
    medium_risk: 'মধ্যম বিপদ',
    low_risk: 'কম বিপদ',
    critical: 'জৰুৰী',
    outbreak_alert: 'প্ৰাদুৰ্ভাৱ সতৰ্কবাৰ্তা!',
    village: 'গাওঁ',
    disease: 'ৰোগ',
    cases: 'ৰোগী',
    status: 'অৱস্থা',
    submit: 'প্ৰতিবেদন দাখিল কৰক',
    symptom_prompt: 'আপুনি কি লক্ষণ অনুভৱ কৰিছে?',
    diarrhea: 'পাতলা পায়খানা',
    vomiting: 'বমি',
    fever: 'জ্বৰ',
    stomach_pain: 'পেটৰ বিষ',
    weakness: 'দুৰ্বলতা',
    jaundice: 'জণ্ডিচ',
    water_source: 'পানীৰ উৎস',
    boil_water: 'পান কৰাৰ আগতে পানী উতলাওক',
    see_doctor: 'তাৎক্ষণিকভাৱে ওচৰৰ PHC লৈ যাওক',
    ors_advice: 'পানীশূন্যতা ৰোধ কৰিবলৈ ORS পান কৰক',
    alert_msg: 'আপোনাৰ গাওঁৰ ওচৰত পানী দূষণ ধৰা পৰিছে। অপ্ৰক্ৰিয়াজাত পানী পান নকৰিব।',
  },
  bn: {
    app_name: 'আরোগ্য পূর্বোত্তর',
    tagline: 'উত্তর-পূর্ব ভারতের স্বাস্থ্য পর্যবেক্ষণ',
    report_symptom: 'উপসর্গ জানান',
    water_test: 'জল পরীক্ষা',
    high_risk: 'উচ্চ ঝুঁকি',
    medium_risk: 'মাঝারি ঝুঁকি',
    low_risk: 'কম ঝুঁকি',
    critical: 'সংকটজনক',
    outbreak_alert: 'প্রাদুর্ভাব সতর্কতা!',
    village: 'গ্রাম',
    disease: 'রোগ',
    cases: 'কেস',
    status: 'অবস্থা',
    submit: 'রিপোর্ট জমা দিন',
    symptom_prompt: 'আপনি কী উপসর্গ অনুভব করছেন?',
    diarrhea: 'ডায়রিয়া',
    vomiting: 'বমি',
    fever: 'জ্বর',
    stomach_pain: 'পেটের ব্যথা',
    weakness: 'দুর্বলতা',
    jaundice: 'জন্ডিস',
    water_source: 'জলের উৎস',
    boil_water: 'পান করার আগে জল ফুটিয়ে নিন',
    see_doctor: 'অবিলম্বে নিকটস্থ PHC-তে যান',
    ors_advice: 'পানিশূন্যতা রোধ করতে ORS পান করুন',
    alert_msg: 'আপনার গ্রামের কাছে জল দূষণ শনাক্ত হয়েছে। অপরিশোধিত জল পান করবেন না।',
  },
  mni: {
    app_name: 'আরোগ্য পূর্বোত্তর',
    tagline: 'মণিপুরগী অমুক থৌওক থবক',
    report_symptom: 'নোংচুপ থোংজিনবিয়ু',
    water_test: 'ইশিং থাজিনবা',
    high_risk: 'খুদমবা থৌখৎ',
    medium_risk: 'নুমিদাংগী থৌখৎ',
    low_risk: 'থৌখৎ থেংনবা',
    critical: 'নগাংবা',
    outbreak_alert: 'নোংমা পুথোকপা সতর্কতা!',
    village: 'নংলো',
    disease: 'অনীশুবা',
    cases: 'মিওই',
    status: 'কান্নবা',
    submit: 'রিপোর্ট পাঠৌবিয়ু',
    symptom_prompt: 'নত্তে নোংচুপ লৈবে?',
    diarrhea: 'ইথাই থুংথোকপা',
    vomiting: 'থুইরক',
    fever: 'শাং',
    stomach_pain: 'ফজ বীয়া',
    weakness: 'কোয়বা',
    jaundice: 'পীয়া অনীশুবা',
    water_source: 'ইশিং থাবা লম',
    boil_water: 'থুংবদগী মমল ইশিং উম্মিন',
    see_doctor: 'মতমগী মতমদা PHC শিজিনবিয়ু',
    ors_advice: 'ORS থুংবিয়ু',
    alert_msg: 'নংগী নংলো মথকতা ইশিং পুম্ম ফাওরকলে। ইশিং নখা থুংদনবিয়ু।',
  },
  nag: {
    app_name: 'Arogya Purvottar',
    tagline: 'Health System for Northeast',
    report_symptom: 'Report Bimaari',
    water_test: 'Paani Test',
    high_risk: 'Boro Danger',
    medium_risk: 'Maajh Danger',
    low_risk: 'Thoda Danger',
    critical: 'Emergency!',
    outbreak_alert: 'Bimaari Alert!',
    village: 'Village',
    disease: 'Bimaari',
    cases: 'Manush',
    status: 'Kemon ase',
    submit: 'Submit Koribo',
    symptom_prompt: 'Ki ki lagiche apunar?',
    diarrhea: 'Loose Motion',
    vomiting: 'Oita',
    fever: 'Jwor',
    stomach_pain: 'Pet Dukhibo',
    weakness: 'Olop Boro',
    jaundice: 'Paela Bimaari',
    water_source: 'Paanir Jagah',
    boil_water: 'Paani ubaibo first',
    see_doctor: 'PHC jabo ekhoni',
    ors_advice: 'ORS khaibo dehydration na hoble',
    alert_msg: 'Apunar village pashe paani kharap hoise. Kacha paani na khaibo.',
  },
};

export function t(lang: Language, key: string): string {
  return TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS['en']?.[key] ?? key;
}

/**
 * Navbar-compatible translation object.
 * The Navbar consumes `translations[lang].appTitle` etc.
 * We map each language to a flat object with all required keys.
 */
type NavTranslation = {
  appTitle: string;
  mdonerHeader: string;
  navHome: string;
  navLiveMap: string;
  navAnalytics: string;
  citizenPortalName: string;
  ashaPortalName: string;
  phcPortalName: string;
  districtPortalName: string;
  govtPortalName: string;
  adminPortalName: string;
};

const NAV_TRANSLATIONS: Record<Language, NavTranslation> = {
  en: {
    appTitle: 'ArogyaPurvottar',
    mdonerHeader: 'Ministry of Development of North Eastern Region (MDoNER) — Disease Early Warning System',
    navHome: 'Home',
    navLiveMap: 'Live GIS Map',
    navAnalytics: 'Analytics',
    citizenPortalName: 'Citizen Portal',
    ashaPortalName: 'ASHA Worker Portal',
    phcPortalName: 'PHC Medical Officer',
    districtPortalName: 'District Health Officer',
    govtPortalName: 'Government Administrator',
    adminPortalName: 'System Administrator',
  },
  as: {
    appTitle: 'আৰোগ্য পূৰ্বোত্তৰ',
    mdonerHeader: 'উত্তৰ পূৰ্বাঞ্চল বিকাশ মন্ত্ৰালয় — ৰোগ পূৰ্ব সতৰ্কতা ব্যৱস্থা',
    navHome: 'মুখ পৃষ্ঠা',
    navLiveMap: 'লাইভ মানচিত্ৰ',
    navAnalytics: 'বিশ্লেষণ',
    citizenPortalName: 'নাগৰিক পৰ্টেল',
    ashaPortalName: 'আশা কৰ্মী পৰ্টেল',
    phcPortalName: 'PHC চিকিৎসা বিষয়া',
    districtPortalName: 'জিলা স্বাস্থ্য বিষয়া',
    govtPortalName: 'চৰকাৰী প্ৰশাসক',
    adminPortalName: 'ব্যৱস্থা প্ৰশাসক',
  },
  bn: {
    appTitle: 'আরোগ্য পূর্বোত্তর',
    mdonerHeader: 'উত্তর পূর্বাঞ্চল উন্নয়ন মন্ত্রণালয় — রোগ প্রাথমিক সতর্কতা ব্যবস্থা',
    navHome: 'হোম',
    navLiveMap: 'লাইভ মানচিত্র',
    navAnalytics: 'বিশ্লেষণ',
    citizenPortalName: 'নাগরিক পোর্টাল',
    ashaPortalName: 'আশা কর্মী পোর্টাল',
    phcPortalName: 'PHC চিকিৎসা কর্মকর্তা',
    districtPortalName: 'জেলা স্বাস্থ্য কর্মকর্তা',
    govtPortalName: 'সরকারি প্রশাসক',
    adminPortalName: 'সিস্টেম প্রশাসক',
  },
  mni: {
    appTitle: 'আরোগ্য পূর্বোত্তর',
    mdonerHeader: 'মণিপুর স্বাস্থ্য নজরদারি ব্যবস্থা',
    navHome: 'য়ুম্বগী',
    navLiveMap: 'লাইভ মেপ',
    navAnalytics: 'অ্যানালিটিক্স',
    citizenPortalName: 'নগরগী পোর্টেল',
    ashaPortalName: 'আশা শক্তিশালী পোর্টেল',
    phcPortalName: 'PHC ডাক্তর',
    districtPortalName: 'জেলা স্বাস্থ্য বিষয়বস্তু',
    govtPortalName: 'সরকার প্রশাসক',
    adminPortalName: 'সিস্টেম অ্যাডমিন',
  },
  nag: {
    appTitle: 'Arogya Purvottar',
    mdonerHeader: 'Northeast India Health Monitoring — Early Warning System',
    navHome: 'Home',
    navLiveMap: 'Live Map',
    navAnalytics: 'Analytics',
    citizenPortalName: 'Citizen Portal',
    ashaPortalName: 'ASHA Worker Portal',
    phcPortalName: 'PHC Doctor Portal',
    districtPortalName: 'District Officer Portal',
    govtPortalName: 'Govt Admin Portal',
    adminPortalName: 'System Admin',
  },
};

// The Navbar consumes: const t = translations[lang];
export const translations: Record<Language, NavTranslation> = NAV_TRANSLATIONS;

