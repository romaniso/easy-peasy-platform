import React from "react";
import Card from "../../components/Card";
import GrammarImg from "../../assets/images/grammar.jpg";
import VocabularyImg from "../../assets/images/vocab.jpg";
import ReadingImg from "../../assets/images/reading.jpg";
import ListeningImg from "../../assets/images/listening.jpg";

const About: React.FC = () => {
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <section
                    className="flex flex-col justify-center items-center mb-16"
                    px-4
                >
                    <h2 className="text-6xl text-center font-bold text-orange-500 drop-shadow mb-8">
                        About us
                    </h2>
                    <p className="text-2xl font-light text-indigo-700 dark:text-indigo-300 text-center md:max-w-screen-lg drop-shadow">
                        We offer educational materials and practical exercises which will
                        increase your English level. There are different learning modules
                        that you can pick up from.
                    </p>
                </section>
                <section className="flex md:flex-row flex-wrap flex-col justify-between items-stretch md:gap-6 gap-y-16">
                    <Card
                        title="Grammar"
                        text="It’s a good idea to start with basics and master the main grammar structures"
                        image={GrammarImg}
                    />
                    <Card
                        title="Vocabulary"
                        text="Grammar is an engine oil of our car but vocabulary is the engine! Let’s pick up some new words :)"
                        image={VocabularyImg}
                    />
                    <Card
                        title="Reading"
                        text="Let’s practice your reading skills. It will help you learn new phrases and understand English better!"
                        image={ReadingImg}
                    />
                    <Card
                        title="Listening"
                        text="To understand orral speech we should listen to it quite often and get used to it! Try out our listening taks :)"
                        image={ListeningImg}
                    />
                </section>
            </div>
        </section>
    );
}

export default About;