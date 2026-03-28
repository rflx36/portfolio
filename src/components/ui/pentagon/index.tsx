import getPolygonPath from "./get_p_path";


export default function Polygon(props: {
    size: number,
    sides: number,
    fillColor: string,
    cornerRadius?: number,
    strokeWidth?: number
    strokeColor?: string,
    className?: string | undefined,
    children?: React.ReactNode,
    polygonClipId?: string,
}) {
    const cx = props.size / 2;
    const cy = props.size / 2;
    const r = (props.size / 2) * 0.88;
    const path = getPolygonPath(props.sides, cx, cy, r, props.cornerRadius || 0);

    return (
        <svg
            width={props.size}
            height={props.size}
            viewBox={`0 0 ${props.size} ${props.size}`}
            className={props.className}
            xmlns="http://www.w3.org/2000/svg"
        >

            <path
                d={path}
                fill={props.fillColor}
                stroke={props?.strokeColor}
                strokeWidth={props?.strokeWidth}
            />
            {
                props.polygonClipId && (
                    <defs>
                        <clipPath id={props.polygonClipId} >
                            <path d={path} />
                        </clipPath>
                    </defs>
                )
            }
        </svg>
    )
}