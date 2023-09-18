import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  let { pathname } = useLocation();
  return (
    <div className="bg-gradient-to-r from-violet-50 via-fuchsia-100 to-indigo-200 min-h-full overflow-hidden flex flex-col">
      {pathname !== "/dashboard" && <Navbar />}
      <main className="grow shrink basis-auto">{children}</main>
      {pathname !== "/dashboard" && <Footer />}
    </div>
  );
}

export default Layout;
