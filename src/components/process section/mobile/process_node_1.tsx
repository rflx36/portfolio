import { useEffect, useMemo, useRef, useState } from "react";
// import CornerPathNode from "../../ui/corner path node";
import clamp from "../../../utils/clamp";
import type { PathNodeInterface } from "../../ui/path node";
import PathNode from "../../ui/path node";
// import PathNode from "../../ui/path node";




export default function ProcessMobileNode1() {


    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const resizeTick = useRef(false);

    // useEffect(() => {

    //     console.log("::::UPDATE:::Z:");
    //     console.log("called:" + window.innerWidth)

    //     setWindowWidth(window.innerWidth);
    // }, [window.innerWidth])


    useEffect(() => {
        const handleResize = () => {
            if (!resizeTick.current) {
                resizeTick.current = true;
                setWindowWidth(window.innerWidth);

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
        return { pathClamp, transformClamp, adjustmentClamp };

    }, [windowWidth])



    // const testClamp = useMemo(()=>{
    //     const value = windowWidth;
    //     return value
    // },[windowWidth])

    const testClamp = windowWidth;

    console.log("clamp values:");
    console.log(clampValues);



    
    return (
        <>
            <div className="size-0 bg-blue-500 ">
                <p>{clampValues.pathClamp}</p>
                <p>{clampValues.transformClamp}</p>
                <p>{clampValues.adjustmentClamp}</p>
                <p className="text-red-500">{testClamp}</p>
                {/* 
        <PathNode
        strokeColor="black"
        strokeWidth={2}
        width={} */}
                {/* <PathNode
                    strokeColor="black"
                    strokeWidth={2}
                    width={clampValues.transformClamp}
                    height={250}
                    position="bottomRight"
                    points={[point_value_1]}
                /> */}
                {/* <div className="size-[20px] bg-red-500"></div> */}

               

            </div>
        </>
    )
}