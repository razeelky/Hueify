import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-screen flex flex-col overflow-x-hidden">
      <Header />
<<<<<<< HEAD
      <main className="flex items-center justify-center w-full min-h-[calc(100vh-4rem)] overflow-x-hidden">{children}</main>
=======
      <main className="w-full min-h-[calc(100vh-4rem)] overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-start justify-center">
          {children}
        </div>
      </main>
>>>>>>> c6cae2b (Save current Hueify updates)
      <Footer />
    </section>
  );
};

export default Layout;
