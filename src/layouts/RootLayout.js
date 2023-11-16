import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function RootLayout({ children }) {
  let { pathname } = useLocation();
  return (
    <div className="bg-gradient-to-r from-[#F5F3FF] dark:from-[#202020] via-[#FAE8FF] dark:via-[#3b4058] to-[#C7D2FE] dark:to-[#202020] overflow-hidden flex flex-col min-h-screen">
      {pathname !== "/dashboard" && <Navbar />}
      <main className="flex-1">
          {children}
      </main>

      {pathname !== "/dashboard" && <Footer />}
    </div>
  );
}

export default RootLayout;
