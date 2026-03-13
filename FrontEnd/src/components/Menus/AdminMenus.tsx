import menuData from "../../../public/menu/menu.json";

export default function AdminMenus() {
  return (
    <>
      <div>
        {menuData.map((section) => (
          <div className="font-medium text-lg md:text-xl mt-3 text-left">
            <div className="font-medium text-lg md:text-xl mt-3 text-left">
              {section.section}
            </div>
          </div>
        ))}
      </div>
      ;
    </>
  );
}
