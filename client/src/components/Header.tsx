// import { useUser } from "@/context/userContext";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "./ui/button";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { ModeToggle } from "./mode-toggle";
// import { useTheme } from "./theme-provider";

// const Header = ({ varient }: { varient?: "dark" | "light" }) => {
//   const { theme } = useTheme();
//   const { user, logout } = useUser();
//   const navigate = useNavigate();

//   // Debugging: Check user object
//   console.log("User object:", user);

//   // Prioritize varient prop if provided, otherwise use theme context
//   const appliedTheme = varient || theme;

//   const handleSignout = async () => {
//     try {
<<<<<<< HEAD
//       const res = await fetch(API_URLS.auth.signOut, { method: "POST" });
=======
//       const res = await fetch("/api/auth/sign-out", { method: "POST" });
>>>>>>> c6cae2b (Save current Hueify updates)
//       if (res.ok) {
//         logout();
//         navigate("/sign-in");
//       }
//     } catch (error) {
//       logout();
//       navigate("/");
//       console.log(error);
//     }
//   };

//   return (
//     <header
//       className={`${
//         appliedTheme === "light" ? "text-black" : "text-white"
//       } w-full h-14 px-14 flex items-center justify-between bg-transparent`}
//     >
//       <Link to={"/"} className="text-2xl font-semibold">Hueify</Link>

//       <div className="gap-14 flex font-semibold">
//         <Link className="hover:underline transition-all" to="/">Home</Link>
//         <Link className="hover:underline transition-all" to="/colors">Colors</Link>
//         {user && <Link className="hover:underline transition-all" to="/history">History</Link>}
//         <Link className="hover:underline transition-all" to="/3d-car">3D Car</Link>
//         <Link className="hover:underline transition-all" to="/3d-tshirt">3D Tshirt</Link>
//         <Link className="hover:underline transition-all" to="/3d-shoe">3D Shoe</Link>
//       </div>

//       {user ? (
//         <Popover>
//           <PopoverTrigger>
//             <span className="border-4 border-t-green-600 border-b-purple-600 border-l-pink-700 border-r-yellow-500 cursor-pointer size-11 text-xl rounded-full bg-blue-500 font-semibold flex items-center justify-center antialiased">
//               {user?.firstName?.[0] || "U"}
//               {user?.lastName?.[0] || "N"}
//             </span>
//           </PopoverTrigger>
//           <PopoverContent>
//             <div className="grid gap-4">
//               <div className="space-y-2">
//                 <h4 className="font-medium leading-none">Account</h4>
//                 <p className="text-sm text-muted-foreground">Your Account Details</p>
//               </div>
//             </div>

//             <div className="grid gap-2">
//               <div className="grid grid-cols-2 items-center gap-4">
//                 <span>First Name</span>
//                 <p>{user?.firstName || "N/A"}</p>
//               </div>
//               <div className="grid grid-cols-2 items-center gap-4">
//                 <span>Last Name</span>
//                 <p>{user?.lastName || "N/A"}</p>
//               </div>
//               <div className="grid grid-cols-2 items-center gap-4">
//                 <span>Email</span>
//                 <p className="line-clamp-1">{user?.email || "N/A"}</p>
//               </div>
//               <div className="grid grid-cols-2 items-center gap-4">
//                 <Button variant={"outline"} onClick={() => handleSignout()}>
//                   Log Out
//                 </Button>
//                 <ModeToggle />
//               </div>
//             </div>
//           </PopoverContent>
//         </Popover>
//       ) : (
//         <Link className="hover:underline" to={"/sign-in"}>Sign In</Link>
//       )}
//     </header>
//   );
// };

// export default Header;

// import { useUser } from "@/context/userContext";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "./ui/button";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { ModeToggle } from "./mode-toggle";
// import { useTheme } from "./theme-provider";

// const Header = ({ varient }: { varient?: "dark" | "light" }) => {
//   const { theme } = useTheme();
//   const { user, logout } = useUser();
//   const navigate = useNavigate();

//   // Prioritize varient prop if provided, otherwise use theme context
//   const appliedTheme = varient || theme;

//   const handleSignout = async () => {
//     try {
<<<<<<< HEAD
//       const res = await fetch(API_URLS.auth.signOut, { method: "POST" });
=======
//       const res = await fetch("/api/auth/sign-out", { method: "POST" });
>>>>>>> c6cae2b (Save current Hueify updates)
//       if (res.ok) {
//         logout();
//         navigate("/sign-in");
//       }
//     } catch (error) {
//       logout();
//       navigate("/");
//       console.log(error);
//     }
//   };

//   return (
//     <header
//       className={`${
//         appliedTheme === "light" ? "text-black" : "text-white"
//       } w-full h-14 px-14 flex items-center justify-between bg-transparent`}
//     >
//       <Link to={"/"} className="text-2xl font-semibold">
//         Hueify
//       </Link>

//       <div className="gap-14 flex font-semibold">
//         <Link className="hover:underline transition-all" to="/">
//           Home
//         </Link>

//         {user?.role === "admin" ? (
//           <Link className="hover:underline transition-all" to="/users">
//             Users
//           </Link>
//         ) : (
//           <>
//             <Link className="hover:underline transition-all" to="/colors">
//               Colors
//             </Link>
//             {user && (
//               <Link className="hover:underline transition-all" to="/history">
//                 History
//               </Link>
//             )}

//             {/* 3D dropdown */}
//             <Popover>
//               <PopoverTrigger>
//                 <span className="cursor-pointer hover:underline transition-all">
//                   3D
//                 </span>
//               </PopoverTrigger>
//               <PopoverContent>
//                 <div className="flex flex-col gap-2 p-2">
//                   <Link className="hover:underline" to="/3d-car">
//                     3D Car
//                   </Link>
//                   <Link className="hover:underline" to="/3d-tshirt">
//                     3D Tshirt
//                   </Link>
//                   <Link className="hover:underline" to="/3d-shoe">
//                     3D Shoe
//                   </Link>
//                   <Link className="hover:underline" to="/3d-home">
//                     3D Home
//                   </Link>
//                 </div>
//               </PopoverContent>
//             </Popover>

//             <Link className="hover:underline transition-all" to="/help">
//               Help & Support
//             </Link>
//           </>
//         )}
//       </div>

//       {user ? (
//         <Popover>
//           <PopoverTrigger>
//             <span className="border-4 border-t-green-600 border-b-purple-600 border-l-pink-700 border-r-yellow-500 cursor-pointer size-11 text-xl rounded-full bg-blue-500 font-semibold flex items-center justify-center antialiased">
//               {user?.firstName?.[0] || "?"}
//               {user?.lastName?.[0] || "?"}
//             </span>
//           </PopoverTrigger>
//           <PopoverContent>
//             <div className="grid gap-4">
//               <div className="space-y-2">
//                 <h4 className="font-medium leading-none">Account</h4>
//                 <p className="text-sm text-muted-foreground">
//                   Your Account Details
//                 </p>
//               </div>
//             </div>
//             <div className="grid gap-2">
//               <div className="grid grid-cols-2 items-center gap-4">
//                 <span>First Name</span>
//                 <p>{user?.firstName || "N/A"}</p>
//               </div>
//               <div className="grid grid-cols-2 items-center gap-4">
//                 <span>Last Name</span>
//                 <p>{user?.lastName || "N/A"}</p>
//               </div>
//               <div className="grid grid-cols-2 items-center gap-4">
//                 <span>Email</span>
//                 <p className="line-clamp-1">{user?.email || "N/A"}</p>
//               </div>
//               <div className="grid grid-cols-2 items-center gap-4">
//                 <Button variant={"outline"} onClick={handleSignout}>
//                   Log Out
//                 </Button>
//                 <ModeToggle />
//               </div>
//             </div>
//           </PopoverContent>
//         </Popover>
//       ) : (
//         <Link className="hover:underline" to={"/sign-in"}>
//           Sign In
//         </Link>
//       )}
//     </header>
//   );
// };

// export default Header;

<<<<<<< HEAD
=======
import React, { useState, useEffect } from "react";
>>>>>>> c6cae2b (Save current Hueify updates)
import { useUser } from "@/context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "./theme-provider";
<<<<<<< HEAD
import logo from "@/assets/logo.jpg";
import { API_URLS } from "@/lib/api";
=======
import logo from "@/assets/logo.jpg";
import * as Dialog from "@radix-ui/react-dialog";
>>>>>>> c6cae2b (Save current Hueify updates)


const Header = ({ varient }: { varient?: "dark" | "light" }) => {
  const { theme } = useTheme();
  const { user, logout } = useUser();
  const navigate = useNavigate();
<<<<<<< HEAD
=======
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
>>>>>>> c6cae2b (Save current Hueify updates)

  // Prioritize varient prop if provided, otherwise use theme context
  const appliedTheme = varient || theme;

  // Determine the concrete theme to use for styling (resolves system preference)
  const effectiveTheme =
    appliedTheme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : appliedTheme;

  const handleSignout = async () => {
    try {
<<<<<<< HEAD
      const res = await fetch(API_URLS.auth.signOut, { method: "POST" });
=======
      const res = await fetch("/api/auth/sign-out", { method: "POST" });
>>>>>>> c6cae2b (Save current Hueify updates)
      if (res.ok) {
        logout();
        navigate("/sign-in");
      }
    } catch (error) {
      logout();
      navigate("/");
      console.log(error);
    }
  };

<<<<<<< HEAD
  return (
    <header
      className={`${
        effectiveTheme === "light" ? "text-black" : "text-white"
      } w-full h-14 px-14 flex items-center justify-between bg-transparent`}
=======
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${effectiveTheme === "light" ? "text-black" : "text-white"} w-full h-14 px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-transparent transition-shadow duration-200 ${scrolled ? 'sticky top-0 z-50 bg-white/70 dark:bg-neutral-900/60 shadow-sm backdrop-blur' : ''}`}
>>>>>>> c6cae2b (Save current Hueify updates)
    >
      {/* <Link to={"/"} className="text-2xl font-semibold">
      Huiefy
      </Link> */}
<<<<<<< HEAD
      <Link to={"/"} className="flex items-center gap-3 text-2xl font-semibold">
           {/* Logo Image */}
         <img src={logo} alt="Huiefy Logo" className="h-10 w-auto dark:invert" />

         {/* Brand Name */}
          <span>Huiefy</span>
        </Link>


      <div className="gap-14 flex font-semibold">
=======
      <div className="flex items-center gap-3 text-2xl font-semibold">
        <Link to={"/"} className="flex items-center gap-3">
          {/* Logo Image */}
          <img src={logo} alt="Huiefy Logo" className="h-8 sm:h-10 w-auto dark:invert" />
          {/* Brand Name */}
          <span className="text-lg sm:text-2xl">Huiefy</span>
        </Link>

        {/* Mobile menu button (Radix Dialog Trigger) */}
        <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
          <Dialog.Trigger asChild>
            <button
              className="ml-2 md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40 md:hidden" />
            <Dialog.Content className="fixed top-14 left-0 right-0 z-50 md:hidden bg-white dark:bg-neutral-900 border-t shadow-md transform transition-transform duration-200 will-change-transform">
              <div className="flex flex-col p-4 gap-3">
                <Link className="hover:underline" to="/" onClick={() => setMobileOpen(false)}>
                  Home
                </Link>
                <Link className="hover:underline" to="/colors" onClick={() => setMobileOpen(false)}>
                  Colors
                </Link>
                {user && (
                  <Link className="hover:underline" to="/history" onClick={() => setMobileOpen(false)}>
                    History
                  </Link>
                )}
                <Link className="hover:underline" to="/3d-car" onClick={() => setMobileOpen(false)}>
                  3D Car
                </Link>
                <Link className="hover:underline" to="/3d-tshirt" onClick={() => setMobileOpen(false)}>
                  3D Tshirt
                </Link>
                <Link className="hover:underline" to="/3d-shoe" onClick={() => setMobileOpen(false)}>
                  3D Shoe
                </Link>
                <Link className="hover:underline" to="/help" onClick={() => setMobileOpen(false)}>
                  Help & Support
                </Link>
                <div className="pt-2 border-t mt-2 flex items-center justify-between">
                  <ModeToggle />
                  {user ? (
                    <Button variant={"outline"} onClick={handleSignout}>
                      Log Out
                    </Button>
                  ) : (
                    <Link to="/sign-in">Sign In</Link>
                  )}
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

      </div>


      <nav className="hidden md:flex gap-14 font-semibold">
>>>>>>> c6cae2b (Save current Hueify updates)
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

            {/* 3D dropdown */}
            <Popover>
              <PopoverTrigger>
                <span className="cursor-pointer hover:underline transition-all">
                  3D
                </span>
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
<<<<<<< HEAD
      </div>
=======
      </nav>

      
>>>>>>> c6cae2b (Save current Hueify updates)

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
                <p className="text-sm text-muted-foreground">
                  Your Account Details
                </p>
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
                <Button variant={"outline"} onClick={handleSignout}>
                  Log Out
                </Button>
                <ModeToggle />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <Link className="hover:underline" to={"/sign-in"}>
          Sign In
        </Link>
      )}
    </header>
  );
};

export default Header;

