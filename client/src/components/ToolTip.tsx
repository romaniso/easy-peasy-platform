import React, {ReactElement, useRef} from "react";
// @todo: Try to restyle so it won't be cropped while changing a screen size. I must adjust and be positioned depending on a width

interface ToolTipProps {
    children: ReactElement;
    tooltip: string;
}
const ToolTip: React.FC<ToolTipProps> = ({children, tooltip}) => {
    const tooltipRef = useRef<HTMLSpanElement>(null);
    const container = useRef<HTMLDivElement>(null);

    return <div ref={container} className='group relative inline-block z-50' onMouseEnter={({clientX}) => {
        if (!tooltipRef.current || !container.current) return;
        const {left} = container.current.getBoundingClientRect();
        tooltipRef.current.style.left = clientX - left + 'px';
    }}>
        {children}
        {tooltip && <span
            ref={tooltipRef}
            className='invisible group-hover:visible opacity-0 group-hover:opacity-100 transition duration-1000 bg-orange-500/80 text-white text-sm p-1 rounded absolute bottom-full mb-2 shadow'>
            {tooltip}
        </span>}
    </div>
}

export default ToolTip;