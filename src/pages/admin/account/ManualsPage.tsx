import { BookOpenText, FileText, Layers3, ScrollText } from "lucide-react";

const manuals = [
  {
    title: "Admin Quick Start",
    description: "A short guide for navigating dashboard, menus, and account controls.",
    icon: Layers3,
  },
  {
    title: "Menu Management",
    description: "Learn how to edit food items, photos, and pricing from the admin screen.",
    icon: FileText,
  },
  {
    title: "Brand & Content",
    description: "Reference for keeping the restaurant name, visuals, and content consistent.",
    icon: ScrollText,
  },
];

export default function ManualsPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <BookOpenText className="size-5" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Manuals</h1>
            <p className="text-sm text-slate-300">Reference cards for the admin team.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {manuals.map((manual) => {
          const Icon = manual.icon;
          return (
            <article key={manual.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <Icon className="size-5" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-slate-900">{manual.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{manual.description}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
