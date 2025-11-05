import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { LogoutButton } from "@/components/auth/logout-button";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = getSession();

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
  });

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-12 px-6 py-16">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Dashboard
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Willkommen, {user.email}
            </h1>
            <p className="text-sm text-slate-400">
              Konto erstellt am {user.createdAt.toLocaleDateString("de-DE")}
            </p>
          </div>
          <LogoutButton />
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white">Nächste Schritte</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>• Datenbank mit weiteren Modellen erweitern.</li>
              <li>• Zugriffsschutz auf weitere Routen anwenden.</li>
              <li>• E-Mail-Verifikation und Passwort-Reset ergänzen.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white">Session-Info</h2>
            <dl className="mt-4 space-y-3 text-sm text-slate-200">
              <div>
                <dt className="font-medium text-slate-300">User-ID</dt>
                <dd className="font-mono text-xs text-slate-400">{user.id}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-300">E-Mail</dt>
                <dd>{user.email}</dd>
              </div>
              <div>
                <dt className="font-medium text-slate-300">Letzte Aktualisierung</dt>
                <dd>{user.updatedAt.toLocaleString("de-DE")}</dd>
              </div>
            </dl>
          </article>
        </section>
      </div>
    </div>
  );
}
