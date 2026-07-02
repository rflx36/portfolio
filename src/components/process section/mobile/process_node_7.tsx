import { useEffect, useRef, useState } from "react";
import type { PathNodeInterface } from "../../ui/path node"
import PathNode from "../../ui/path node"
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



    // const clampValues = useMemo(() => {



    const point_value_1: PathNodeInterface = {
        pointPosition: {
            x: 53,
            y: 94
        },
        startingControlPoint: {
            controlPointX: {
                type: "additive",
                value: 40
            },
            controlPointY: {
                type: "additive",
                value: 134
            },
        },
        endingControlPoint: {
            controlPointX: {
                type: "additive",
                value: 38,
            },
            controlPointY: {
                type: "additive",
                value: 49,
            },
        }
    }


    return (
        <div className="bg-red-500 p-10 ">
            <div className="bg-blue-500">


                <PathNode
                    strokeColor="black"
                    strokeWidth={2}
                    width={150}
                    height={300}
                    position="bottomRight"
                    points={[point_value_1]}
                />

            </div>
        </div>

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