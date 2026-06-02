import { useState, useEffect } from "react";
import { useUser } from "@/context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "./theme-provider";
import logo from "@/assets/logo.jpg";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

const Header = ({ variant }) => {
  const { theme } = useTheme();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [is3dMenuOpen, setIs3dMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const appliedTheme = variant || theme;
  const effectiveTheme =
    appliedTheme === "system" && typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : appliedTheme;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleDocumentClick = () => {
      setIs3dMenuOpen(false);
      setIsUserMenuOpen(false);
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/auth/sign-out", { method: "POST" });
      if (res.ok) {
        logout();
        navigate("/sign-in");
      }
    } catch (error) {
      logout();
      navigate("/");
      console.error(error);
    }
  };

  const navLinkClass =
    effectiveTheme === "light"
      ? "rounded-full px-4 py-2 text-slate-700 transition hover:bg-slate-900/10 hover:text-slate-950"
      : "rounded-full px-4 py-2 text-white/80 transition hover:bg-white/10 hover:text-white";
  const navShellClass =
    effectiveTheme === "light"
      ? "hidden items-center justify-center gap-1 rounded-full border border-slate-200 bg-slate-950/[0.03] p-1 text-sm font-semibold md:flex"
      : "hidden items-center justify-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-sm font-semibold md:flex";
  const displayName =
    user?.firstName ||
    user?.username ||
    user?.user?.firstName ||
    user?.user?.username ||
    user?.email ||
    "";
  const userInitial = displayName.trim().charAt(0).toUpperCase() || "?";
  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIs3dMenuOpen(false);
    setIsUserMenuOpen(false);
  };
  const mobilePanelClass =
    effectiveTheme === "light"
      ? "border-slate-200 bg-white text-slate-900"
      : "border-white/10 bg-[#120d1f] text-white";
  const mobileLinkClass =
    effectiveTheme === "light"
      ? "rounded-2xl px-4 py-3 text-base font-semibold text-slate-800 transition hover:bg-slate-900/10"
      : "rounded-2xl px-4 py-3 text-base font-semibold text-white/85 transition hover:bg-white/10";

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-white/10 ${effectiveTheme === "light" ? "bg-white/90 text-slate-950" : "bg-[#120d1f]/85 text-white"} shadow-lg shadow-black/10 backdrop-blur-xl transition-all duration-200 ${scrolled ? "border-white/15 bg-opacity-95" : ""}`}
    >
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2 text-2xl font-semibold sm:gap-3" onClick={closeMenus}>
          <img
            src={logo}
            alt="Hueify Logo"
            className="block rounded-xl border border-white/15 object-cover shadow-md shadow-black/20"
            style={{ width: 42, height: 42 }}
          />
          <span className="truncate text-lg font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-pink-400 to-amber-300 sm:text-xl">
            Hueify
          </span>
        </Link>

        <nav className={navShellClass}>
          <Link className={navLinkClass} to="/">
            Home
          </Link>
          <Link className={navLinkClass} to="/colors">
            Colors
          </Link>
          <Link className={navLinkClass} to="/history">
            History
          </Link>
          <Link className={navLinkClass} to="/help">
            Help
          </Link>
          <div className="relative" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={navLinkClass}
              onClick={() => setIs3dMenuOpen((isOpen) => !isOpen)}
              aria-expanded={is3dMenuOpen}
              aria-haspopup="menu"
            >
              3D
            </button>
            <div className={`${is3dMenuOpen ? "visible opacity-100" : "invisible opacity-0"} absolute left-1/2 top-full z-50 mt-2 min-w-44 -translate-x-1/2 rounded-2xl border p-2 shadow-xl backdrop-blur-xl transition ${
              effectiveTheme === "light"
                ? "border-slate-200 bg-white text-slate-900"
                : "border-white/10 bg-[#120d1f] text-white"
            }`}>
              <Link className="block rounded-xl px-4 py-2 text-sm font-semibold hover:bg-current/10" to="/3d-car" onClick={() => setIs3dMenuOpen(false)}>3D Car</Link>
              <Link className="block rounded-xl px-4 py-2 text-sm font-semibold hover:bg-current/10" to="/3d-tshirt" onClick={() => setIs3dMenuOpen(false)}>3D T-Shirt</Link>
              <Link className="block rounded-xl px-4 py-2 text-sm font-semibold hover:bg-current/10" to="/3d-home" onClick={() => setIs3dMenuOpen(false)}>3D House</Link>
            </div>
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-2 text-sm sm:gap-3">
          <ThemeToggle />
          {user ? (
            <div className="relative" onClick={(event) => event.stopPropagation()}>
              <button
                type="button"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-white/20 bg-gradient-to-br from-cyan-400 via-pink-500 to-amber-300 text-sm font-bold text-white shadow-md"
                onClick={() => setIsUserMenuOpen((isOpen) => !isOpen)}
                aria-expanded={isUserMenuOpen}
                aria-haspopup="menu"
              >
                {userInitial}
              </button>
              <div className={`${isUserMenuOpen ? "visible opacity-100" : "invisible opacity-0"} absolute right-0 top-full z-50 mt-2 min-w-40 rounded-2xl border p-2 shadow-xl backdrop-blur-xl transition ${
                effectiveTheme === "light"
                  ? "border-slate-200 bg-white text-slate-900"
                  : "border-white/10 bg-[#120d1f] text-white"
              }`}>
                <button
                  className="block w-full rounded-xl px-4 py-2 text-left text-sm font-semibold hover:bg-current/10"
                  onClick={handleSignout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link className="hidden rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 px-4 py-2 font-bold text-white shadow-lg shadow-pink-500/20 transition hover:scale-105 sm:inline-flex" to="/sign-in">
              Sign In
            </Link>
          )}
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition md:hidden ${
              effectiveTheme === "light"
                ? "border-slate-200 bg-slate-950/[0.03] text-slate-900 hover:bg-slate-900/10"
                : "border-white/10 bg-white/5 text-white hover:bg-white/10"
            }`}
            onClick={(event) => {
              event.stopPropagation();
              setIsMobileMenuOpen((isOpen) => !isOpen);
            }}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden ${isMobileMenuOpen ? "max-h-[75vh] border-t opacity-100" : "max-h-0 border-t-0 opacity-0"} overflow-hidden transition-all duration-200 ${mobilePanelClass}`}
      >
        <nav className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
          <Link className={mobileLinkClass} to="/" onClick={closeMenus}>Home</Link>
          <Link className={mobileLinkClass} to="/colors" onClick={closeMenus}>Colors</Link>
          <Link className={mobileLinkClass} to="/history" onClick={closeMenus}>History</Link>
          <Link className={mobileLinkClass} to="/help" onClick={closeMenus}>Help</Link>
          <div className="grid gap-2 rounded-2xl border border-current/10 p-2">
            <span className="px-2 text-xs font-bold uppercase tracking-[0.22em] text-current/55">3D Studio</span>
            <Link className={mobileLinkClass} to="/3d-car" onClick={closeMenus}>3D Car</Link>
            <Link className={mobileLinkClass} to="/3d-tshirt" onClick={closeMenus}>3D T-Shirt</Link>
            <Link className={mobileLinkClass} to="/3d-home" onClick={closeMenus}>3D House</Link>
          </div>
          {!user && (
            <Link className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 px-5 text-sm font-bold text-white shadow-lg shadow-pink-500/20" to="/sign-in" onClick={closeMenus}>
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
