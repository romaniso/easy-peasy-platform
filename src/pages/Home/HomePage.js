import useTop from "../../hooks/useTop";
import Hero from "./Hero";
import About from "./About";

function HomePage() {
  useTop();
  return (
    <>
      <Hero />
      <About />
    </>
  );
}

export default HomePage;
