import { useMemo } from "react";



interface CornerPathNodeProps {
    width: number;
    height: number;
    blendValue: number;
    strokeWidth?: number;
    strokeColor?: string;
}



export default function CornerPathNode(props: CornerPathNodeProps) {


    const pathData = useMemo(() => {
        const strokeOffset = props.strokeWidth ? props.strokeWidth / 2 : 3; // Default stroke width is 6, so offset is 3
        const t = props.blendValue / 100;
        const centerX = strokeOffset;      // The vertical axis where the straight line sits
        const maxWidth = props.width - strokeOffset;    // Total horizontal expansion (37 - 3)
        const topY = strokeOffset;
        const bottomY = props.height - strokeOffset;
        const curveSize = props.width;   // Vertical space used by the curve (119 - 85)
        const magicOffset = 15.2223;
        const currentEndX = centerX + (maxWidth * t);
        const upperCurveEndY = topY + (curveSize * Math.abs(t));
        const lowerCurveStartY = bottomY - (curveSize * Math.abs(t));

        const uCP1x = currentEndX - (magicOffset * t);
        const uCP2y = topY + (magicOffset * Math.abs(t));
        const lCP1y = bottomY - (magicOffset * Math.abs(t));
        const lCP2x = centerX + (magicOffset * t);

        return `M${currentEndX} ${topY}
            C${uCP1x} ${topY} ${centerX} ${uCP2y} ${centerX} ${upperCurveEndY}
            V${lowerCurveStartY}
            C${centerX} ${lCP1y} ${lCP2x} ${bottomY} ${currentEndX} ${bottomY} `;

    }, [props.blendValue])


    return (
        <svg
            width={props.width * 2}
            height={props.height}
            viewBox={`-${props.width} 0 ${props.width * 2} ${props.height}`}
            fill="none"
            className="-translate-x-1/2 "
        >

            <path
                d={pathData}
                stroke={props.strokeColor || "black"}
                strokeWidth={props.strokeWidth || 6}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-75 ease-out"
            />
        </svg>

    )
}