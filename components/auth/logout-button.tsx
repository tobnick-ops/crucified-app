"use client";

import { useTransition } from "react";

import { logoutAction } from "@/app/(protected)/actions/logout";

export function LogoutButton() {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => logoutAction())}
      className="inline-flex items-center justify-center rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-200 transition hover:border-white/40 hover:text-white disabled:opacity-70"
      disabled={pending}
    >
      {pending ? "Melde ab..." : "Abmelden"}
    </button>
  );
}
