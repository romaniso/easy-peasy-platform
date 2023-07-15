import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-full overflow-hidden flex flex-col">
      <Navbar />
      <main className="grow shrink basis-auto">{children}</main>
      {/* Footer */}
      <footer>Footer</footer>
    </div>
  );
}

export default Layout;
