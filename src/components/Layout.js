import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="bg-gradient-to-r from-violet-50 via-fuchsia-100 to-indigo-200 min-h-full overflow-hidden flex flex-col">
      <Navbar />
      <main className="grow shrink basis-auto">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
