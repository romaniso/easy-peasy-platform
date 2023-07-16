import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="bg-gradient-to-r from-violet-50 via-fuchsia-100 to-indigo-300 min-h-full overflow-hidden flex flex-col">
      <Navbar />
      <main className="grow shrink basis-auto">{children}</main>
      {/* Footer */}
      <footer>Footer</footer>
    </div>
  );
}

export default Layout;
