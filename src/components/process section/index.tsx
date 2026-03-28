
import Polygon from "../ui/pentagon";

import "./process_section_hover.css"
import React, { useEffect, useRef, useState } from "react";
import type { processImplementationDetailsType } from "../../types/types";


export default function ProcessSection() {
    const [implementations, setImplementations] = useState<processImplementationDetailsType[]>([]);

    const [onHoverModifiers, setOnHoverModifiers] = useState({
        rotation_on_hover: 0,
        rotation_on_hover_second_leg_length_offset: [0, 0, 0, 0, 0, 0, 0],
        mouse_position: { x: 0, y: 0 },
        text_display: "",
    });
    const mousePositionRef = useRef({ x: 0, y: 0 });

    const fetchProcessImplementationsData = async () => {
        const response = await fetch("/process_implementations.json");
        const data = await response.json();
        setImplementations(data);
    }

    const updateMousePosition = (e: MouseEvent) => {
        mousePositionRef.current = { x: e.clientX, y: e.clientY };
    }

    useEffect(() => {
        fetchProcessImplementationsData();


        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        }
    }, []);



    const onHoverImplementation = (index: number) => {


        const implementation = implementations[index];
        setOnHoverModifiers({
            rotation_on_hover: implementation.offset.rotation_on_hover,
            rotation_on_hover_second_leg_length_offset: implementation.offset.rotation_on_hover_second_leg_length_offset,
            mouse_position: mousePositionRef.current,
            text_display: implementation.text_display
        });

    };

    const onLeaveImplementation = () => {

        if (onHoverModifiers.mouse_position.x === mousePositionRef.current.x && onHoverModifiers.mouse_position.y === mousePositionRef.current.y) {
            return;
        }




        setOnHoverModifiers({
            rotation_on_hover: 0,
            rotation_on_hover_second_leg_length_offset: [0, 0, 0, 0, 0, 0, 0],
            mouse_position: mousePositionRef.current,
            text_display: ""
        });

    }

    return (
        <section className="w-full h-[800px] flex justify-center mx-auto max-w-[1329px]">
            <div className="relative  polygon-container ">
                <div className="mt-[200px]  pointer-events-none select-none">
                    <div className="relative z-10 size-max">
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
                        <h1 className="absolute z-10  text-3xl inset-0 m-auto h-max w-[calc(100%-50px)] text-center text-text font-bold uppercase">
                            project requirements
                        </h1>
                        <div className=" z-20 absolute left-1.25  size-full grid place-content-center top-1.25 ease-bouncy-1 duration-1000"
                            style={{
                                clipPath: `url(#polygonClip)`,
                                '--webkit-clip-path': `url(#polygonClip)`,
                                transform: `rotate(${onHoverModifiers.rotation_on_hover.toString()}deg)`
                            } as React.CSSProperties}
                        >
                            <p className="text-center text-text/50 text-xl">
                                {onHoverModifiers.text_display}
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
                                className="absolute inset-1/2 w-full group  ease-bouncy-1 duration-1000 polygon-leg rounded-full h-1.5  origin-top-left animation-0  bg-[linear-gradient(90deg,var(--color-mixed-soft-shadow-bg)_67%,var(--color-accent-3)_68%,var(--color-accent-2)_69%,var(--color-accent-1)_71%,var(--color-mixed-soft-shadow-bg)_73%)] bg-size-[300%_300%] animate-[gradient-carousel_3s_linear_infinite_2s]"
                                style={{
                                    transform: `rotate(${angle + onHoverModifiers.rotation_on_hover}deg) translateY(-0.188rem)`,
                                    width: `calc(100%*${details.offset.first_leg_width_multiplier})`,

                                    // backgroundColor: "color-mix(in oklch, var(--color-container-soft-shadow) 50%, var(--color-container-bg))"
                                }}


                            >
                                <div className="absolute right-0 w-auto aspect-square h-full ">

                                    <div className="absolute inset-0 m-auto w-auto aspect-square h-full ease-bouncy-1 duration-1000 "
                                        style={{
                                            // transform: `rotate(${50}deg)`
                                            // transform: `rotate(${-angle}deg)`,
                                            transform: `rotate(${rotationType == "center" ? -angle - 90 - onHoverModifiers.rotation_on_hover : rotationType == "left" ? -angle - 180 - onHoverModifiers.rotation_on_hover : -angle - onHoverModifiers.rotation_on_hover}deg )`
                                        }}
                                    >
                                        <div className={`absolute w-[${details.offset.second_leg_fixed_length.toString()}px] h-1.5  ease-bouncy-1 duration-1000   rounded-full  bg-[linear-gradient(90deg,var(--color-mixed-soft-shadow-bg)_67%,var(--color-accent-3)_68%,var(--color-accent-2)_69%,var(--color-accent-1)_71%,var(--color-mixed-soft-shadow-bg)_73%)] bg-size-[300%_300%] animate-[gradient-carousel_3s_linear_infinite] `}
                                            style={{
                                                width: (details.offset.second_leg_fixed_length + onHoverModifiers.rotation_on_hover_second_leg_length_offset[i]).toString() + "px",
                                            }} />

                                        <div className=" size-3.5 absolute rounded-full group-hover:border-accent-2!   grid place-content-center ease-bouncy-1 duration-1000  -translate-y-1 border-4"
                                            style={{
                                                left: ((details.offset.second_leg_fixed_length - (details.offset.second_leg_fixed_length == 0 ? -1.5 : 2.5)) + onHoverModifiers.rotation_on_hover_second_leg_length_offset[i]).toString() + "px",
                                                borderColor: "color-mix(in oklch, var(--color-container-soft-shadow) 50%, var(--color-container-bg))"
                                            }}
                                            onMouseEnter={() => onHoverImplementation(i)}
                                            onMouseLeave={onLeaveImplementation}
                                        >
                                            <div className={`w-44 text-xl  p-2 group-hover:p-5  group-hover:border border-dashed border-container-stroke    rounded-lg ease-bouncy-1 duration-1000  text-text font-semibold ${rotationType == "center" ? "text-center translate-x-10" : rotationType == "right" ? "text-left translate-x-24" : "text-right  translate-x-24"}`}
                                                style={{

                                                    transform: `rotate(${rotationType == "center" ? offset : rotationType == "left" ? -180 : 0}deg)`
                                                }}
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