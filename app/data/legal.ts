export interface LegalPage {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  sections: {
    heading: string;
    body: string[];
  }[];
}

export const legalPages: LegalPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    eyebrow: "PRIVACY",
    description: "How X Red Eyez handles personal information submitted through the website.",
    sections: [
      {
        heading: "What we collect",
        body: [
          "If you join the Vault or contact us, we may collect your email address and any information you choose to submit.",
          "We may also receive basic technical data such as browser type, device information, referring pages, and site usage signals used to keep the website secure and improve the experience.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "We use submitted information to manage early access, send brand updates, respond to enquiries, improve the website, and protect the service from misuse.",
          "We do not sell personal information. If we use service providers to run the website, mailing list, analytics, or hosting, they only receive what is needed to provide that service.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "You can unsubscribe from marketing emails at any time using the link in the message or by contacting us.",
          "You can also request access, correction, or deletion of personal information where applicable.",
        ],
      },
    ],
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    eyebrow: "COOKIES",
    description: "How cookies and similar technologies may be used on the X Red Eyez website.",
    sections: [
      {
        heading: "What cookies do",
        body: [
          "Cookies help websites remember basic preferences, understand traffic, protect forms, and improve performance.",
          "The site may use essential cookies for security and functionality. Analytics or marketing cookies should only be used where they are configured and permitted.",
        ],
      },
      {
        heading: "Managing cookies",
        body: [
          "You can control or delete cookies through your browser settings.",
          "Blocking some cookies may affect features such as forms, saved preferences, or analytics-based improvements.",
        ],
      },
      {
        heading: "Future updates",
        body: [
          "If additional analytics, advertising, or membership tools are added later, this policy should be updated to describe them clearly.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    eyebrow: "TERMS",
    description: "The basic terms for using the X Red Eyez website and its content.",
    sections: [
      {
        heading: "Use of the website",
        body: [
          "This website is provided for brand, lifestyle, editorial, and early access purposes.",
          "You agree not to misuse the site, interfere with its operation, submit false information, or attempt to access systems that are not intended for public use.",
        ],
      },
      {
        heading: "Content",
        body: [
          "All brand content, visuals, copy, layout, and design elements belong to X Red Eyez or their respective rights holders unless stated otherwise.",
          "News signal pages are original X Red Eyez commentary based on source-linked reporting and should not be treated as legal, medical, investment, or professional advice.",
        ],
      },
      {
        heading: "Cannabis notice",
        body: [
          "X Red Eyez is a cannabis lifestyle brand. Content is intended for adults and for lawful audiences only.",
          "Laws around cannabis vary by country and region. Users are responsible for understanding and following the laws that apply where they live.",
        ],
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    eyebrow: "ACCESSIBILITY",
    description: "Our commitment to making the X Red Eyez website usable and clear.",
    sections: [
      {
        heading: "Experience",
        body: [
          "The site is designed to be atmospheric, but clarity still matters. We aim to keep navigation visible, text readable, and interactions understandable.",
          "Where animation or visual effects are used, the experience should remain navigable without relying on those effects alone.",
        ],
      },
      {
        heading: "Feedback",
        body: [
          "If something is difficult to read, navigate, or use, we want to know so it can be improved.",
          "Accessibility is treated as an ongoing part of the website rather than a one-time checklist.",
        ],
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact",
    eyebrow: "CONTACT",
    description: "For enquiries, early access, partnerships, and brand communication.",
    sections: [
      {
        heading: "Brand enquiries",
        body: [
          "For launch, partnership, press, or brand enquiries, contact the X Red Eyez team through the official channels connected to this site.",
          "For early access, use the Vault sign-up form so your email is captured in the correct list.",
        ],
      },
      {
        heading: "Powered by P11 Digital",
        body: [
          "Website strategy, digital build, and launch support are powered by P11 Digital.",
        ],
      },
    ],
  },
];

export function getLegalPage(slug: string) {
  return legalPages.find((page) => page.slug === slug);
}
