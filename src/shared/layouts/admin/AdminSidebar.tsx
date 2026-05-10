import { useCallback, useState, type ReactNode } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBowlRice } from "react-icons/fa6";
import { useAppDispatch } from "@/app/hooks";
import { logout } from "@/features/auth/model/authSlice";
import { resetMenus } from "@/features/menu/model/menuSlice";

type NavItem = {
  name: string;
  icon: ReactNode;
  path?: string;
};

const logoText = `${import.meta.env.BASE_URL}menu/imgs/a_roy_thai_food_logo.svg`;
const logoIcon = `${import.meta.env.BASE_URL}menu/imgs/a_roy_icon.svg`;

const menu: NavItem[] = [
  { icon: <FaHome />, name: "Dashboard", path: "/dashboard" },
  { icon: <FaBowlRice />, name: "Menus", path: "/menus" },
];

const AdminSidebar = ({
  collapsed = false,
  onNavigate,
}: {
  collapsed?: boolean;
  onNavigate?: () => void;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const isExpanded = !collapsed || isHovered;

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname],
  );

  const handleNavigate = useCallback(() => {
    onNavigate?.();
  }, [onNavigate]);

  const handleLogout = useCallback(() => {
    dispatch(resetMenus());
    dispatch(logout());
    onNavigate?.();
    navigate("/login", { replace: true });
  }, [dispatch, navigate, onNavigate]);

  return (
    <aside
      className={`flex h-full flex-col justify-between overflow-hidden border-r border-gray-200 bg-white transition-[width] duration-300 ease-in-out ${isExpanded ? "w-64" : "w-16"} lg:min-h-screen`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <div className="relative hidden h-16 items-center justify-center p-3 lg:flex">
          <img
            src={logoIcon}
            alt="logo"
            className={`absolute h-10 w-auto flex-shrink-0 object-contain transition-all duration-300 ease-in-out ${isExpanded ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}
          />
          <img
            src={logoText}
            alt="logo"
            className={`absolute h-10 w-auto transition-all duration-300 ease-in-out ${isExpanded ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
          />
        </div>
        <nav className="mt-0 lg:mt-4">
          <ul>
            {menu.map((item) => (
              <li key={item.name}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className={`mb-1 flex items-center rounded-lg transition-all duration-300 ease-in-out ${isExpanded ? "justify-start gap-3 px-6 py-2" : "justify-center px-3 py-2"} ${isActive(item.path) ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
                    onClick={handleNavigate}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${isExpanded ? "max-w-40 translate-x-0 opacity-100" : "max-w-0 -translate-x-2 opacity-0"}`}>
                      {item.name}
                    </span>
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mb-4 px-6">
        <button
          type="button"
          aria-label="Log out"
          className={`flex w-full items-center rounded-lg py-2 text-gray-700 transition-all duration-300 ease-in-out hover:bg-gray-100 ${isExpanded ? "justify-start gap-3" : "justify-center px-3"}`}
          onClick={handleLogout}
        >
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
          <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${isExpanded ? "max-w-28 translate-x-0 opacity-100" : "max-w-0 -translate-x-2 opacity-0"}`}>
            Log out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
