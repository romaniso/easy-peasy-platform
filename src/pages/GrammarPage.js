import Card from "../components/Card";
import FutureTensesImg from "../assets/images/exercises/future-tenses.jpg";
import UsedToImg from "../assets/images/exercises/used-to.jpg";
//TODO: Single Exercise Page with Dynamic Content (https://chat.openai.com/share/0d762506-785b-47dd-8a47-a87fe2787e84)

function GrammarPage() {
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
