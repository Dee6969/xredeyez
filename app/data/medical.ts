/**
 * Medical Cannabis — UK access intelligence.
 *
 * Editorial rules (non-negotiable):
 *  - Informational only. Never medical advice; always signpost to clinicians.
 *  - No efficacy or treatment claims. We describe the legal pathway,
 *    not outcomes. Prescription-only medicines cannot be promoted to
 *    the public — no product names, no clinic endorsements.
 *  - Facts verified against 2026 published guidance; lastReviewed below.
 */

export const medicalUk = {
  lastReviewed: "July 2026",

  hero: {
    eyebrow: "UK MEDICAL ACCESS",
    title: "Medical cannabis in the UK, explained properly.",
    lede: "Legal since November 2018 — but most people still don't know how the pathway actually works. This is the clear, honest guide: who can prescribe, who may be eligible, what it costs, and what the law expects of patients.",
  },

  keyFacts: [
    { value: "2018", label: "Legal for specialist prescription since November 2018" },
    { value: "~82,000", label: "Estimated UK patients with prescriptions" },
    { value: "Schedule 2", label: "Cannabis-based medicines under the Misuse of Drugs Regulations" },
    { value: "99%", label: "Of prescriptions come via private clinics, not the NHS" },
  ],

  pathway: [
    {
      step: 1,
      title: "A diagnosed condition, documented",
      body: "The pathway starts with a diagnosed physical or mental health condition in your medical records, and evidence that at least two conventional treatments have been tried without adequate results. Your GP records are the foundation — GPs can't prescribe cannabis-based medicines, but their documentation matters.",
    },
    {
      step: 2,
      title: "Specialist assessment",
      body: "Only doctors on the General Medical Council's Specialist Register can prescribe cannabis-based products for medicinal use. In practice most patients self-refer to a CQC-regulated private clinic, which reviews medical records before any consultation.",
    },
    {
      step: 3,
      title: "Consultation — usually by video",
      body: "An initial specialist consultation reviews your history, current medication and symptoms. Reputable clinics run multidisciplinary or second-opinion reviews before prescribing. Initial consultations typically cost £100–£250.",
    },
    {
      step: 4,
      title: "Prescription and pharmacy",
      body: "If a specialist judges treatment clinically appropriate, a prescription is dispensed by an authorised pharmacy — usually delivered by tracked post within days. First prescriptions commonly arrive 2–8 weeks after the initial consultation.",
    },
    {
      step: 5,
      title: "Ongoing clinical review",
      body: "This is supervised medicine, not a one-off purchase. Expect follow-up reviews (typically £50–£150, every 1–3 months) and ongoing monitoring. Monthly medication costs commonly run £150–£400 depending on what's prescribed.",
    },
  ],

  eligibilityNote:
    "There is no fixed government list of qualifying conditions for private prescribing. Specialists exercise clinical judgement, most commonly for long-term conditions — chronic pain, anxiety and PTSD, sleep disorders, neurological conditions such as MS and epilepsy, and gastrointestinal conditions — where at least two conventional treatments have been tried. Whether treatment is appropriate for you is a decision only a specialist clinician can make.",

  nhsNote:
    "NHS prescribing exists but is rare, limited in practice to a small set of NICE-supported uses: certain severe treatment-resistant epilepsies, spasticity in multiple sclerosis, and chemotherapy-related nausea. For everything else, the realistic route is a regulated private clinic — which is why the UK is effectively a private-pay medical market.",

  lawEssentials: [
    {
      title: "Carry your documentation",
      body: "January 2026 national police guidance instructs officers to treat people with valid prescriptions as patients first. Keep your prescription letter or pharmacy label with your medicine, in its original packaging.",
    },
    {
      title: "No smoking — even prescribed",
      body: "Smoking cannabis remains illegal in the UK regardless of prescription. Prescribed flower must be vaporised; follow the administration route your clinician sets.",
    },
    {
      title: "Driving",
      body: "Drug-driving limits still apply. A valid prescription taken as directed provides a statutory medical defence — but only if you are not impaired. Never drive impaired; discuss timing with your clinician.",
    },
    {
      title: "Travelling",
      body: "Within the UK, carry your prescription and keep medicine in original packaging. Taking cannabis-based medicines abroad requires checking the destination country's rules first — many countries prohibit them entirely, prescription or not.",
    },
    {
      title: "Everything else is still illegal",
      body: "Recreational cannabis remains a Class B controlled drug. Possession without a prescription, buying from unregulated sources, and sharing prescribed medicine are criminal offences. The medical pathway is the only legal route in the UK.",
    },
  ],

  faqs: [
    {
      q: "Is medical cannabis legal in the UK?",
      a: "Yes — since 1 November 2018, when cannabis-based products for medicinal use were moved to Schedule 2 of the Misuse of Drugs Regulations 2001. It is legal only when prescribed by a doctor on the GMC Specialist Register. Recreational cannabis remains illegal as a Class B controlled drug.",
    },
    {
      q: "Can my GP prescribe medical cannabis?",
      a: "No. Only specialist doctors on the General Medical Council's Specialist Register can initiate a prescription. Your GP's role is your records: documented diagnosis and evidence of previous treatments are what a specialist will review.",
    },
    {
      q: "Is medical cannabis available on the NHS?",
      a: "Rarely. NHS prescribing is limited in practice to a small set of NICE-supported uses — certain severe treatment-resistant epilepsies, MS-related spasticity, and chemotherapy-induced nausea. Around 99% of UK patients access treatment through regulated private clinics.",
    },
    {
      q: "What conditions can qualify for a private prescription?",
      a: "There's no fixed list. Specialists commonly assess long-term conditions — including chronic pain, anxiety, PTSD, insomnia, MS, epilepsy, and gastrointestinal conditions — where at least two conventional treatments have been tried without adequate results. Eligibility is always an individual clinical decision.",
    },
    {
      q: "How much does medical cannabis cost in the UK?",
      a: "As of 2026, typical private costs are £100–£250 for an initial specialist consultation, £50–£150 for follow-ups every one to three months, and £150–£400 per month for medication depending on what's prescribed. NHS funding is not available to most patients.",
    },
    {
      q: "How long does it take to get a prescription?",
      a: "Most patients receive a first prescription within two to eight weeks of an initial consultation, depending on how quickly medical records can be obtained and reviewed. Medication is dispensed by an authorised pharmacy, usually by tracked delivery.",
    },
    {
      q: "Can I drive with a medical cannabis prescription?",
      a: "Drug-driving limits apply to everyone. Patients taking their medicine as prescribed have a statutory medical defence — but only if not impaired. Driving impaired is an offence regardless of prescription. Carry your prescription documentation and take clinical advice on timing.",
    },
    {
      q: "Can I travel with my prescription?",
      a: "Within the UK: yes — keep medicine in its original packaging with your prescription letter, especially following the 2026 'patients first' police guidance. Abroad: check the destination country before travelling; many countries prohibit cannabis-based medicines entirely, and UK prescriptions carry no weight there.",
    },
  ],

  disclaimer:
    "This guide is editorial information, not medical or legal advice. XRED EYEZ is not a clinic, does not prescribe, does not sell or promote any medicine, and receives no payment from any clinic mentioned in guidance sources. Whether any treatment is appropriate for you is a decision for you and a qualified clinician. If you're considering the pathway, start with your GP records and a CQC-regulated specialist clinic.",
};
