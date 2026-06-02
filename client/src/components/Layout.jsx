import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, fullHeight = false, fullBleed = false }) => {
  return (
    <section className={`flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground ${fullHeight ? "min-h-screen" : ""}`}>
      <Header />
      <main className={`w-full overflow-x-hidden ${fullHeight ? "flex-1" : ""}`}>
        {fullBleed ? (
          children
        ) : (
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        )}
      </main>
      <Footer />
    </section>
  );
};

export default Layout;
