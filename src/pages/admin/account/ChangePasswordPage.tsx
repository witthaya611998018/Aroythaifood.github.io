import { useState, type FormEvent } from "react";
import { CheckCircle2, KeyRound, LockKeyhole, ShieldAlert } from "lucide-react";

export default function ChangePasswordPage() {
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("Password change UI is ready. Connect it to your backend endpoint next.");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_.9fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/20">
            <LockKeyhole className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Change Password</h1>
            <p className="text-sm text-slate-500">Update your login password from here.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Current Password</label>
            <input
              type="password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">New Password</label>
            <input
              type="password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Confirm New Password</label>
            <input
              type="password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white"
              placeholder="Re-enter new password"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <KeyRound className="size-4" />
            Save Changes
          </button>

          {message ? (
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
              <span>{message}</span>
            </div>
          ) : null}
        </form>
      </div>

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="flex items-center gap-3 text-amber-800">
          <ShieldAlert className="size-5" />
          <h2 className="text-lg font-semibold">Implementation Note</h2>
        </div>
        <p className="mt-4 text-sm leading-6 text-amber-900/80">
          This page is scaffolded in the UI, but the backend does not expose a password update endpoint yet.
          You can wire it later without changing the dropdown navigation.
        </p>
      </div>
    </div>
  );
}
