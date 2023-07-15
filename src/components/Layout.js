import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="bg-slate-100">
      <div className="container mx-auto">
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
