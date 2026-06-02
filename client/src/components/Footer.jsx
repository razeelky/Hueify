

// import { Link } from "react-router-dom";
// import { ShieldCheck, Heart } from "lucide-react";

// const AdminFooter = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="w-full mt-auto border-t bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
//       <div className="container mx-auto px-4 py-6">
//         {/* Top Section */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-4">
//           <div className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
//             <ShieldCheck className="h-6 w-6" />
//             Hueify
//           </div>

//           {/* Admin Navigation */}
//           <nav className="flex flex-wrap gap-6 text-sm text-gray-700 dark:text-gray-300">
//             <Link
//               to="/"
//               className="hover:text-blue-600 dark:hover:text-blue-400 transition-all"
//             >
//               Home
//             </Link>
//             <Link
//               to="/colors"
//               className="hover:text-blue-600 dark:hover:text-blue-400 transition-all"
//             >
//               Colors
//             </Link>
//             <Link
//               to="/history"
//               className="hover:text-blue-600 dark:hover:text-blue-400 transition-all"
//             >
//               History
//             </Link>
//             <Link
//               to="/help"
//               className="hover:text-blue-600 dark:hover:text-blue-400 transition-all"
//             >
//               Help & Support
//             </Link>
            
//           </nav>
//         </div>

//         {/* Divider */}
//         <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-4"></div>

//         {/* Bottom Section */}
//         <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400">
//           <p>Copyright © {currentYear} Hueify. All Rights Reserved</p>
//           <div className="flex items-center gap-2">
//             <span>Made with</span>
//             <Heart className="h-4 w-4 text-red-500 fill-red-500" />
//             <span>by Your Team</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default AdminFooter;


import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import logo from "@/assets/logo.jpg"; // Import your logo

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto border-t bg-gradient-to-r from-gray-50/40 to-gray-100/10 dark:from-neutral-900/40 dark:to-neutral-800/10">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          {/* Logo and Name */}
          <div className="flex items-center gap-3 text-2xl font-semibold">
            <img src={logo} alt="Hueify Logo" className="h-7 w-auto" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400">Hueify</span>
          </div>

          {/* Admin Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-sm text-gray-700 dark:text-gray-300 md:justify-end">
                       <Link
              to="/"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              Home
            </Link>
            <Link
              to="/colors"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              Colors
            </Link>
            <Link
              to="/history"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              History
            </Link>
            <Link
              to="/help"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-all"
            >
              Help & Support
            </Link>
            
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-4"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-3 text-center text-sm text-gray-600 dark:text-gray-400 sm:flex-row sm:text-left">
          <p>Copyright © {currentYear} Hueify. All Rights Reserved</p>
          <div className="flex items-center gap-2">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>by Your Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
