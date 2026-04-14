"use client";

import { useEffect, useState } from "react";

const STARTER_CHECKOUT_LINK = "/checkout/starter";
const PRO_CHECKOUT_LINK = "/checkout/pro";
const CONTACT_EMAIL = "contact@radarrival.fr";

type Locale = "fr" | "en";

type Copy = {
  nav: {
    links: Array<{ href: string; label: string }>;
    cta: string;
    switcherLabel: string;
  };
  hero: {
    eyebrow: string;
    titleStart: string;
    titleAccent: string;
    description: string;
    planSummary: string;
    primaryCta: string;
    secondaryCta: string;
    previewTitle: string;
    previewDay: string;
    signupTitle: string;
    signupPlaceholder: string;
    signupCta: string;
    signupSuccess: string;
    signupError: string;
    signupDivider: string;
  };
  trustBar: string[];
  howItWorks: {
    title: string;
    subtitle: string;
    stepLabel: string;
    steps: Array<{ title: string; desc: string }>;
  };
  report: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; desc: string }>;
  };
  pricing: {
    title: string;
    subtitle: string;
    checkoutHint: string;
    securePayment: string;
    currencyNote: string;
    plans: Array<{
      name: string;
      badge: string;
      price: string;
      cadence: string;
      trial: string;
      description: string;
      cta: string;
      href: string;
      features: string[];
    }>;
  };
  faq: {
    title: string;
    items: Array<{ q: string; a: string }>;
  };
  finalCta: {
    title: string;
    description: string;
    buttons: Array<{ label: string; href: string; variant: "primary" | "secondary" }>;
  };
  footer: {
    tagline: string;
    links: Array<{ href: string; label: string; external?: boolean }>;
    copyright: string;
    legal: string;
  };
};

const copy: Record<Locale, Copy> = {
  fr: {
    nav: {
      links: [
        { href: "#how-it-works", label: "Fonctionnement" },
        { href: "#report", label: "Le rapport" },
        { href: "#pricing", label: "Tarifs" },
        { href: "#faq", label: "FAQ" },
      ],
      cta: "Voir les offres",
      switcherLabel: "Changer la langue",
    },
    hero: {
      eyebrow: "RadarRival · Veille concurrentielle pour PME et indépendants",
      titleStart: "Chaque lundi, sachez exactement ce que font",
      titleAccent: "vos concurrents.",
      description:
        "Recevez une veille claire et exploitable sur les sites web, réseaux sociaux, prix, recrutements et signaux de marché de vos concurrents, sans y passer vos soirées.",
      planSummary: "Starter 19€/mois · Pro 29€/mois · Essai gratuit 7 jours",
      primaryCta: "Commencer l'essai gratuit de 7 jours",
      secondaryCta: "Voir les plans",
      previewTitle: "Brief concurrentiel hebdomadaire",
      previewDay: "Lundi",
      signupTitle: "Démarrez votre essai gratuit",
      signupPlaceholder: "Entrez votre email pour commencer",
      signupCta: "Commencer gratuitement",
      signupSuccess: "Merci\u00a0! Vous recevrez votre premier rapport lundi prochain.",
      signupError: "Une erreur est survenue. Veuillez réessayer.",
      signupDivider: "Ou payer directement",
    },
    trustBar: [
      "Essai gratuit 7 jours",
      "Rapport chaque lundi",
      "Jusqu'à 5 concurrents surveillés",
      "Paiement sécurisé par Stripe",
    ],
    howItWorks: {
      title: "Comment ça marche",
      subtitle: "Trois étapes simples pour garder un radar précis sur votre marché.",
      stepLabel: "Étape",
      steps: [
        {
          title: "Choisissez Starter ou Pro",
          desc: "Sélectionnez la formule adaptée à votre rythme de veille, puis partagez les noms ou URLs des concurrents à suivre.",
        },
        {
          title: "RadarRival surveille les signaux",
          desc: "Nous analysons en continu les sites web, réseaux sociaux, offres, recrutements et mentions publiques de vos concurrents.",
        },
        {
          title: "Recevez votre synthèse chaque lundi",
          desc: "Chaque lundi matin, vous recevez un rapport lisible, priorisé et directement actionnable par email.",
        },
      ],
    },
    report: {
      title: "Ce que contient votre rapport",
      subtitle: "Une vue nette de ce qui change vraiment chez vos concurrents, chaque semaine.",
      items: [
        {
          title: "Changements de site web",
          desc: "Nouvelles pages, repositionnements, ajustements d'offres et évolutions de contenu repérés automatiquement.",
        },
        {
          title: "Activité réseaux sociaux",
          desc: "Nouveaux messages, campagnes, formats et rythmes de publication suivis pour vous.",
        },
        {
          title: "Évolutions tarifaires",
          desc: "Hausses, baisses, promotions et nouvelles formules détectées dès qu'elles apparaissent.",
        },
        {
          title: "Nouveaux produits et services",
          desc: "Lancements, mises à jour et annonces qui peuvent signaler un mouvement stratégique.",
        },
        {
          title: "Offres d'emploi",
          desc: "Les recrutements servent d'indicateur avancé sur les priorités et la croissance de vos concurrents.",
        },
        {
          title: "Retombées presse",
          desc: "Interviews, articles, partenariats et prises de parole publiques centralisés dans un seul point de lecture.",
        },
      ],
    },
    pricing: {
      title: "Deux formules, un radar plus net",
      subtitle: "Choisissez le niveau de couverture adapté à votre marché et démarrez avec 7 jours d'essai gratuit.",
      checkoutHint: "Chaque bouton ouvre une page Stripe dédiée à la formule choisie, sans mélange entre Starter et Pro.",
      securePayment: "💳 Paiement sécurisé par Stripe",
      currencyNote: "Prix affichés en USD — équivalent à environ 19 €/mois ou 29 €/mois selon votre formule.",
      plans: [
        {
          name: "Starter",
          badge: "Pour démarrer vite",
          price: "19€",
          cadence: "/mois",
          trial: "Essai gratuit 7 jours",
          description: "L'essentiel pour suivre les mouvements clés de votre marché sans friction.",
          cta: "Essai gratuit 7 jours",
          href: STARTER_CHECKOUT_LINK,
          features: [
            "Jusqu'à 3 concurrents",
            "Rapport hebdomadaire chaque lundi",
            "Changements web et contenus",
            "Suivi réseaux sociaux et offres",
          ],
        },
        {
          name: "Pro",
          badge: "Le plus réactif",
          price: "29€",
          cadence: "/mois",
          trial: "Essai gratuit 7 jours",
          description: "Plus de couverture, plus de signaux et des alertes plus rapides pour les marchés actifs.",
          cta: "Essai gratuit 7 jours",
          href: PRO_CHECKOUT_LINK,
          features: [
            "Jusqu'à 5 concurrents",
            "Rapport hebdomadaire chaque lundi",
            "Alertes en temps réel",
            "Changements web, offres, presse et recrutements",
          ],
        },
      ],
    },
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          q: "Comment fonctionne la surveillance de mes concurrents ?",
          a: "Vous choisissez Starter ou Pro, puis vous nous transmettez les concurrents à suivre. RadarRival analyse ensuite leurs signaux publics et vous envoie chaque lundi une synthèse structurée.",
        },
        {
          q: "Puis-je changer les concurrents surveillés ?",
          a: "Oui. Il suffit de nous écrire et la nouvelle liste est prise en compte pour le cycle de veille suivant.",
        },
        {
          q: "À qui s'adresse RadarRival ?",
          a: "Aux PME, agences, indépendants et équipes marketing qui veulent rester informés sans passer des heures en veille manuelle.",
        },
        {
          q: "Puis-je annuler à tout moment ?",
          a: "Oui. L'abonnement est mensuel et sans engagement long terme.",
        },
        {
          q: "Les données utilisées sont-elles légales ?",
          a: "Oui. RadarRival s'appuie uniquement sur des informations publiquement accessibles : sites web, réseaux sociaux publics, offres d'emploi et mentions presse.",
        },
        {
          q: "Sous quel format reçois-je le rapport ?",
          a: "Vous recevez un email clair chaque lundi matin, avec les changements prioritaires et un lien vers le rapport détaillé.",
        },
      ],
    },
    finalCta: {
      title: "Prêt à surveiller vos concurrents avec plus de précision ?",
      description: "Choisissez votre formule, lancez l'essai gratuit, puis laissez RadarRival faire le travail chaque semaine.",
      buttons: [
        {
          label: "Starter · Essai gratuit 7 jours",
          href: STARTER_CHECKOUT_LINK,
          variant: "primary",
        },
        {
          label: "Pro · Essai gratuit 7 jours",
          href: PRO_CHECKOUT_LINK,
          variant: "secondary",
        },
      ],
    },
    footer: {
      tagline: "Veille concurrentielle hebdomadaire bilingue pour petites équipes ambitieuses.",
      links: [
        { href: "#pricing", label: "Tarifs" },
        { href: "#faq", label: "FAQ" },
        { href: `mailto:${CONTACT_EMAIL}`, label: "Contact" },
        { href: "https://www.linkedin.com/company/radarrival/", label: "Suivez-nous sur LinkedIn", external: true },
      ],
      copyright: "© 2026 RadarRival. Tous droits réservés.",
      legal:
        "RadarRival collecte uniquement des données publiquement accessibles. Hébergement : Vercel Inc. Paiement : Stripe.",
    },
  },
  en: {
    nav: {
      links: [
        { href: "#how-it-works", label: "How it works" },
        { href: "#report", label: "The report" },
        { href: "#pricing", label: "Pricing" },
        { href: "#faq", label: "FAQ" },
      ],
      cta: "View plans",
      switcherLabel: "Switch language",
    },
    hero: {
      eyebrow: "RadarRival · Competitor monitoring for small teams and solo operators",
      titleStart: "Every Monday, know exactly what",
      titleAccent: "your competitors are doing.",
      description:
        "Get a clear, actionable digest covering competitor websites, social media, pricing, hiring, and market signals without spending hours tracking it yourself.",
      planSummary: "Starter €19/month · Pro €29/month · 7-day free trial",
      primaryCta: "Start your 7-day free trial",
      secondaryCta: "See plans",
      previewTitle: "Weekly competitor brief",
      previewDay: "Monday",
      signupTitle: "Start your free trial",
      signupPlaceholder: "Enter your email to get started",
      signupCta: "Get started for free",
      signupSuccess: "Thanks! You\u2019ll receive your first report next Monday.",
      signupError: "Something went wrong. Please try again.",
      signupDivider: "Or pay directly",
    },
    trustBar: [
      "7-day free trial",
      "Weekly report every Monday",
      "Track up to 5 competitors",
      "Secure Stripe checkout",
    ],
    howItWorks: {
      title: "How it works",
      subtitle: "Three simple steps to keep a sharp radar on your market.",
      stepLabel: "Step",
      steps: [
        {
          title: "Choose Starter or Pro",
          desc: "Pick the plan that matches your monitoring needs, then send the competitors you want us to watch.",
        },
        {
          title: "RadarRival tracks the signals",
          desc: "We continuously monitor websites, social channels, offers, hiring activity, and public mentions from your competitors.",
        },
        {
          title: "Get your Monday briefing",
          desc: "Every Monday morning, you receive a readable, prioritized report by email with the changes that matter.",
        },
      ],
    },
    report: {
      title: "What your report includes",
      subtitle: "A focused weekly view of what is actually changing across your competitive landscape.",
      items: [
        {
          title: "Website changes",
          desc: "New pages, repositioning, offer updates, and content changes spotted automatically.",
        },
        {
          title: "Social media activity",
          desc: "Fresh posts, campaign patterns, formats, and publishing tempo monitored for you.",
        },
        {
          title: "Pricing changes",
          desc: "Price increases, discounts, limited offers, and new packages detected as they appear.",
        },
        {
          title: "New products and services",
          desc: "Launches, updates, and announcements that can signal a strategic move in the market.",
        },
        {
          title: "Job openings",
          desc: "Hiring patterns reveal priorities, expansion moves, and capability building before they are obvious elsewhere.",
        },
        {
          title: "Press coverage",
          desc: "Interviews, articles, partnerships, and public mentions gathered in one concise view.",
        },
      ],
    },
    pricing: {
      title: "Two plans, one clearer radar",
      subtitle: "Choose the level of competitor coverage that fits your market and start with a 7-day free trial.",
      checkoutHint: "Each button opens a Stripe checkout dedicated to that plan, with no Starter/Pro mix in the cart.",
      securePayment: "💳 Secure payment processed by Stripe",
      currencyNote: "Prices displayed in USD — equivalent to approximately €19/month or €29/month depending on your plan.",
      plans: [
        {
          name: "Starter",
          badge: "Best to begin",
          price: "€19",
          cadence: "/month",
          trial: "7-day free trial",
          description: "The essential layer for keeping up with key competitor moves without extra overhead.",
          cta: "7-day free trial",
          href: STARTER_CHECKOUT_LINK,
          features: [
            "Up to 3 competitors",
            "Weekly report every Monday",
            "Website and content changes",
            "Social media and offer tracking",
          ],
        },
        {
          name: "Pro",
          badge: "Fastest signal coverage",
          price: "€29",
          cadence: "/month",
          trial: "7-day free trial",
          description: "More coverage, more signals, and faster alerts for active, fast-moving markets.",
          cta: "7-day free trial",
          href: PRO_CHECKOUT_LINK,
          features: [
            "Up to 5 competitors",
            "Weekly report every Monday",
            "Real-time alerts",
            "Website, offer, press, and hiring changes",
          ],
        },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "How does competitor monitoring work?",
          a: "You choose Starter or Pro and send us the competitors you want tracked. RadarRival then monitors their public signals and sends you a structured summary every Monday.",
        },
        {
          q: "Can I change the competitors being tracked?",
          a: "Yes. Just email us and the updated list will be applied to the next monitoring cycle.",
        },
        {
          q: "Who is RadarRival for?",
          a: "Small businesses, agencies, solo operators, and marketing teams that want useful competitor intelligence without a manual research workflow.",
        },
        {
          q: "Can I cancel at any time?",
          a: "Yes. It is a monthly subscription with no long-term commitment.",
        },
        {
          q: "Is the data collection legal?",
          a: "Yes. RadarRival only relies on publicly available sources such as websites, public social profiles, job listings, and press mentions.",
        },
        {
          q: "How do I receive the report?",
          a: "You get a clear email every Monday morning with the most important changes and a link to the detailed report.",
        },
      ],
    },
    finalCta: {
      title: "Ready to track your competitors with more precision?",
      description: "Pick your plan, start the free trial, and let RadarRival handle the weekly monitoring.",
      buttons: [
        {
          label: "Starter · 7-day free trial",
          href: STARTER_CHECKOUT_LINK,
          variant: "primary",
        },
        {
          label: "Pro · 7-day free trial",
          href: PRO_CHECKOUT_LINK,
          variant: "secondary",
        },
      ],
    },
    footer: {
      tagline: "Bilingual weekly competitor intelligence for ambitious small teams.",
      links: [
        { href: "#pricing", label: "Pricing" },
        { href: "#faq", label: "FAQ" },
        { href: `mailto:${CONTACT_EMAIL}`, label: "Contact" },
        { href: "https://www.linkedin.com/company/radarrival/", label: "LinkedIn", external: true },
      ],
      copyright: "© 2026 RadarRival. All rights reserved.",
      legal:
        "RadarRival only collects publicly available data. Hosting: Vercel Inc. Payments: Stripe.",
    },
  },
};

function IconSearch() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
}

function IconEye() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.963-7.178z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V8.25a4.5 4.5 0 10-9 0v2.25m-1.5 0h12a1.5 1.5 0 011.5 1.5v6.75a1.5 1.5 0 01-1.5 1.5h-12A1.5 1.5 0 014.5 18.75V12a1.5 1.5 0 011.5-1.5z"
      />
    </svg>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
      >
        <span className="text-lg font-medium text-white">{q}</span>
        <span className="shrink-0 text-2xl leading-none text-brand-400">{open ? "−" : "+"}</span>
      </button>
      {open ? <p className="pb-5 text-slate-300 leading-relaxed">{a}</p> : null}
    </div>
  );
}

const stepIcons = [<IconSearch key="search" />, <IconEye key="eye" />, <IconMail key="mail" />];

export default function Home() {
  const [locale, setLocale] = useState<Locale>("fr");
  const t = copy[locale];
  const [email, setEmail] = useState("");
  const [signupState, setSignupState] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setSignupState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "landing_page" }),
      });
      if (res.ok) {
        setSignupState("success");
        setEmail("");
      } else {
        setSignupState("error");
      }
    } catch {
      setSignupState("error");
    }
  }

  return (
    <div className="relative flex flex-col overflow-x-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.22),_transparent_48%)]" />
      <div className="pointer-events-none absolute left-1/2 top-32 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full border border-brand-500/12" />
      <div className="pointer-events-none absolute left-1/2 top-44 h-[25rem] w-[25rem] -translate-x-1/2 rounded-full border border-brand-500/12" />
      <div className="pointer-events-none absolute left-1/2 top-[13.5rem] h-40 w-40 -translate-x-1/2 rounded-full bg-brand-500/8 blur-3xl" />

      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-slate-950/78 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <a href="#" className="text-xl font-bold tracking-tight">
            <span className="text-brand-400">Radar</span>Rival
          </a>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            {t.nav.links.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div
              role="group"
              className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-xs font-semibold text-slate-300"
              aria-label={t.nav.switcherLabel}
            >
              {(["en", "fr"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={locale === value}
                  onClick={() => setLocale(value)}
                  className={`rounded-full px-3 py-1.5 transition ${
                    locale === value
                      ? "bg-brand-500 text-slate-950 shadow-lg shadow-brand-500/20"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {value.toUpperCase()}
                </button>
              ))}
            </div>

            <a
              href="#pricing"
              className="hidden rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-brand-400 sm:inline-block"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/4 px-6 py-12 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_40px_120px_rgba(2,6,23,0.65)] backdrop-blur md:px-12 md:py-16">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,185,129,0.08),transparent_48%,rgba(16,185,129,0.06))]" />
            <div className="absolute -right-16 top-8 h-48 w-48 rounded-full border border-brand-500/15" />
            <div className="relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
                <div className="mb-6 inline-flex items-center rounded-full border border-brand-500/20 bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-200">
                  {t.hero.eyebrow}
                </div>
                <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                  {t.hero.titleStart} <span className="text-brand-400">{t.hero.titleAccent}</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
                  {t.hero.description}
                </p>
                <p className="mt-6 text-sm font-medium uppercase tracking-[0.22em] text-brand-200">
                  {t.hero.planSummary}
                </p>
                <div className="mt-10">
                  <div className="rounded-2xl border border-brand-500/30 bg-brand-500/8 p-6">
                    <p className="mb-4 text-base font-semibold text-white">{t.hero.signupTitle}</p>
                    {signupState === "success" ? (
                      <p className="text-sm font-medium text-brand-300">{t.hero.signupSuccess}</p>
                    ) : (
                      <form onSubmit={handleSignup} className="flex flex-col gap-3 sm:flex-row">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={t.hero.signupPlaceholder}
                          className="flex-1 rounded-full border border-white/15 bg-slate-900 px-5 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-brand-500/60 focus:ring-1 focus:ring-brand-500/40"
                        />
                        <button
                          type="submit"
                          disabled={signupState === "loading"}
                          className="shrink-0 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-brand-400 disabled:opacity-60"
                        >
                          {signupState === "loading" ? "…" : t.hero.signupCta}
                        </button>
                      </form>
                    )}
                    {signupState === "error" && (
                      <p className="mt-2 text-xs text-red-400">{t.hero.signupError}</p>
                    )}
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{t.hero.signupDivider}</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                    <a
                      href="#pricing"
                      className="inline-flex rounded-full bg-white/8 px-6 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/12 hover:text-white border border-white/10"
                    >
                      {t.hero.primaryCta}
                    </a>
                    <a
                      href="#pricing"
                      className="inline-flex rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-slate-400 transition hover:text-slate-200"
                    >
                      {t.hero.secondaryCta}
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-brand-300">RadarRival</p>
                      <p className="mt-2 text-2xl font-semibold text-white">{t.hero.previewTitle}</p>
                    </div>
                    <div className="rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-200">
                      {t.hero.previewDay}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {t.report.items.slice(0, 3).map((item, index) => (
                      <div key={item.title} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-white">{item.title}</p>
                          <span className="rounded-full bg-brand-500/12 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-200">
                            0{index + 1}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-300">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/4">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 py-7 text-sm text-slate-300">
          {t.trustBar.map((item) => (
            <span key={item}>• {item}</span>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.howItWorks.title}</h2>
            <p className="mt-4 text-lg text-slate-400">{t.howItWorks.subtitle}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {t.howItWorks.steps.map((item, index) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/4 p-8 transition hover:border-brand-500/25 hover:bg-white/6"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-500/20 bg-brand-500/10 text-brand-300">
                    {stepIcons[index]}
                  </div>
                  <span className="text-sm font-medium uppercase tracking-[0.18em] text-brand-300">
                    {t.howItWorks.stepLabel} {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="report" className="bg-white/3 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.report.title}</h2>
            <p className="mt-4 text-lg text-slate-400">{t.report.subtitle}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.report.items.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-6 transition hover:border-brand-500/25"
              >
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.pricing.title}</h2>
            <p className="mt-4 text-lg text-slate-400">{t.pricing.subtitle}</p>
            <p className="mt-5 text-sm text-brand-200">{t.pricing.checkoutHint}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {t.pricing.plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`relative overflow-hidden rounded-[2rem] border p-8 md:p-10 ${
                  index === 1
                    ? "border-brand-500/35 bg-[linear-gradient(180deg,rgba(16,185,129,0.16),rgba(15,23,42,0.92))]"
                    : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(15,23,42,0.9))]"
                }`}
              >
                <div className="absolute -right-12 top-8 h-36 w-36 rounded-full border border-brand-500/15" />
                <div className="relative">
                  <div className="mb-8">
                    <div className="mb-5 inline-flex rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-200">
                      {plan.badge}
                    </div>
                    <p className="text-sm font-medium uppercase tracking-[0.22em] text-brand-300">{plan.name}</p>
                    <div className="mt-3 flex items-end gap-2">
                      <span className="text-5xl font-bold text-white md:text-6xl">{plan.price}</span>
                      <span className="mb-2 text-lg text-slate-400">{plan.cadence}</span>
                    </div>
                    <p className="mt-4 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-slate-100">
                      {plan.trial}
                    </p>
                    <p className="mt-5 max-w-xl leading-relaxed text-slate-300">{plan.description}</p>
                  </div>

                  <div className="mb-10 space-y-4">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <IconCheck />
                        <span className="text-sm text-slate-200">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={plan.href}
                    className={`inline-flex w-full items-center justify-center rounded-full px-6 py-4 text-center text-lg font-semibold transition ${
                      index === 1
                        ? "bg-brand-400 text-slate-950 hover:bg-brand-300"
                        : "bg-white text-slate-950 hover:bg-slate-200"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-6 flex max-w-3xl flex-col items-center gap-2 text-center text-sm">
            <p className="inline-flex items-center gap-2 text-slate-400">
              <IconLock />
              <span>{t.pricing.securePayment}</span>
            </p>
            <p className="leading-relaxed text-slate-500">{t.pricing.currencyNote}</p>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white/3 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.faq.title}</h2>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 px-6 py-3 md:px-8">
            {t.faq.items.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(16,185,129,0.16),rgba(15,23,42,0.92)_55%)] px-6 py-12 text-center shadow-2xl md:px-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{t.finalCta.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-300">{t.finalCta.description}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {t.finalCta.buttons.map((button) => (
              <a
                key={button.label}
                href={button.href}
                className={`inline-flex rounded-full px-7 py-4 text-center text-lg font-semibold transition ${
                  button.variant === "primary"
                    ? "bg-brand-400 text-slate-950 hover:bg-brand-300"
                    : "border border-white/15 text-white hover:border-brand-400/40 hover:bg-white/5"
                }`}
              >
                {button.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-brand-400">Radar</span>Rival
              </span>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">{t.footer.tagline}</p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              {t.footer.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition hover:text-white"
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-white/8 pt-8 text-center text-xs text-slate-500">
            <p>{t.footer.copyright}</p>
            <p className="mt-2">{t.footer.legal}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
