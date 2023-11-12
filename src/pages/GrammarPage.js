import useTop from "../hooks/useTop";
import Card from "../components/Card";
import FutureTensesImg from "../assets/images/exercises/future-tenses.jpg";
import UsedToImg from "../assets/images/exercises/used-to.jpg";
import Breadcrumbs from "../components/Breadcrumbs";

function GrammarPage() {
  useTop();
  return (
    <div className="my-24 container mx-auto px-4">
      <h1 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-8">
        Grammar
      </h1>
      <section className="flex justify-start flex-wrap items-stretch gap-12">
        <Card
          title={"Future Tenses"}
          text={
            "Let's learn how to talk about future. Will, be going to, present continuous"
          }
          image={FutureTensesImg}
          buttonTxt={"Let's learn"}
          link={"/grammar/future-tenses"}
        />
        <Card
          title={"Used to"}
          text={`Did you have some past habits? I used to smoke! Shame on me!`}
          image={UsedToImg}
          buttonTxt={"Let's learn"}
          link={"/grammar/used-to"}
        />
      </section>
    </div>
  );
}

export default GrammarPage;
