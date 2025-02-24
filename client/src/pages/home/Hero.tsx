import { Button } from "../../components/common/Button";
import HeroDecImg from "../../assets/images/home-dec.jpg";
import HeroDecImg2 from "../../assets/images/home-dec-2.jpg";
import HeroDecImg3 from "../../assets/images/home-dec-3.jpg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { t } = useTranslation("home");
  return (
    <section className="flex flex-col md:flex-row justify-center items-center gap-4 mt-24 mb-8 md:my-28 container mx-auto px-4">
      <div className="md:basis-1/2 flex flex-col justify-center md:items-end text-center md:text-right">
        <h1 className="text-6xl md:text-8xl font-bold text-orange-500 drop-shadow mb-8">
          Easy-Peasy
        </h1>
        <h2 className="text-4xl font-semibold mb-8 text-indigo-700 dark:text-indigo-200 drop-shadow">
          {t("hero.platformDescription")}
        </h2>
        <p className="text-2xl font-light text-indigo-900 dark:text-indigo-300 max-w-xl drop-shadow">
          {t("hero.learningDescription")}
        </p>
        <div className="flex justify-center md:justify-between items-center gap-3 mt-10">
          <a href="#about">
            <Button rounded primary className="min-w-[160px] text-xl">
              {t("hero.actions.getStarted")}
            </Button>
          </a>
          <Link to="/auth">
            <Button rounded secondary className="min-w-[160px] text-xl">
              {t("hero.actions.signUp")}
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full md:basis-1/2 flex justify-center md:justify-start">
        <div className="relative w-full inline-block h-[380px] md:h-[470px] w-[450px]">
          <div className="absolute top-[37%] left-[10%] w-[33%] z-20 rounded-md shadow-md shadow-black/30 overflow-hidden shine-effect transition-all duration-700 hover:scale-105">
            <img
              src={HeroDecImg}
              alt="Decor image of a platform exercise"
              className="w-full"
            />
          </div>
          <div className="absolute bottom-[15%] right-[12%] w-[44%] z-10 rounded-md shadow-md shadow-black/30 overflow-hidden shine-effect transition-all duration-700 hover:scale-105">
            <img
              src={HeroDecImg2}
              alt="Decor image of a platform exercise"
              className="w-full"
            />
          </div>
          <div className="absolute top-[21%] right-[7%] w-[66%] rounded-md shadow-md shadow-black/30 overflow-hidden shine-effect transition-all duration-700 hover:scale-105">
            <img
              src={HeroDecImg3}
              alt="Decor image of a platform exercise"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
