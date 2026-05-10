import { BadgeCheck, Hash, Shield, UserRound } from "lucide-react";

import { useAppSelector } from "@/app/hooks";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  const initial = (user?.username?.[0] ?? "A").toUpperCase();

  const fields = [
    { label: "Username", value: user?.username ?? "Admin", icon: UserRound },
    { label: "Role", value: user?.role ?? "user", icon: Shield },
    { label: "User ID", value: user?.user_id ?? "-", icon: Hash },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-white to-slate-50 p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-500 text-3xl font-semibold text-white shadow-lg shadow-indigo-500/20">
            {initial}
          </div>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              <BadgeCheck className="size-4" />
              Account Overview
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">
              {user?.username ?? "Admin"}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">
              View your account details from the header dropdown. This section is ready for future profile editing features.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 text-slate-500">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                  <Icon className="size-5" />
                </div>
                <div className="text-sm font-medium uppercase tracking-[0.14em]">
                  {field.label}
                </div>
              </div>
              <div className="mt-4 text-lg font-semibold text-slate-900">
                {field.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
