import { use, useEffect, useMemo, useRef, useState } from "react";
import CornerPathNode from "../../ui/corner path node";
import clamp from "../../../utils/clamp";




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
    return (
        <div className={`absolute right-0 w-[calc(290px-50dvw)] h-1.5 rounded-full bottom-0 ease-in duration-100 ${resizeTick.current ? "opacity-0 duration-0" : ""}`}>
            <div className="absolute h-full w-[calc(100%-32px)] rounded-r-full bg-mixed-soft-shadow-bg right-0 " />
            <div className="absolute bottom-0 left-0 translate-x-[-6px] ">
                <CornerPathNode
                    width={40}
                    height={120}
                    blendValue={clampValues.pathClamp}
                    strokeColor="var(--color-mixed-soft-shadow-bg)"
                />
            </div>


            <div className="absolute bottom-[114px] w-[calc((290px-50dvw)*2)] ">
                <div className="absolute h-1.5 bottom-0 left-[33px] w-[calc(100%-70px)]  bg-mixed-soft-shadow-bg rounded-r-full" />
                <div
                    style={{
                        transform: `translateX(${clampValues.transformClamp}px)`
                    }}
                >

                    <CornerPathNode
                        width={40}
                        height={120}
                        blendValue={clampValues.pathClamp * -1}
                        strokeColor="var(--color-mixed-soft-shadow-bg)"
                    />
                    <div className="absolute  h-[120px]   bg-red-500 bottom-0"
                        style={{
                            transform: `translateX(${(clampValues.adjustmentClamp * -1) + 9}px)`

                        }}

                    >
                        <div className="absolute size-3 right-0 translate-y-[-0.188rem] rounded-full bg-container-soft-shadow z-10">
                            <div className="rounded-xl right-5 absolute top-0 bottom-0 h-max w-max my-auto p-[0.313rem] bg-mixed-soft-shadow-bg grid place-content-center">
                                <div className="bg-bg border border-container-stroke grid place-content-center rounded-lg h-12 w-48">
                                    <p className="text-lg font-bold text-text">Research</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    )
}