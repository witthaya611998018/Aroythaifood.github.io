import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";

import logoIcon from "@/shared/assets/menu/LOGO.ico";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearAuthError, loginThunk } from "@/features/auth/model/authSlice";

const backgroundPath = `${import.meta.env.BASE_URL}menu/imgs`;
const loginBg768 = `${backgroundPath}/login-bg-768.jpg`;
const loginBg1280 = `${backgroundPath}/login-bg-1280.jpg`;
const loginBg1920 = `${backgroundPath}/login-bg-1920.jpg`;

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const from = (location.state as { from?: { pathname?: string } } | undefined)
    ?.from?.pathname;

  useEffect(() => {
    if (authState.token && authState.user) {
      navigate(from || "/dashboard", { replace: true });
    }
  }, [authState.token, authState.user, from, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await dispatch(loginThunk({ username, password })).unwrap();
      navigate(from || "/dashboard", { replace: true });
    } catch {
      // Error message is managed by redux state.
    }
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (authState.error) {
      dispatch(clearAuthError());
    }
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (authState.error) {
      dispatch(clearAuthError());
    }
    setPassword(event.target.value);
  };

  return (
    <div className="relative min-h-screen overflow-hidden p-4 sm:p-6">
      <picture className="absolute inset-0">
        <source media="(min-width: 1440px)" srcSet={loginBg1920} />
        <source media="(min-width: 768px)" srcSet={loginBg1280} />
        <img
          src={loginBg768}
          alt="Thai food background"
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div
        className="absolute inset-0 bg-[linear-gradient(115deg,rgba(6,12,26,0.86),rgba(16,24,39,0.66),rgba(6,12,26,0.82))]"
        aria-hidden
      />
      <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-5xl items-center justify-center sm:min-h-[calc(100vh-3rem)]">
        <div className="w-full overflow-hidden rounded-3xl border border-white/30 bg-white/95 shadow-[0_24px_60px_rgba(10,10,10,0.35)] backdrop-blur-sm">
          <div className="grid lg:grid-cols-2">
            <aside className="relative hidden overflow-hidden bg-[#192c56]/95 p-10 text-white lg:block">
              <img src={logoIcon} alt="Aroy Thai" className="mb-8 h-28 w-28 p-2" />
              <h1 className="text-4xl font-black leading-tight">
                A ROY THAI FOOD
                <span className="mt-2 block text-2xl font-semibold text-amber-300">
                  Admin Panel
                </span>
              </h1>
              <p className="mt-5 max-w-sm text-base leading-7 text-white/80">
                Manage menu details, pricing, and visibility from one clean
                dashboard.
              </p>
              <div className="mt-10 space-y-3 text-sm text-white/85">
                <Link to="/" className="inline-flex items-center gap-1">
                  <IoMdArrowRoundBack />
                  <span>Back to Menus</span>
                </Link>
              </div>
              <div
                className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-amber-300/25 blur-2xl"
                aria-hidden
              />
            </aside>

            <section className="px-6 py-10 sm:px-10 sm:py-12">
              <div className="mx-auto w-full max-w-md">
                <div className="mb-8 text-center lg:text-left">
                  <img alt="Aroy Thai" src={logoIcon} className="mx-auto h-16 w-auto lg:hidden" />
                  <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                    Sign in
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Enter your account credentials to continue.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="username"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required
                      autoComplete="username"
                      value={username}
                      onChange={handleUsernameChange}
                      placeholder="Enter your username"
                      className="block w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-base text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#192c56] focus-visible:ring-2 focus-visible:ring-[#192c56]/25"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Enter your password"
                        className="block w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 pr-24 text-base text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-[#192c56] focus-visible:ring-2 focus-visible:ring-[#192c56]/25"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-[#192c56] hover:bg-[#e8ecf4]"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                      >
                        {showPassword ? (
                          <EyeOff size={18} aria-hidden />
                        ) : (
                          <Eye size={18} aria-hidden />
                        )}
                      </button>
                    </div>
                  </div>

                  {authState.error ? (
                    <p
                      className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                      role="status"
                      aria-live="polite"
                    >
                      {authState.error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={authState.loading}
                    className="mt-2 flex w-full items-center justify-center rounded-xl bg-[#192c56] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#243b6f] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {authState.loading ? "Signing in..." : "Sign in"}
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
