import { useEffect, useState } from "react"
import ProcessSectionDefault from "./default"
import ProcessSectionMobile from "./mobile"
import clamp from "../../utils/clamp";
// import { LegPathInterpolator } from "./temp";
// import CornerPathNode from "../ui/corner path node";
import PathNode, { type PathNodeInterface } from "../ui/path node";



export default function ProcessSection() {
    const responsiveBarrier = 768;
    const [responsiveState, setResponsiveState] = useState<"smallView" | "WideView">(window.innerWidth < responsiveBarrier ? "smallView" : "WideView");
    const [polygonSize, setPolygonSize] = useState(clamp(window.innerWidth * 0.4, 200, 400));

    // console.log("clamp value:"+polygonSize);
    useEffect(() => {




        const handleResize = () => {

            const newSize = window.innerWidth < responsiveBarrier ? "smallView" : "WideView";
            console.log(window.innerWidth);
            setResponsiveState(newSize);
            // const responsiveDivider = window.innerWidth < responsiveBarrier ? 0.5 : 0.4;
            const baseSize = window.innerWidth < responsiveBarrier ? window.innerWidth - 100 : window.innerWidth * 0.4;
            setPolygonSize(clamp(baseSize, 200, 400));
            console.log("clamp value:" + (clamp(baseSize, 200, 400)));
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    const point_value: PathNodeInterface = {
        pointPosition: { x: clamp(polygonSize / 2, 0, 130), y: 60 },
        startingControlPoint: {
            controlPointX: {
                type: "fixed" ,
                value: 69
            },
            controlPointY: {
                type: "fixed",
                value: 53
            },
        },
        endingControlPoint:{
            controlPointX: {
                type: "additive",
                value: 55,
            },
            controlPointY: {
                type: "additive",
                value: 55,
            },
        }
    }
    const point_Value2: PathNodeInterface = {
        pointPosition: { x: 200, y: 100 },
        startingControlPoint: {
            controlPointX: {
                type: "additive",
                value: 50
            },
            controlPointY: {
                type: "additive",
                value: 50
            }
        },
        endingControlPoint: {
            controlPointX: {
                type: "fixed",
                value: 300,
            },
            controlPointY: {
                type: "fixed",
                value: 0,
            }
        }
    }

    // const point_value2: PathNodeInterface = {
    //     pointPosition


    return (
        <div className="w-full  overflow-clip">
            <p>Clamp Size Amount: {polygonSize}</p>
            {
                responsiveState === "WideView" ?
                    <ProcessSectionDefault polygonSize={polygonSize} />
                    :
                    <ProcessSectionMobile polygonSize={polygonSize} />
            }
            {/* <CornerPathNode
                width={40}
                height={122}
                blendValue={-100}
            />
            <LegPathInterpolator /> */}
            <PathNode
                strokeColor="black"
                strokeWidth={2}
                width={400}
                height={130}
                position="bottomLeft"
                points={[point_value,point_Value2]}
            />
        </div>
    )
}