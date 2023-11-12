import useTop from "../hooks/useTop";
import Card from "../components/Card";
import RelationshipsImg from "../assets/images/vocabulary/realtionships.jpg";
import Breadcrumbs from "../components/Breadcrumbs";

function VocabularyPage() {
  useTop();
  return (
    <div className="my-24 container mx-auto px-4">
      <h1 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-8">
        Vocabulary
      </h1>
      <section className="flex justify-start flex-wrap items-stretch gap-12">
        <Card
          title={"Relationships"}
          text={
            "People live among other people. Let's learn how to build relationships using the most common English phrases"
          }
          image={RelationshipsImg}
          buttonTxt={"Let's learn"}
          link={"/vocabulary/relationships"}
        />
      </section>
    </div>
  );
}

export default VocabularyPage;
