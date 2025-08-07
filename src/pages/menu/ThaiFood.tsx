import menuData from "../../../public/menu/menu.json";
import imgs from "../../../src/assets/imgs/pad_khapao.png";

// const sidebarMenus = [
//   "Paii The Experience",
//   "Set Menu",
//   "A La Carte",
//   "Paii Afternoon Tea",
//   "Desserts",
//   "Beverages",
// ];
export default function Thaifood() {
  return (
    <>
      <div
        className="relative h-48  bg-cover bg-center flex items-center justify-center md:w-full md:h-[488px]"
        style={{ backgroundImage: `url(${imgs})` }}
      >
        <div className="flex justify-center  text-4xl px-1 py-1 md:text-8xl text-[#fff] font-normal drop-shadow-lg">
          Menus
        </div>
      </div>
      <div className=" max-w-6xl mx-auto w-full px-4 md:px-8 py-8">
        <div className="flex-1">
          {menuData.map((section) => (
            <section key={section.section} className="mb-10">
              <h3 className="text-xl lg:text-2xl font-semibold mb-4 border-l-4 border-blue-900 pl-3">
                {section.section}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 mb-4">
                {section.items.map((item) => (
                  <div
                    className="mb-4 flex flex-col items-center"
                    key={item.name}
                  >
                    <div className="w-full flex justify-center">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="rounded-2xl w-full max-w-xs h-48 md:h-52 object-cover"
                      />
                    </div>
                    <div className="font-medium text-lg md:text-xl mt-3 text-left">
                      {item.name}
                    </div>
                    <div className="inline-flex items-center text-sm md:text-base text-left mt-1">
                      <span className="text-gray-600">price:</span>
                      <span className="px-1 font-semibold text-blue-900 text-base md:text-lg">
                        $ {item.price}
                      </span>
                    </div>
                    {item.desc && (
                      <div className="text-xs text-center md:text-sm lg:text-base text-gray-500 mt-1">
                        {item.desc}
                      </div>
                    )}
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
