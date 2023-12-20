import React, {ReactElement, useRef, useState, memo, useMemo} from "react";
import TranslationContent from "./TranslationContent";
import {TranslationContentData} from "../interfaces/TranslationContentData";
import useLookUpWord from "../hooks/useLookUpWord";

interface ToolTipProps {
    children: ReactElement;
    tooltip: string | ReactElement;
    translation?: true;
}
interface ParsedDictionaryData {
    audio?: string;
    transcription: string;
    definitions: string[][];
}
type Timeout = ReturnType<typeof setTimeout>;
const ToolTip: React.FC<ToolTipProps> = ({ children, tooltip, translation }) => {
    console.log('Tooltip rerender')
    const tooltipRef = useRef<HTMLSpanElement>(null);
    const container = useRef<HTMLDivElement>(null);
    const [isTooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipData, setTooltipData] = useState<TranslationContentData | null>(null)

    let hoverTimeout: Timeout;

    const childrenComponents = useMemo(() => children, [children])
    const {getDictionaryData} = useLookUpWord()
    const handleMouseEnter = ({ clientX }: React.MouseEvent<HTMLSpanElement>) => {
        if(translation){
            hoverTimeout = setTimeout(async () => {
                if (!tooltipRef.current || !container.current) return;
                // Fetch
                try {
                    const dictionaryData: ParsedDictionaryData = await getDictionaryData(tooltip as string);
                    console.log(dictionaryData);
                    setTooltipData(dictionaryData as TranslationContentData);
                } catch (error) {
                    console.error("Error fetching dictionary data:", error);
                }
                // Paint
                const { left } = container.current.getBoundingClientRect();
                tooltipRef.current.style.left = `${clientX - left}px`;
                // Change state
                setTooltipVisible(true)
            }, 500);
        } else {
            if (!tooltipRef.current || !container.current) return;
            const { left } = container.current.getBoundingClientRect();
            tooltipRef.current.style.left = `${clientX - left}px`;
            setTooltipVisible(true)
        }
    };

    const handleMouseLeave = () => {
        if(translation){
            clearTimeout(hoverTimeout);
        }
        setTooltipVisible(false);
    };

    const handleTooltipMouseEnter = () => {
        setTooltipVisible(true);
    };

    const handleTooltipMouseLeave = () => {
        setTooltipVisible(false);
    };

    return (
        <span
            ref={container}
            className='group relative inline-block z-50'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
      {childrenComponents}
            {tooltip && (
                <span
                    ref={tooltipRef}
                    className={`${translation ? 'min-w-[200px] max-h-[150px] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-orange-200 scrollbar-track-orange-400' : ''} ${
                        isTooltipVisible ? 'visible opacity-100' : 'invisible opacity-0'
                    } transition duration-1000 bg-orange-500/80 text-white text-sm p-1 rounded absolute bottom-full mb-2 shadow`}
                    onMouseEnter={handleTooltipMouseEnter}
                    onMouseLeave={handleTooltipMouseLeave}
                >
          {translation ? <TranslationContent word={tooltip as string} fetchedData={tooltipData as TranslationContentData}/> : tooltip}
        </span>
            )}
    </span>
    );
};

export default memo(ToolTip);
