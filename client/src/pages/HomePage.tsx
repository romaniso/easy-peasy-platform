import useTop from "../hooks/useTop";
import Hero from "./home/Hero";
import About from "./home/About";

const HomePage = () => {
    useTop();
    return (
        <>
            <Hero />
            <About />
        </>
    );
}

export default HomePage;