import { useState } from "react";
import {
  FaHome,
  FaUsers,
  FaFolderOpen,
  FaCalendarAlt,
  FaFileAlt,
  FaChartPie,
} from "react-icons/fa";

const menu = [
  { name: "Dashboard", icon: <FaHome /> },
  { name: "Menus", icon: <FaUsers /> },
  { name: "Projects", icon: <FaFolderOpen /> },
  { name: "Calendar", icon: <FaCalendarAlt /> },
  { name: "Documents", icon: <FaFileAlt /> },
  { name: "Reports", icon: <FaChartPie /> },
];

const AdminSidebar = ({ collapsed = false }: { collapsed?: boolean }) => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  return (
    <aside
      className={`transition-all duration-300 bg-white border-r border-gray-200 flex flex-col justify-between ${
        collapsed ? "w-16" : "w-64"
      } min-h-screen`}
    >
      <div>
        <div className="flex items-center h-16 px-6">
          {collapsed ? (
            <>
              <span className="text-indigo-500 text-3xl font-bold">~</span>
            </>
          ) : (
            <>
              <span className="text-indigo-500 text-3xl font-bold">~</span>
              <span className=" text-1xl font-bold px-1">A ROY THAIFOOD</span>
            </>
          )}
        </div>
        <nav className="mt-4">
          <ul>
            {menu.map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  className={`flex items-center gap-3 px-6 py-2 rounded-lg mb-1 transition-colors ${
                    activeMenu === item.name
                      ? "bg-indigo-50 text-indigo-700 "
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setActiveMenu(item.name);
                  }}
                >
                  {collapsed ? (
                    <span className="text-lg">{item.icon}</span>
                  ) : (
                    <>
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={`px-6 mb-4`}>
        <a
          href="#"
          className={`flex items-center rounded-lg gap-3 py-2  text-gray-700 hover:bg-gray-100`}
        >
          {collapsed ? (
            <span className="text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          ) : (
            <>
              <span className="text-lg ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Log out
            </>
          )}
        </a>
      </div>
    </aside>
  );
};

export default AdminSidebar;
