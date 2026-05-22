import { useEffect, useState } from "react";
import { useUser } from "@/context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";
import logo from "@/assets/logo.jpg";

const Header = ({ varient }: { varient?: "dark" | "light" }) => {
  const { theme } = useTheme();
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const appliedTheme = varient || theme;
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

  return (
    <header
      className={`${effectiveTheme === "light" ? "text-black" : "text-white"} w-full h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-transparent transition-shadow duration-200 ${scrolled ? "sticky top-0 z-50 bg-white/70 dark:bg-neutral-900/60 shadow-sm backdrop-blur" : ""}`}
    >
      <Link to="/" className="flex items-center gap-3 text-2xl font-semibold">
        <img src={logo} alt="Hueify Logo" className="h-8 sm:h-10 w-auto dark:invert" />
        <span className="text-lg sm:text-2xl">Hueify</span>
      </Link>

      <nav className="hidden md:flex gap-14 font-semibold">
        <Link className="hover:underline transition-all" to="/">
          Home
        </Link>
        {user?.role === "admin" ? (
          <Link className="hover:underline transition-all" to="/users">
            Users
          </Link>
        ) : (
          <>
            <Link className="hover:underline transition-all" to="/colors">
              Colors
            </Link>
            {user && (
              <Link className="hover:underline transition-all" to="/history">
                History
              </Link>
            )}
            <Popover>
              <PopoverTrigger>
                <span className="cursor-pointer hover:underline transition-all">3D</span>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-2 p-2">
                  <Link className="hover:underline" to="/3d-car">
                    3D Car
                  </Link>
                  <Link className="hover:underline" to="/3d-tshirt">
                    3D Tshirt
                  </Link>
                  <Link className="hover:underline" to="/3d-shoe">
                    3D Shoe
                  </Link>
                  <Link className="hover:underline" to="/3d-home">
                    3D Home
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
            <Link className="hover:underline transition-all" to="/help">
              Help & Support
            </Link>
          </>
        )}
      </nav>

      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <Popover>
            <PopoverTrigger>
              <span className="border-4 border-t-green-600 border-b-purple-600 border-l-pink-700 border-r-yellow-500 cursor-pointer size-11 text-xl rounded-full bg-blue-500 font-semibold flex items-center justify-center antialiased">
                {user?.firstName?.[0] || "?"}
                {user?.lastName?.[0] || "?"}
              </span>
            </PopoverTrigger>
            <PopoverContent>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Account</h4>
                  <p className="text-sm text-muted-foreground">Your Account Details</p>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-2 items-center gap-4">
                  <span>First Name</span>
                  <p>{user?.firstName || "N/A"}</p>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <span>Last Name</span>
                  <p>{user?.lastName || "N/A"}</p>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <span>Email</span>
                  <p className="line-clamp-1">{user?.email || "N/A"}</p>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Button variant="outline" onClick={handleSignout}>
                    Log Out
                  </Button>
                  <ModeToggle />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Link className="hover:underline" to="/sign-in">
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;

