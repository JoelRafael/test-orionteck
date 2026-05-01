

export default function NotFoundPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
 
        <p className="text-base font-semibold text-brand-600">404</p>
        
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Página no encontrada
        </h1>
        
        <p className="mt-6 text-base leading-7 text-slate-600 max-w-md mx-auto">
          Lo sentimos, no pudimos encontrar la página que estás buscando. 
          Es posible que la dirección sea incorrecta o que la página haya sido movida.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 transition-all active:scale-95"
          >
            Volver al inicio
          </a>

        </div>
      </div>

    </div>
  );
}