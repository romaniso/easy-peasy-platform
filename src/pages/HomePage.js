import Button from "../components/Button";

function HomePage() {
  return (
    <div className="h-screen mt-32 container mx-auto">
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-8xl text-center font-bold text-orange-500 drop-shadow mb-8">
          Easy-Peasy
        </h1>
        <h2 className="text-4xl text-center font-semibold mb-8 text-indigo-700 drop-shadow">
          Your platform for learning English{" "}
        </h2>
        <p className="text-2xl font-light text-indigo-900 text-center max-w-xl drop-shadow">
          Here you can learn English with a banch of educational materials
          prepared for students of different level. You will find something
          useful for yourself!
        </p>
        <div className="flex justify-between items-center gap-3 mt-10">
          <Button rounded primary className="min-w-[160px] text-xl">
            Get started
          </Button>
          <Button rounded secondary className="min-w-[160px] text-xl">
            Sign up
          </Button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
