"use client";

import { useState } from "react";

const PAYMENT_LINK = "https://buy.stripe.com/9B6cN63He7uTgXg9gLeOg1C";

/* ─── Icons as inline SVGs ─── */
function IconSearch() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  );
}
function IconEye() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

/* ─── FAQ Accordion ─── */
const faqs = [
  {
    q: "Comment fonctionne la surveillance de mes concurrents\u00a0?",
    a: "Vous nous communiquez 3 à 5 concurrents lors de votre inscription. Notre système surveille en continu leurs sites web, réseaux sociaux, offres d\u2019emploi et mentions presse. Chaque lundi, vous recevez un rapport clair et actionnable par email.",
  },
  {
    q: "Puis-je changer mes concurrents surveillés\u00a0?",
    a: "Bien sûr. Vous pouvez modifier votre liste de concurrents à tout moment en nous contactant par email. Les changements sont pris en compte dès le rapport suivant.",
  },
  {
    q: "Quel type d\u2019entreprises utilisent ce service\u00a0?",
    a: "Notre service est conçu pour les PME, TPE et indépendants français qui veulent garder un œil sur leur marché sans y passer des heures. Consultants, e-commerçants, agences, SaaS — tous nos clients partagent le besoin d\u2019une veille simple et efficace.",
  },
  {
    q: "Est-ce que je peux annuler à tout moment\u00a0?",
    a: "Oui, l\u2019abonnement mensuel est sans engagement. Vous pouvez annuler à tout moment depuis votre espace ou en nous envoyant un simple email.",
  },
  {
    q: "Les données collectées sont-elles légales\u00a0?",
    a: "Absolument. Nous collectons uniquement des informations publiquement accessibles (sites web, réseaux sociaux publics, communiqués de presse). Notre service est 100\u00a0% conforme au RGPD.",
  },
  {
    q: "Sous quel format reçois-je le rapport\u00a0?",
    a: "Vous recevez chaque lundi matin un email structuré avec un résumé des changements clés, accompagné d\u2019un lien vers votre rapport détaillé en ligne.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-700/50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 cursor-pointer"
      >
        <span className="text-lg font-medium text-white">{q}</span>
        <span className="shrink-0 text-brand-400 text-2xl leading-none">
          {open ? "\u2212" : "+"}
        </span>
      </button>
      {open && (
        <p className="pb-5 text-slate-300 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

/* ─── Report items ─── */
const reportItems = [
  { title: "Changements de site web", desc: "Nouvelles pages, modifications de contenu, refontes détectées automatiquement." },
  { title: "Activité réseaux sociaux", desc: "Publications, engagement et stratégies de contenu de vos concurrents." },
  { title: "Évolutions tarifaires", desc: "Changements de prix, nouvelles offres, promotions en cours." },
  { title: "Nouveaux produits & services", desc: "Lancements, mises à jour et nouvelles fonctionnalités repérés pour vous." },
  { title: "Offres d\u2019emploi", desc: "Recrutements en cours \u2014 un indicateur clé de la stratégie de vos concurrents." },
  { title: "Retombées presse", desc: "Articles, interviews et mentions médiatiques de vos concurrents." },
];

/* ─── Main Page ─── */
export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-brand-400">Create</span> Co
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#comment-ca-marche" className="hover:text-white transition">Fonctionnement</a>
            <a href="#rapport" className="hover:text-white transition">Le rapport</a>
            <a href="#tarif" className="hover:text-white transition">Tarif</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
          </div>
          <a
            href={PAYMENT_LINK}
            className="bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition"
          >
            Commencer
          </a>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/30 via-slate-950 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-600/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 bg-brand-600/10 border border-brand-500/20 rounded-full text-brand-300 text-sm font-medium">
            Veille concurrentielle pour PME &amp; indépendants
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
            Chaque lundi, sachez exactement ce que font{" "}
            <span className="text-brand-400">vos concurrents.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Recevez un rapport de veille complet chaque semaine — changements web,
            réseaux sociaux, prix, recrutements — sans lever le petit doigt.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={PAYMENT_LINK}
              className="bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-4 rounded-xl text-lg transition shadow-lg shadow-brand-600/20"
            >
              Démarrer ma veille — 49€/mois
            </a>
            <a
              href="#comment-ca-marche"
              className="text-slate-300 hover:text-white font-medium px-6 py-4 transition"
            >
              Comment ça marche →
            </a>
          </div>
        </div>
      </section>

      {/* ─── Social proof bar ─── */}
      <section className="border-y border-slate-800/50 bg-slate-900/30">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-slate-400">
          <span>✓ Sans engagement</span>
          <span>✓ Rapport chaque lundi</span>
          <span>✓ 100% conforme RGPD</span>
          <span>✓ Support réactif</span>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section id="comment-ca-marche" className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comment ça marche
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Trois étapes simples pour ne plus jamais être pris au dépourvu.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                icon: <IconSearch />,
                title: "Donnez-nous 3 à 5 concurrents",
                desc: "Inscrivez-vous et partagez les noms ou URLs de vos principaux concurrents. C\u2019est tout ce dont nous avons besoin.",
              },
              {
                step: "2",
                icon: <IconEye />,
                title: "On surveille tout pour vous",
                desc: "Notre technologie analyse en continu les sites web, réseaux sociaux, offres d\u2019emploi et mentions presse de vos concurrents.",
              },
              {
                step: "3",
                icon: <IconMail />,
                title: "Recevez votre rapport chaque lundi",
                desc: "Un email clair et structuré arrive dans votre boîte chaque lundi matin avec tout ce qui a changé.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-slate-900/50 border border-slate-800/50 rounded-2xl p-8 hover:border-brand-500/30 transition"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-brand-600/10 border border-brand-500/20 rounded-xl flex items-center justify-center text-brand-400">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-brand-400">
                    Étape {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What's in the report ─── */}
      <section id="rapport" className="py-20 md:py-28 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ce que contient votre rapport
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Chaque lundi, recevez une vision complète de l&apos;activité de vos concurrents.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportItems.map((item) => (
              <div
                key={item.title}
                className="bg-slate-950/50 border border-slate-800/50 rounded-xl p-6 hover:border-brand-500/30 transition"
              >
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="tarif" className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Un tarif simple et transparent
            </h2>
            <p className="text-slate-400 text-lg">
              Tout est inclus. Sans engagement mensuel.
            </p>
          </div>

          <div className="bg-gradient-to-b from-slate-900 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="text-sm font-medium text-brand-400 mb-2">
                Veille Concurrentielle
              </div>
              <div className="flex items-end justify-center gap-2 mb-1">
                <span className="text-5xl md:text-6xl font-bold">49€</span>
                <span className="text-slate-400 text-lg mb-2">/mois</span>
              </div>
              <p className="text-slate-400 text-sm">
                ou <span className="text-brand-300 font-medium">39€/mois</span> avec l&apos;abonnement annuel (468€/an)
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-10 max-w-lg mx-auto">
              {[
                "Surveillance de 3 à 5 concurrents",
                "Rapport hebdomadaire par email",
                "Changements web & contenus",
                "Veille réseaux sociaux",
                "Suivi des prix et offres",
                "Offres d\u2019emploi détectées",
                "Retombées presse",
                "Support par email",
              ].map((feat) => (
                <div key={feat} className="flex items-start gap-3 py-1">
                  <IconCheck />
                  <span className="text-slate-200 text-sm">{feat}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <a
                href={PAYMENT_LINK}
                className="inline-block bg-brand-600 hover:bg-brand-500 text-white font-semibold px-10 py-4 rounded-xl text-lg transition shadow-lg shadow-brand-600/20"
              >
                Commencer maintenant
              </a>
              <p className="text-slate-500 text-sm mt-4">
                Paiement sécurisé par Stripe. Annulation en un clic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 md:py-28 bg-slate-900/30">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Questions fréquentes
            </h2>
          </div>
          <div>
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à surveiller vos concurrents&nbsp;?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Rejoignez les dirigeants qui démarrent chaque semaine avec un avantage concurrentiel.
          </p>
          <a
            href={PAYMENT_LINK}
            className="inline-block bg-brand-600 hover:bg-brand-500 text-white font-semibold px-10 py-4 rounded-xl text-lg transition shadow-lg shadow-brand-600/20"
          >
            Démarrer ma veille — 49€/mois
          </a>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-slate-800/50 bg-slate-950">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-lg font-bold">
                <span className="text-brand-400">Create</span> Co
              </span>
              <p className="text-slate-500 text-sm mt-1">
                Veille concurrentielle hebdomadaire pour PME &amp; indépendants.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <a href="#tarif" className="hover:text-white transition">Tarif</a>
              <a href="#faq" className="hover:text-white transition">FAQ</a>
              <a href="mailto:contact@create-co.fr" className="hover:text-white transition">Contact</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800/50 text-center text-xs text-slate-500 space-y-2">
            <p>© 2026 Create Co. Tous droits réservés.</p>
            <p>
              Conformément à la loi n°78-17 du 6 janvier 1978 relative à l&apos;informatique, aux fichiers et aux libertés, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression des données vous concernant.
              Hébergement&nbsp;: Vercel Inc. — Paiement sécurisé&nbsp;: Stripe.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
