import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthLayout from "./AuthLayout";
import useAuth from "../hooks/useAuth";

const MODIFIED_PATHS_BY_AUTH = new Set([
  "/dashboard",
  "/profile",
  "/settings",
  "/glossary",
]);

const RootLayout: React.FC = () => {
  const { auth } = useAuth();
  const { pathname } = useLocation();
  let layoutContent: React.ReactNode;

  if (MODIFIED_PATHS_BY_AUTH.has(pathname) && auth.accessToken) {
    layoutContent = <AuthLayout />;
  } else {
    layoutContent = (
      <div className="bg-gradient-to-r from-[#F5F3FF] dark:from-[#202020] via-[#FAE8FF] dark:via-[#3b4058] to-[#C7D2FE] dark:to-[#202020] overflow-hidden flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  return layoutContent;
};

export default RootLayout;
