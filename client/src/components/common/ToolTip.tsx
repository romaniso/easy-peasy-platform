import React, { ReactElement, useRef, useState, useMemo } from "react";
import { TranslationContent } from "../TranslationContent";
import { TranslationContentData } from "../../interfaces/translationContentData";
import { useLookUpWord } from "../../hooks/useLookUpWord";
import { KeyWordObject } from "../../interfaces/keyWord";

interface ToolTipProps {
  children: ReactElement;
  tooltip: string | ReactElement;
  secondary?: true;
  translation?: true;
  keyWord?: KeyWordObject;
}
interface ParsedDictionaryData {
  audio?: string;
  transcription: string;
  definitions: string[][];
}
type Timeout = ReturnType<typeof setTimeout>;
export const ToolTip = ({
  children,
  tooltip,
  translation,
  secondary,
  keyWord,
}: ToolTipProps): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [isTooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipData, setTooltipData] = useState<TranslationContentData | null>(
    null
  );
  let hoverTimeout: Timeout;
  const childrenComponents = useMemo(() => children, [children]);
  const { getDictionaryData } = useLookUpWord();

  const handleMouseEnter = ({ clientX }: React.MouseEvent<HTMLSpanElement>) => {
    if (translation) {
      hoverTimeout = setTimeout(async () => {
        if (!tooltipRef.current || !container.current) return;
        if (keyWord) {
          const { word, definitions } = keyWord;

          let KeyWordAudio: string | undefined = undefined;
          let KeyWordAudioTranscription: string | undefined = undefined;
          try {
            const data: ParsedDictionaryData | null = await getDictionaryData(
              word
            );
            if (data?.audio) {
              KeyWordAudio = data.audio;
            }
            if (data?.transcription) {
              KeyWordAudioTranscription = data.transcription;
            }
          } finally {
            const dictionaryData: TranslationContentData = {
              audio: KeyWordAudio,
              transcription: KeyWordAudioTranscription,
              definitions,
            };
            setTooltipData(dictionaryData);
          }
        } else {
          try {
            const dictionaryData: ParsedDictionaryData | null =
              await getDictionaryData(tooltip as string);
            setTooltipData(dictionaryData as TranslationContentData);
          } catch (error) {
            console.error("Error fetching dictionary data:", error);
          }
        }
        const { left } = container.current.getBoundingClientRect();
        tooltipRef.current.style.left = `${clientX - left - 20}px`;
        setTooltipVisible(true);
      }, 750);
    } else {
      if (!tooltipRef.current || !container.current) return;
      const { left } = container.current.getBoundingClientRect();
      tooltipRef.current.style.left = `${clientX - left}px`;
      setTooltipVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (translation) {
      clearTimeout(hoverTimeout);
    }
    setTooltipVisible(false);
  };
  const handleTooltipMouseLeave = () => {
    if (translation) {
      clearTimeout(hoverTimeout);
    }
    setTooltipVisible(false);
  };

  return (
    <span
      ref={container}
      className="group relative inline-block z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {childrenComponents}
      {tooltip && (
        <span
          ref={tooltipRef}
          className={`
                    ${
                      secondary
                        ? "bg-white text-indigo-900 z-50 min-w-[120px]"
                        : "bg-orange-500/80 text-white"
                    } 
                    ${
                      isTooltipVisible
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    } 
                    transition duration-1000 bg-orange-500/80 text-sm p-1 rounded absolute mb-2 shadow
                    ${
                      translation
                        ? "min-w-[200px] max-h-[150px] overflow-y-auto overflow-x-hidden scrollbar scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-orange-400 pb-5 bottom-5"
                        : "bottom-full"
                    }
                    `}
          onMouseLeave={handleTooltipMouseLeave}
        >
          {translation ? (
            <TranslationContent
              word={tooltip as string}
              fetchedData={tooltipData as TranslationContentData}
            />
          ) : (
            tooltip
          )}
        </span>
      )}
    </span>
  );
};
