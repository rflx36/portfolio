import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { useEffect, useState } from "react";

export default function NameIntroduction() {
    const [initialize, setInitialize] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setInitialize(true);
        }, 1000);

    }, [])
    const base_text_style = `absolute z-10 font-semibold delay-300 ease-bezier-in opacity-0 duration-1500 ${initialize && "opacity-100"} text-text text-[4rem]`;
    // <div className={`h-32 flex flex-wrap justify-center  ease-smooth ${initialize&&"grayscale-100"} delay-800 duration-300  `}>
    return (
        <div className="h-max flex flex-wrap justify-center mb-7">
            <div className="w-56 h-16  relative" >
                <div className="absolute z-10 left-0 h-5 w-max  overflow-hidden flex">
                    <h2 className="text-text font-semibold slide-up animate-[SlideUpFadeIn_0.3s_ease-out_backwards_0.1s] ">H</h2>
                    <h2 className="text-text font-semibold slide-up animate-[SlideUpFadeIn_0.3s_ease-out_backwards_0.13s] ">I</h2>
                    <h2 className="text-text font-semibold slide-up animate-[SlideUpFadeIn_0.3s_ease-out_backwards_0.16s] ">!</h2>
                    <div className="size-1.5" />
                    <h2 className="text-text font-semibold slide-up animate-[SlideUpFadeIn_0.3s_ease-out_backwards_0.19s] ">I</h2>
                    <h2 className="text-text font-semibold slide-up animate-[SlideUpFadeIn_0.3s_ease-out_backwards_0.21s] ">m</h2>

                </div>
                <div className="w-full h-full mt-[1.1rem] -translate-x-2 select-none pointer-events-none">
                    <DotLottieReact
                        src="/assets/name_introduction_roland.lottie"
                        autoplay
                    />
                </div>
                {/* <h1 className="absolute -z-10 top-0 font-semibold text-text opacity-100 text-[4rem]">Roland</h1> */}
            </div>
            <div className="w-40 h-16 relative ">
                {/* <h1 className={base_text_style}>Fonz</h1> */}
                <div className="w-full h-full mt-[1.1rem]  -translate-x-[0.4rem] select-none pointer-events-none">
                    <DotLottieReact
                        src="/assets/name_introduction_fonz.lottie"
                        autoplay
                    />
                </div>
                {/* <h1 className="absolute -z-10 top-0 font-semibold text-text opacity-100 text-[4rem]">Fonz</h1> */}

            </div>
            <div className="w-72 h-16 relative">
                {/* <h1 className={base_text_style}>Lamoste</h1> */}
                <div className="w-full h-full mt-[1.1rem] -translate-x-[0.7rem] select-none pointer-events-none">
                    <DotLottieReact
                        src="/assets/name_introduction_lamoste.lottie"
                        autoplay
                    />
                </div>
                {/* <h1 className="absolute -z-10 top-0 font-semibold text-text opacity-100 text-[4rem]">Lamoste</h1> */}

            </div>
        </div>
    )
}