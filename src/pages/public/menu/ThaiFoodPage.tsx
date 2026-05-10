import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import heroImg from "@/shared/assets/menu/pad_khapao.png";
import { fetchMenusThunk } from "@/features/menu/model/menuSlice";

export default function ThaiFoodPage() {
  const dispatch = useAppDispatch();
  const { sections: menuSections, loading } = useAppSelector(
    (state) => state.menus,
  );

  useEffect(() => {
    void dispatch(fetchMenusThunk());
  }, [dispatch]);

  return (
    <>
      <div
        className="relative flex h-64 items-center justify-center bg-cover bg-center md:h-[320px] md:w-full lg:h-[420px]"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-black/50" aria-hidden />
        <div className="relative z-10 flex flex-col items-center gap-3 px-4 text-center text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.65)]">
          <h1 className="text-3xl font-black leading-tight md:text-5xl lg:text-6xl">
            Order authentic Thai cuisine anytime.
          </h1>
          <p className="text-base text-white/90 md:text-lg lg:text-3xl">
            Fresh, flavorful, delivered to your door.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-3 w-full max-w-7xl px-4 md:py-8">
        <div className="flex-1">
          {loading && menuSections.length === 0 ? (
            <p className="text-sm text-gray-500">Loading menu data...</p>
          ) : null}
          {menuSections.map((section) => (
            <section key={section.section} className="mb-10">
              <h3 className="mb-4 border-l-4 border-blue-900 pl-3 text-xl font-semibold lg:text-2xl">
                {section.section}
              </h3>
              <div className="mb-4 grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex h-full flex-col overflow-hidden rounded-3xl bg-[#fff] shadow-md transition delay-100 duration-350 ease-in-out hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="h-56 w-full object-cover md:h-60"
                      />
                      <div className="absolute top-3 right-3 rounded-full bg-yellow-400 px-3 py-[1px] font-semibold text-black md:text-base">
                        {item.price} $
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 px-4 pt-4 pb-5">
                      <div className="text-lg font-extrabold text-gray-600 md:text-md">
                        {item.name}
                      </div>
                      {item.desc ? (
                        <div className="text-sm leading-snug text-gray-600 md:text-base">
                          {item.desc}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
