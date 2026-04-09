
import Polygon from "../ui/pentagon";
import React, { useEffect, useRef, useState } from "react";
import type { processImplementationDetailsType } from "../../types/types";
import ImplementationTextReveal from "./implementation_text_reveal";
import { useInView } from "react-intersection-observer";



export default function ProcessSection() {
    const [implementations, setImplementations] = useState<processImplementationDetailsType[]>([]);
    const [onHoverModifiers, setOnHoverModifiers] = useState({
        rotation_on_hover: 0,
        rotation_on_hover_second_leg_length_offset: [0, 0, 0, 0, 0, 0, 0],
        mouse_position: { x: 0, y: 0 },
        text_display: "",
        index: -1
    });
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })
    const mousePositionRef = useRef({ x: 0, y: 0 });
    const mouseLeave = useRef(false);

    const fetchProcessImplementationsData = async () => {
        const response = await fetch("/process_implementations.json");
        const data = await response.json();
        setImplementations(data);
    }

    const updateMousePosition = (e: MouseEvent) => {
        mousePositionRef.current = { x: e.clientX, y: e.clientY };

        if (mouseLeave.current) {
            onLeaveImplementation();
            mouseLeave.current = false;
        }
    }

    const onHoverImplementation = (index: number) => {
        const implementation = implementations[index];
        setOnHoverModifiers({
            rotation_on_hover: implementation.offset.rotation_on_hover,
            rotation_on_hover_second_leg_length_offset: implementation.offset.rotation_on_hover_second_leg_length_offset,
            mouse_position: mousePositionRef.current,
            text_display: implementation.text_display,
            index: index
        });

    };

    const onLeaveImplementation = () => {
        if (onHoverModifiers.mouse_position.x === mousePositionRef.current.x && onHoverModifiers.mouse_position.y === mousePositionRef.current.y) {
            setTimeout(() => {
                mouseLeave.current = true;
            }, 250);
            return;
        }
        setOnHoverModifiers({
            rotation_on_hover: 0,
            rotation_on_hover_second_leg_length_offset: [0, 0, 0, 0, 0, 0, 0],
            mouse_position: mousePositionRef.current,
            text_display: "",
            index: -1
        });
    }

    useEffect(() => {
        fetchProcessImplementationsData();

        window.addEventListener("mousemove", updateMousePosition);
        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        }
    }, []);

    return (
        <section className="w-full h-[800px] flex justify-center mx-auto max-w-[1329px]">
            <div className="relative ">
                <div className="h-[200px] z-30 w-full  flex flex-col items-center">


                    <div className="h-16 flex gap-4  w-max justify-center overflow-hidden  ">
                        {inView &&
                            ["How", "i", "work:"].map((word, index) => {
                                return (
                                    <h1 key={index} className={`text-[3rem] text-text ease-in-out duration-250 font-bold animate-[SlideUp_0.5s_cubic-bezier(0.29,0.98,0.29,0.99)_backwards]`}
                                        style={{
                                            animationDelay: `${((index * 0.05))}s`,
                                        }}
                                    >
                                        {word}
                                    </h1>
                                )
                            })
                        }
                    </div>
                    <div className="relative ">

                        <div className="  absolute -translate-x-1/2 flex gap-1  justify-center overflow-hidden">
                            {inView &&
                                ["It's", "not", "just", "about", "writing", "code,", "I", "consider", "multiple", "processes", "simultaneously", "in", "my", "workflow"].map((word, index) => {
                                    return (
                                        <h1 key={index} className={`text-sm text-text/50 ease-in-out duration-250 font-regular animate-[SlideUp_0.5s_cubic-bezier(0.29,0.98,0.29,0.99)_backwards]`}
                                            style={{
                                                animationDelay: `${((index * 0.025) + 0.2)}s`,
                                            }}
                                        >
                                            {word}
                                        </h1>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
                <div className="  pointer-events-none select-none">
                    <div className="relative z-10 size-max"
                        ref={ref}>
                        <div className="relative size-max z-10 ease-bouncy-1 duration-1000"
                            style={{ transform: `rotate(${onHoverModifiers.rotation_on_hover.toString()}deg)` }}
                        >
                            
                            <Polygon
                                sides={implementations.length}
                                size={400}
                                cornerRadius={16}
                                fillColor="transparent"
                                strokeColor="color-mix(in oklch, var(--color-container-soft-shadow) 50%, var(--color-container-bg))"
                                strokeWidth={10}
                                className=""

                            />
                            <div className="absolute z-10 top-0 grid place-content-center size-full  ">
                                <Polygon
                                    sides={implementations.length}
                                    size={390}
                                    fillColor="var(--color-bg)"
                                    cornerRadius={16}
                                    strokeWidth={1}
                                    strokeColor="var(--color-container-stroke)"

                                    polygonClipId="polygonClip"
                                />
                            </div>
                        </div>

                        <h1 className={`absolute z-10 duration-300 delay-100 ${onHoverModifiers.text_display == "" ? "opacity-100 " : "opacity-0 duration-0! delay-0!"} ease-bezier-in text-3xl inset-0  m-auto h-max w-[calc(100%-50px)] text-center text-text font-bold uppercase`}>
                            project requirements
                        </h1>

                        <div className=" z-20 absolute left-1.25  size-full grid place-content-center top-1.25 ease-bouncy-1 duration-1000"
                            style={{
                                clipPath: `url(#polygonClip)`,
                                '--webkit-clip-path': `url(#polygonClip)`,
                                transform: `rotate(${onHoverModifiers.rotation_on_hover.toString()}deg)`
                            } as React.CSSProperties}
                        >
                            <p className="text-center text-text/50 text-xl font-light">
                                {onHoverModifiers.text_display != "" &&
                                    <ImplementationTextReveal
                                        words={onHoverModifiers.text_display.split(" ")}
                                        interval={50}
                                        batchSize={0.1}
                                    />
                                }
                            </p>
                        </div>
                    </div>
                </div>
                {
                    implementations.map((details, i) => {
                        const offset = 90
                        const angle = ((360 / 7) * i) - offset
                        const rotationType = (angle - offset) == (offset * -2) ? "center" : (angle - offset) > 0 ? "left" : "right";
                        return (
                            <div key={i}
                                className="absolute inset-1/2 w-full  ease-bouncy-1 duration-1000  rounded-full h-1.5  origin-top-left animation-0  bg-[linear-gradient(90deg,var(--color-mixed-soft-shadow-bg)_67%,var(--color-accent-3)_68%,var(--color-accent-2)_69%,var(--color-accent-1)_71%,var(--color-mixed-soft-shadow-bg)_73%)] bg-size-[200%_200%] animate-[gradient-carousel-200_1.5s_linear_infinite_0.9s]"
                                style={{
                                    transform: `rotate(${angle + onHoverModifiers.rotation_on_hover}deg) translateY(-0.188rem)`,
                                    width: `calc(100%*${details.offset.first_leg_width_multiplier})`,
                                }}
                            >
                                <div className="absolute right-0 w-auto aspect-square h-full ">

                                    <div className="absolute inset-0 m-auto w-auto aspect-square h-full ease-bouncy-1 duration-1000 "
                                        style={{
                                            transform: `rotate(${rotationType == "center" ? -angle - 90 - onHoverModifiers.rotation_on_hover : rotationType == "left" ? -angle - 180 - onHoverModifiers.rotation_on_hover : -angle - onHoverModifiers.rotation_on_hover}deg )`
                                        }}
                                    >
                                        <div className={`absolute w-[${details.offset.second_leg_fixed_length.toString()}px] h-1.5  ease-bouncy-1 duration-1000  rounded-full  
                                        ${details.offset.second_leg_fixed_length == 156.5 ? "    bg-[linear-gradient(90deg,var(--color-mixed-soft-shadow-bg)_67%,var(--color-accent-3)_68%,var(--color-accent-2)_69%,var(--color-accent-1)_71%,var(--color-mixed-soft-shadow-bg)_73%)] bg-size-[300%_300%] animate-[gradient-carousel-300_3s_linear_infinite_0.15s]" : "bg-[linear-gradient(90deg,var(--color-mixed-soft-shadow-bg)_67%,var(--color-accent-3)_71%,var(--color-accent-2)_78%,var(--color-accent-1)_83%,var(--color-mixed-soft-shadow-bg)_93%)] bg-size-[300%_300%] animate-[gradient-carousel-200-delayed_1.5s_linear_infinite]"}  `}
                                            style={{
                                                width: (details.offset.second_leg_fixed_length + onHoverModifiers.rotation_on_hover_second_leg_length_offset[i]).toString() + "px",
                                            }} />

                                        <div className={` size-3.5 absolute rounded-full ${onHoverModifiers.index == i ? "border-accent-1! size-2! -translate-y-[0.0625rem]!  " : ""}  grid place-content-center ease-bouncy-1 duration-1000  -translate-y-1 border-4`}
                                            style={{
                                                left: ((details.offset.second_leg_fixed_length - (details.offset.second_leg_fixed_length == 0 ? -1.5 : 2.5)) + onHoverModifiers.rotation_on_hover_second_leg_length_offset[i]).toString() + "px",
                                                borderColor: "color-mix(in oklch, var(--color-container-soft-shadow) 50%, var(--color-container-bg))",
                                                // backgroundColor: "color-mix(in oklch, var(--color-container-soft-shadow) 50%, var(--color-container-bg))"
                                            }}

                                        >
                                            <div className={`w-44 text-lg  p-2  ${onHoverModifiers.index == i ? "p-4 w-48 text-accent-1! border-accent-1! border ":""} border-dashed border-text/25    rounded-lg ease-bouncy-1 duration-1000  text-text/75 font-semibold ${rotationType == "center" ? "text-center translate-x-10" : rotationType == "right" ? "text-left translate-x-24" : "text-right  translate-x-24"}`}
                                                style={{

                                                    transform: `rotate(${rotationType == "center" ? offset : rotationType == "left" ? -180 : 0}deg) ${rotationType == "center" ? " translateY(10px)" : ""}`
                                                }}
                                                onMouseEnter={() => onHoverImplementation(i)}
                                                onMouseLeave={onLeaveImplementation}
                                            >
                                                {details.type}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        )
                    })
                }



            </div>
        </section>
    )
}