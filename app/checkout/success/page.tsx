export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">Merci pour votre inscription&nbsp;!</h1>
        <p className="text-slate-300 mb-6 leading-relaxed">
          Votre abonnement est bien activé. Vous allez recevoir un email de confirmation
          avec les prochaines étapes pour configurer votre veille concurrentielle.
        </p>
        <p className="text-slate-400 text-sm mb-8">
          Pensez à vérifier votre dossier spam si vous ne voyez pas notre email.
        </p>
        <a
          href="/"
          className="inline-block bg-brand-600 hover:bg-brand-500 text-white font-semibold px-8 py-3 rounded-xl transition"
        >
          Retour à l&apos;accueil
        </a>
      </div>
    </div>
  );
}
