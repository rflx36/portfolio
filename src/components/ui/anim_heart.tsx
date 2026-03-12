import { useEffect } from "react";
import "./anim_heart.css"
import type { heartAnimActiveStateType } from "../../types/types";








export default function AnimHeart(props: {
    animationState: heartAnimActiveStateType
}) {

    const HeartPattern = "##98###89###9877#7789#8766565667876654545667#654333456###4332334#####32123#######101#########0#####";
    const SmilePattern = "##98###89###9877#7789#876-565-67876-5-5-5-67#654333456###4-----4#####32123#######101#########0#####";


    const easeInHeart = () => {
        const heartPixelsClass = document.getElementsByClassName("heart-pixels-class");
        Array.from(heartPixelsClass).forEach(element => {
            element.classList.add("heart-pixels");
        });
    }

    useEffect(() => {

        if (props.animationState == "initialized") {
            setTimeout(() => {
                easeInHeart();
            }, 1000);
        }

    }, [props.animationState]);

    const pattern = props.animationState == "transformed" ? SmilePattern:HeartPattern;

    return (

        <div className="grid grid-cols-11 w-max gap-px ">
            {
                pattern.split("").map((char, index) => {

                    if (char == "#" || props.animationState == "idle") {
                        return (
                            <div key={index} className="bg-transparent size-2" />
                        )
                    }
                    return (
                        <div
                            className={` heart-pixels-class  ${props.animationState == "transformed" ? `heart-${char}-out bg-text!`: `heart-${char} `}  `} key={index}
                        />
                    )
                })
            }
        </div>
    )
}