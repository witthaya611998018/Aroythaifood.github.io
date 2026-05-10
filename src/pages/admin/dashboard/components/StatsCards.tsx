import { useEffect } from "react";
import { LuLayoutGrid, LuUtensilsCrossed } from "react-icons/lu";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchMenusThunk } from "@/features/menu/model/menuSlice";

function StatsCards() {
  const dispatch = useAppDispatch();
  const { sections, loading } = useAppSelector((state) => state.menus);

  useEffect(() => {
    if (sections.length > 0 || loading) {
      return;
    }

    void dispatch(fetchMenusThunk());
  }, [dispatch, loading, sections.length]);

  const totalMenus = sections.reduce((sum, section) => sum + section.items.length, 0);
  const totalCategories = sections.length;

  const cards = [
    {
      label: "จำนวนเมนู",
      value: totalMenus,
      icon: <LuUtensilsCrossed className="text-xl text-orange-600" />,
      iconClassName: "bg-orange-100",
    },
    {
      label: "ประเภทอาหาร",
      value: totalCategories,
      icon: <LuLayoutGrid className="text-xl text-emerald-600" />,
      iconClassName: "bg-emerald-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 md:px-10">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl border border-gray-300 bg-white p-5 md:p-6"
        >
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.iconClassName}`}
          >
            {card.icon}
          </div>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <span className="text-md text-gray-500">{card.label}</span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm">
                {loading && sections.length === 0 ? "-" : card.value.toLocaleString()}
              </h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;
