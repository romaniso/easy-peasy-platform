import { useTop } from "../hooks/useTop";
import { Hero } from "./home/Hero";
import { About } from "./home/About";

export const HomePage = (): JSX.Element => {
  useTop();
  return (
    <>
      <Hero />
      <About />
    </>
  );
};
