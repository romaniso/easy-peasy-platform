import { ReactNode } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { hasPunctuation } from "../../utils/hasPunctuationSign";
import { ToolTip } from "../common/ToolTip";
import { useIsHeadingsOpened } from "../../context/ReadingContext";
import { KeyWordObject } from "../../interfaces/keyWord";
import { AudioPlayer } from "../common/AudioPlayer";

interface ReadingProps {
  text: string;
  title: string;
  image: string;
  level: string;
  audioUrl: string;
}

export const Reading = ({
  text,
  title,
  image,
  level,
  audioUrl,
}: ReadingProps): JSX.Element => {
  const isHeadingsOpened = useIsHeadingsOpened();
  const renderWord = (word: string, index: number): ReactNode => {
    if (hasPunctuation(word)) {
      const punctuationSign = word.slice(-1);
      const partWithoutPunctuationSign = word.slice(0, -1);
      return (
        <ToolTip
          tooltip={partWithoutPunctuationSign as string}
          translation
          key={index}
        >
          <span key={index}>
            <span className="hover:text-xl hover:text-indigo-500 hover:font-bold transition-all duration-200 cursor-pointer hover:-m-1.5 hover:bg-orange-300 dark:hover:bg-white z-10">
              {partWithoutPunctuationSign}
            </span>
            <span>{punctuationSign}&nbsp;</span>
          </span>
        </ToolTip>
      );
    } else {
      return (
        <ToolTip tooltip={word as string} translation key={index}>
          <>
            <span
              key={index}
              className="hover:text-xl hover:text-indigo-500 hover:font-bold transition-all duration-200 cursor-pointer hover:-m-1.5 hover:bg-orange-300 dark:hover:bg-white z-10"
            >
              {word}
            </span>
            <span>&nbsp;</span>
          </>
        </ToolTip>
      );
    }
  };
  const renderWords = (wordsArr: string[]): ReactNode[] =>
    wordsArr.map((word, index) => renderWord(word, index));

  const renderChildren = (children: ReactNode | ReactNode[]) =>
    Array.isArray(children)
      ? children.map((el) =>
          typeof el === "string" ? renderWords(el.split(" ")) : el
        )
      : renderWords((children as string).split(" "));

  const prepareKeyWordObject = (unit: string): KeyWordObject => {
    const WORD_DIVIDER = "?";
    const DEFINITION_DIVIDER = "=";
    if (!unit.includes(WORD_DIVIDER) && !unit.includes(DEFINITION_DIVIDER))
      throw new Error(
        "Markdown must be edited. Strong element is created wrongly. It must include definitions and a bare form."
      );
    const wordToDisplay: string = unit.split(WORD_DIVIDER)[0];
    const word: string = unit
      .split(WORD_DIVIDER)[1]
      ?.split(DEFINITION_DIVIDER)[0];
    const definitions = unit
      .split(WORD_DIVIDER)[1]
      .split(DEFINITION_DIVIDER)[1]
      .split(";")
      .map((definition) => [definition]);

    return {
      wordToDisplay,
      word,
      definitions,
    };
  };

  // For React Markdown
  const components: Partial<Components> = {
    p: ({ children }) => <p>{renderChildren(children)}</p>,
    strong: ({ children }) => {
      const keyWordObject = prepareKeyWordObject(children as string);

      return (
        <ToolTip
          tooltip={keyWordObject.word}
          translation
          keyWord={keyWordObject}
        >
          <strong className="hover:text-xl hover:text-indigo-500 hover:font-bold transition-all duration-200 cursor-pointer hover:-m-1.5 hover:bg-orange-300 dark:hover:bg-white z-10 whitespace-nowrap">
            {keyWordObject.wordToDisplay}
          </strong>
        </ToolTip>
      );
    },
    h4: ({ children }) => {
      return isHeadingsOpened ? (
        <h4>{children}</h4>
      ) : (
        <ToolTip tooltip="Complete the match-headings exercise to see the heading">
          <h4 className="blur cursor-help">{children}</h4>
        </ToolTip>
      );
    },
  };

  return (
    <div className="flex flex-col">
      <header
        className="bg-cover bg-center bg-no-repeat min-h-[10px] overflow-hidden rounded-t-md"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="w-full h-full py-2 px-6 backdrop-brightness-[40%] flex flex-col justify-center gap-2">
          <h1 className="text-5xl font-bold text-orange-500 drop-shadow text-center tracking-widest">
            {title}
          </h1>
          <section className="flex justify-between items-center mt-5 mb-2">
            <span className="border border-indigo-400 rounded-md text-indigo-400 text-2xl inline-block w-10 h-10 text-center">
              {level}
            </span>
            <AudioPlayer
              audioUrl={audioUrl}
              className="bg-indigo-50/50 dark:bg-stone-800/60 px-2 py-1 rounded-xl"
            />
          </section>
        </div>
      </header>
      <ReactMarkdown
        className="markdown-reading"
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};
