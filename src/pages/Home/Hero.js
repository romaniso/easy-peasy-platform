import Button from "../../components/Button";
import StatueImg from "../../assets/images/statue-of-liberty.png";
import HeroImg from "../../assets/images/home-decor.png";

function Hero() {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center gap-4 my-24 md:my-28 container mx-auto px-4">
      <div className="md:basis-1/2 flex flex-col justify-center md:items-end text-center md:text-right">
        <h1 className="text-6xl md:text-8xl font-bold text-orange-500 drop-shadow mb-8">
          Easy-Peasy
        </h1>
        <h2 className="text-4xl font-semibold mb-8 text-indigo-700 dark:text-indigo-200 drop-shadow">
          Your platform for learning English{" "}
        </h2>
        <p className="text-2xl font-light text-indigo-900 dark:text-indigo-300 max-w-xl drop-shadow">
          Here you can learn English with a banch of educational materials
          prepared for students of different level. You will find something
          useful for yourself!
        </p>
        <div className="flex justify-center md:justify-between items-center gap-3 mt-10">
          <Button rounded primary className="min-w-[160px] text-xl">
            Get started
          </Button>
          <Button rounded secondary className="min-w-[160px] text-xl">
            Sign up
          </Button>
        </div>
      </div>
      <div className="md:basis-1/2">
        <img src={HeroImg} alt="Statue of Liberty" className="w-full" />
      </div>
    </section>
  );
}

export default Hero;
