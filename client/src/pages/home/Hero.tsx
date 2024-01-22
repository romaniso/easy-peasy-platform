import Button from "../../components/Button";
import HeroDecImg from "../../assets/images/home-dec.jpg";
import HeroDecImg2 from "../../assets/images/home-dec-2.jpg";
import HeroDecImg3 from "../../assets/images/home-dec-3.jpg";

function Hero() {
    return (
        <section className="flex flex-col md:flex-row justify-center items-center gap-4 mt-24 mb-8 md:my-28 container mx-auto px-4">
            <div className="md:basis-1/2 flex flex-col justify-center md:items-end text-center md:text-right">
                <h1 className="text-6xl md:text-8xl font-bold text-orange-500 drop-shadow mb-8">
                    Easy-Peasy
                </h1>
                <h2 className="text-4xl font-semibold mb-8 text-indigo-700 dark:text-indigo-200 drop-shadow">
                    Your platform for learning English{" "}
                </h2>
                <p className="text-2xl font-light text-indigo-900 dark:text-indigo-300 max-w-xl drop-shadow">
                    Here you can learn English with a bunch of educational materials
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
            <div className="w-full md:basis-1/2 flex justify-center md:justify-start">
                <div className='relative w-full inline-block h-[380px] md:h-[470px] w-[450px]'>
                    <div className="absolute top-[37%] left-[10%] w-[33%] z-20 rounded-md shadow-md shadow-black/30 overflow-hidden shine-effect transition-all duration-700 hover:scale-105">
                        <img src={HeroDecImg} alt="Decor image of a platform exercise" className='w-full'/>
                    </div>
                    <div className="absolute bottom-[15%] right-[12%] w-[44%] z-10 rounded-md shadow-md shadow-black/30 overflow-hidden shine-effect transition-all duration-700 hover:scale-105">
                        <img src={HeroDecImg2} alt="Decor image of a platform exercise" className='w-full'/>
                    </div>
                    <div className="absolute top-[21%] right-[7%] w-[66%] rounded-md shadow-md shadow-black/30 overflow-hidden shine-effect transition-all duration-700 hover:scale-105">
                        <img src={HeroDecImg3} alt="Decor image of a platform exercise" className='w-full'/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;