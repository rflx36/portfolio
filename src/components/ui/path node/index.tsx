import { useMemo } from "react"



export interface PathNodeInterface {
    pointPosition: { x: number, y: number },


    startingControlPoint: {
        controlPointX: {
            type: "additive" | "fixed"
            value: number
        },
        controlPointY: {
            type: "additive" | "fixed"
            value: number
        },
    },
    endingControlPoint: {
        controlPointX: {
            type: "additive" | "fixed"
            value: number
        },
        controlPointY: {
            type: "additive" | "fixed"
            value: number
        },
    }
}



export default function PathNode(props: {
    strokeColor: string,
    strokeWidth: number
    points: Array<PathNodeInterface>
    width: number,
    height: number,
    position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
}) {



    const pathResult = useMemo(() => {
        let path = `M`

        switch (props.position) {
            case "topLeft":
                path = `${path} 0 0`;
                break;
            case "topRight":
                path = `${path} ${props.width} 0`;
                break;
            case "bottomLeft":
                path = `${path} 0 ${props.height}`;
                break;
            case "bottomRight":
                path = `${path} ${props.width} ${props.height}`;
                break;
            default:
                path = `${path} 0 0`;
                break;
        }



        props.points.forEach(point => {

            // const quadraticControlX = point.controlPointX.type === "additive" ? point.pointPosition.x + point.controlPointX.value : point.controlPointX.value;
            // const quadraticControlY = point.controlPointY.type === "additive" ? point.pointPosition.y + point.controlPointY.value : point.controlPointY.value;

            const startingControlPoint = `${point.startingControlPoint.controlPointX.type === "additive" ? point.pointPosition.x + point.startingControlPoint.controlPointX.value : point.startingControlPoint.controlPointX.value} ${point.startingControlPoint.controlPointY.type === "additive" ? point.pointPosition.y + point.startingControlPoint.controlPointY.value : point.startingControlPoint.controlPointY.value}`;

            const endingControlPoint = `${point.endingControlPoint.controlPointX.type === "additive" ? point.pointPosition.x + point.endingControlPoint.controlPointX.value : point.endingControlPoint.controlPointX.value} ${point.endingControlPoint.controlPointY.type === "additive" ? point.pointPosition.y + point.endingControlPoint.controlPointY.value : point.endingControlPoint.controlPointY.value}`;

            path = ` ${path}  C ${startingControlPoint} ${endingControlPoint} ${point.pointPosition.x} ${point.pointPosition.y}`;
        });
        return path;
    }, [props.points])


    // const path = `M ${}`

    return (
        <svg
            width={props.width}
            height={props.height}
            fill="none"
            viewBox={`0 0 ${props.width} ${props.height}`}
            className="blur-xs [stroke-dasharray:20,50]"
        >
            <path
                d={pathResult}
                stroke={props.strokeColor}
                strokeWidth={props.strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}