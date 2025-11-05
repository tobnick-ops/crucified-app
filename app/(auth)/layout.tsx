import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-slate-100">
      <main className="w-full max-w-md space-y-8 rounded-2xl bg-slate-950/60 p-10 shadow-2xl ring-1 ring-white/10 backdrop-blur">
        <div className="space-y-2 text-center">
          <Link href="/" className="inline-flex items-center justify-center">
            <span className="text-lg font-semibold tracking-tight">Portal</span>
          </Link>
          <p className="text-sm text-slate-300">
            Melde dich an oder registriere dich, um fortzufahren.
          </p>
        </div>
        {children}
      </main>
      <p className="mt-6 text-xs text-slate-400">
        &copy; {new Date().getFullYear()} Portal. Alle Rechte vorbehalten.
      </p>
    </div>
  );
}
