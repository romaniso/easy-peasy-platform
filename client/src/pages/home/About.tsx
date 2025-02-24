import { Card } from "../../components/common/Card";
import GrammarImg from "../../assets/images/grammar.jpg";
import VocabularyImg from "../../assets/images/vocab.jpg";
import ReadingImg from "../../assets/images/reading.jpg";
import ListeningImg from "../../assets/images/listening.jpg";
import { useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation("home");
  return (
    <section className="py-16 px-4" id="about">
      <div className="container mx-auto">
        <section className="flex flex-col justify-center items-center mb-16 px-4">
          <h2 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-8">
            {t("about.header")}
          </h2>
          <p className="text-2xl font-light text-indigo-700 dark:text-indigo-300 text-center md:max-w-screen-lg drop-shadow">
            {t("about.description")}
          </p>
        </section>
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <Card
            title={t("about.cards.grammar.title")}
            text={t("about.cards.grammar.description")}
            image={GrammarImg}
            buttonTxt={t("about.cards.btnText")}
            link="grammar"
          />
          <Card
            title={t("about.cards.vocabulary.title")}
            text={t("about.cards.vocabulary.description")}
            image={VocabularyImg}
            buttonTxt={t("about.cards.btnText")}
            link="vocabulary"
          />
          <Card
            title={t("about.cards.reading.title")}
            text={t("about.cards.reading.description")}
            image={ReadingImg}
            buttonTxt={t("about.cards.btnText")}
            link="reading"
          />
          <Card
            title={t("about.cards.listening.title")}
            text={t("about.cards.listening.description")}
            image={ListeningImg}
            buttonTxt={t("about.cards.btnText")}
            link="listening"
          />
        </section>
      </div>
    </section>
  );
};
