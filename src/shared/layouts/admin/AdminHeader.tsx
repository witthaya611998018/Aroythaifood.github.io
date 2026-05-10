import { Fragment } from "react";
import { BookOpen, ChevronDown, KeyRound, LogOut, UserRound } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { logout } from "@/features/auth/model/authSlice";

const AdminHeader = ({ onToggleSidebar }: { onToggleSidebar?: () => void }) => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const initial = (user?.username?.[0] ?? "A").toUpperCase();

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white px-2 py-2 md:px-5">
      <div className="flex w-full items-center justify-between gap-2">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#bcbbbb94] bg-gray-50 text-gray-400 hover:bg-gray-100 lg:h-11 lg:w-11"
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <Menu as="div" className="relative flex items-center justify-start">
          <MenuButton className="group flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-left text-slate-700 shadow-sm transition-all duration-200 ease-in-out hover:border-slate-300 hover:bg-white hover:shadow-md">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white shadow-sm">
              {initial}
            </span>
            <div className="hidden min-w-0 sm:block">
              <div className="truncate text-[13px] font-semibold leading-4 text-slate-800">
                {user?.username ?? "Admin"}
              </div>
              <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
                {user?.role ?? "USER"}
              </div>
            </div>
            <ChevronDown className="size-3.5 shrink-0 text-slate-400 transition-transform duration-200 group-hover:text-slate-600" />
          </MenuButton>

          <Transition
            as={Fragment}
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 translate-y-2 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-2 scale-95"
          >
            <MenuItems className="absolute right-0 top-full z-50 mt-3 w-80 origin-top-right rounded-3xl border border-slate-200 bg-white p-3 shadow-[0_24px_60px_rgba(15,23,42,0.14)] focus:outline-none">
              <div className="space-y-1">
                <MenuItem>
                  {({ focus }) => (
                    <Link
                      to="/profile"
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors ${
                        focus ? "bg-slate-100 text-slate-900" : "hover:bg-slate-50"
                      }`}
                    >
                      <UserRound className="size-5 text-slate-500" />
                      <span>Profile</span>
                    </Link>
                  )}
                </MenuItem>

                <MenuItem>
                  {({ focus }) => (
                    <Link
                      to="/change-password"
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors ${
                        focus ? "bg-slate-100 text-slate-900" : "hover:bg-slate-50"
                      }`}
                    >
                      <KeyRound className="size-5 text-slate-500" />
                      <span>Change Password</span>
                    </Link>
                  )}
                </MenuItem>

                <MenuItem>
                  {({ focus }) => (
                    <Link
                      to="/manuals"
                      className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors ${
                        focus ? "bg-slate-100 text-slate-900" : "hover:bg-slate-50"
                      }`}
                    >
                      <BookOpen className="size-5 text-slate-500" />
                      <span>Manuals</span>
                    </Link>
                  )}
                </MenuItem>
              </div>

              <div className="my-2 border-t border-slate-200" />

              <MenuItem>
                {({ focus }) => (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                      focus ? "bg-red-50 text-red-700" : "text-red-600 hover:bg-red-50"
                    }`}
                  >
                    <LogOut className="size-5" />
                    <span>Logout</span>
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default AdminHeader;
