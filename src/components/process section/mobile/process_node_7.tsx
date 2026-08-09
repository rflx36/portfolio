import { useEffect, useMemo, useRef, useState } from "react";
import type { PathNodeInterface } from "../../ui/path node"
import PathNode from "../../ui/path node"
import clamp from "../../../utils/clamp";
// import PathNodeVisualizer from "../../ui/path node/visualizer"






export default function ProcessMobileNode7() {

    //min 150
    //max 250

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const resizeTick = useRef(false);





    useEffect(() => {
        const handleResize = () => {
            if (!resizeTick.current) {
                resizeTick.current = true;
                setWindowWidth(window.innerWidth);

                console.log(windowWidth)
                setTimeout(() => {
                    setWindowWidth(window.innerWidth);
                    resizeTick.current = false;
                }, 1000);
            }
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])



    const clampValues = useMemo(() => {
        const pathClamp = (clamp((290 - (windowWidth / 2)), 0, 40) / 40) * 100;
        const transformClamp = Math.max((((290 - (windowWidth / 2)) * 2) - 6), -6);
        const adjustmentClamp = clamp((290 - (windowWidth / 2)), 0, 40);
        const inversedPathClamp = 100 - pathClamp;

        const centerValue = (windowWidth / 2);

        return { pathClamp, transformClamp, adjustmentClamp, inversedPathClamp, centerValue };
    }, [windowWidth])


    const point_value_1: PathNodeInterface = {
        pointPosition: {
            x: 69 + (clampValues.inversedPathClamp / 2),
            y: 135
        },
        startingControlPoint: {
            controlPointX: {
                type: "additive",
                value: 16
            },
            controlPointY: {
                type: "additive",
                value: 78
            }
        },
        endingControlPoint: {
            controlPointX: {
                type: "additive",
                value: 47
            },
            controlPointY: {
                type: "additive",
                value: 54
            }
        }
    }

    const point_value_2: PathNodeInterface = {
        pointPosition: {
            x: 111,
            y: 5
        },
        startingControlPoint: {
            controlPointX: {
                type: "additive",
                value: -73
            },
            controlPointY: {
                type: "additive",
                value: 86
            }
        },
        endingControlPoint: {
            controlPointX: {
                type: "additive",
                value: -55
            },
            controlPointY: {
                type: "additive",
                value: 13
            }
        }
    }

    return (
        <div className="size-0">
            <div className="size-max relative -translate-x-full -translate-y-full ">

                <PathNode
                    strokeColor="var(--color-mixed-soft-shadow-bg)"
                    strokeWidth={6}
                    width={115 + (clampValues.inversedPathClamp == 0 ? 0 : clampValues.inversedPathClamp - 10)}
                    height={240}
                    position="bottomRight"
                    points={[point_value_1, point_value_2]}
                />
                <div className="bg-container-soft-shadow z-10 size-3 rounded-full top-0 left-28 absolute">
                    <div className="rounded-xl left-5 absolute top-0 bottom-0 h-max w-max my-auto p-[0.313rem] bg-mixed-soft-shadow-bg grid place-content-center">
                        <div className="bg-bg border border-container-stroke grid place-content-center rounded-lg h-12 w-48">
                            <p className="text-lg font-bold text-text">User Experience</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute  top-0  size-10 bg-yellow-500 "
                style={{ left: 10, width: clampValues.centerValue }}
            >

            </div>
        </div>
        // <div className="bg-red-500 p-10 ">
        //     <div className="bg-blue-500">
        //        </div >
        // <div className="bg-red-500 p-10 ">
        //     <div className="bg-blue-500">


        //         <PathNode
        //             strokeColor="black"
        //             strokeWidth={2}
        //             width={150}
        //             height={300}
        //             position="bottomRight"
        //             points={[point_value_1]}
        //         />

        //     </div>
        // </div>

        // <PathNodeVisualizer/>
        // <></>
    )
    // <div className = "size-[150px] bg-red-500" ></div>


    // <div className="relative">
    //     <div className="absolute w-[40px] h-[180px] left-0 bottom-0">
    //         <div className="absolute size-3 right-0 translate-y-[-0.188rem] rounded-full bg-container-soft-shadow z-10">
    //             <div className="rounded-xl left-5 absolute top-0 bottom-0 h-max w-max my-auto p-[0.313rem] bg-mixed-soft-shadow-bg grid place-content-center">
    //                         <div className="bg-bg border border-container-stroke grid place-content-center rounded-lg h-12 w-48">
    //                     <p className="text-lg font-bold text-text">User Experience</p>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>

    //     <svg width="40" height="180" viewBox="0 0 40 180" className="absolute stroke-mixed-soft-shadow-bg bottom-0 left-0 -translate-x-[0.188rem] " fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <path d="M3 177V37C3 18.2223 18.2223 3 37 3" strokeWidth="6" strokeLinecap="round" />
    //     </svg>

    // </div>

}