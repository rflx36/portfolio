import { useEffect } from "react";
import getThemeColors from "../../utils/themeColors";
import "./anim_heart.css"







export default function AnimHeart() {

    const HeartPattern = "##98###89###9877#7789#8766565667876654545667#654333456###4332334#####32123#######101#########0#####";

    const easeOutHeart = () => {
        const heartPixelsClass = document.getElementsByClassName("heart-pixels-class");
        Array.from(heartPixelsClass).forEach(element => {
            element.classList.add("heart-pixels");
        });
    }

    useEffect(() => {
        
        setTimeout(() => {
            easeOutHeart();
        }, 1000);

    }, []);

    return (

        <div className="grid grid-cols-11 w-max gap-px mb-50">
            {
                HeartPattern.split("").map((char, index) => {

                    if (char == "#") {
                        return (
                            <div key={index} className="bg-transparent size-2" />
                        )
                    }
                    return (
                        <div
                            className={` heart-pixels-class heart-${char}  `} key={index}
                        />
                    )
                })
            }
        </div>
    )
}