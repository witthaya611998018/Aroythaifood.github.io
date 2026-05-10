import StatsCards from "@/pages/admin/dashboard/components/StatsCards";

export default function HomePage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-12">
        <StatsCards />
      </div>
      <div className="col-span-12" />
    </div>
  );
}
