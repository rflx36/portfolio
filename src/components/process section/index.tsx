import { useEffect, useRef, useState } from "react";
import Polygon from "../ui/pentagon";




export default function ProcessSection() {



    const implementations =
        [{
            type: "Research",
            offset: [0.575, 0]
        },
        {
            type: "User Experience",
            offset: [0.75, 36]
        },
        {
            type: "AI Assisted",
            offset: [0.6, 36]
        },
        {
            type: "Optimization",
            offset: [0.65, 168]
        },
        {
            type: "Testing",
            offset: [0.65, 168]
        },
        {
            type: "Security",
            offset: [0.6, 36]
        },
        {
            type: "Scalability and Maintainability",
            offset: [0.75, 36]
        }];

    const rotationOffset = 90;


    return (
        <div className="w-full flex justify-center mx-auto max-w-[1329px]">
            <div className="relative ">

                <Polygon
                    sides={7}
                    size={400}
                    cornerRadius={16}
                    fillColor="var(--color-container-bg)"
                    strokeColor="var(--color-container-soft-shadow)"
                    strokeWidth={10}
                />













                {/*                 
                {
                    [...Array(7)].map((_, i) => {
                        const angle = (360 / 7) * i
                        return (
                            <div key={i} className={`absolute inset-1/2 h-px w-full bg-blue-500 origin-top-left`}
                                style={{
                                    transform: `rotate(${angle}deg)`,
                                }}
                            />
                        )
                    })
                } */}

                {/*                 
                <div className="absolute inset-1/2 origin-top-left rotate-[calc(((360deg/7)*2)-90deg)] h-2.5 w-full bg-blue-500">
                    <div className="absolute right-0 rotate size-10 bg-green-500" />
                </div> */}
                {/* {
                    implementations.map((text, i) => {
                        const angleDeg = (360 / implementations.length) * i + rotationOffset;
                        const angleRad = (angleDeg * Math.PI) / 180;
                        const armEndX = 200 * Math.cos(angleRad);
                        const armEndY = 200 * Math.sin(angleRad);
                        console.log(
                            "angleDeg:" + angleDeg +
                            "angleRad:" + angleRad +
                            "armEndX:" + armEndX +
                            "armEndY:" + armEndY
                        );

                        return (
                            <></>
                        )
                    })
                } */}
                {
                    implementations.map((details, i) => {
                        const offset = 90
                        const angle = ((360 / 7) * i) - offset
                        // const pre_
                        const r = 400;
                        const theta = angle * Math.PI / 180
                        const safeRadius = r * Math.sin(Math.abs(angle));

                        const t = Math.abs(Math.sin((angle * 2) * Math.PI / 180));
                        const value = Math.round(t * 1000) / 1000
                        const safeWidth = (r / 2) + ((r / 2) * value);
                        return (
                            <div key={i}
                                className="absolute -z-10  inset-1/2 w-full  h-1.5 bg-[linear-gradient(90deg,#D9D9D9_67%,#FFFB43_70%,#FF839F_75%,#B05BF0_79%,#D9D9D9_86%)] bg-size-[200%_200%] animate-gradient-carousel origin-top-left"
                                style={{
                                    transform: `rotate(${angle}deg) translateY(-0.188rem)`,
                                    width: `calc(100%*${details.offset[0]})`

                                    // width: adjustedRadius
                                }}
                            >
                                <div className="absolute right-0 origin-top-right "
                                    style={{
                                        // transform: `rotate(${-angle}deg)`,
                                        transform: `rotate(${(angle - offset) == (offset * -2) ? -angle - 90 : (angle - offset) > 0 ? -angle - 180 : -angle}deg )`
                                    }}
                                >
                                    <div className={`absolute w-[${details.offset[1].toString()}px] h-10 bg-red-500`}
                                    style={{
                                        width: details.offset[1].toString() + "px"
                                    }}>
                                        {/* {details.type} */}
                                        {/* {details.offset[1]} */}
                                    </div>
                                    {/* <div className={`absolute ${(angle - offset) == (offset * -2) ? "bg-green-500" : (angle - offset) > 0 ? "bg-red-500" : "bg-blue-500"} `}>
                                        <div className="w-50 h-1.5 bg-container-soft-shadow/50">
                                            <p>{safeWidth}</p>
                                            {angle + offset}
                                        </div>
                                    </div> */}
                                    {/* <div className="absolute w-10 h-1.5 bg-container-soft-shadow origin-top-left"/> */}
                                    {/* <div className="absolute size-20 bg-red-500/50">
                                        <p>
                                            Text {angle % 90 == 0 ? "center" : angle > 90 ? "left" : " right"}
                                            <br />
                                            width:{Math.round(safeRadius)}
                                            <br></br>
                                            adjustedWidth:{Math.round(adjustedRadius)}
                                            <br />
                                            sin:{Math.sin(angle + offset)}
                                            <br />
                                            cos:{Math.cos(angle + offset)}
                                            <br />
                                            angle:{angle}
                                            <br />
                                            value:{value}
                                            <br />
                                            safeWidth:{safeWidth}
                                        </p>
                                    </div> */}
                                </div>
                            </div>

                        )
                    })
                }



            </div>
        </div>
    )
}