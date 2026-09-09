import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Chatbot from "../chatbot/Chatbot";

export default function Layout() {
  const { pathname } = useLocation();

  // Scroll to top on route change (SPA equivalent of a fresh page load).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {/* Floating instance — present on every page, same as the original. */}
      <Chatbot mode="floating" />
    </>
  );
}
