import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { useEffect, useState } from "react";
import { nameAnimStateDefaults } from "../../constants";
import { type nameAnimStateType } from "../../types";



export default function NameIntroduction() {
    const [initialize, setInitialize] = useState<boolean>(false);
    const [nameRolandState, setnameRolandState] = useState<nameAnimStateType>(nameAnimStateDefaults);
    const [nameFonzState, setnameFonzState] = useState<nameAnimStateType>(nameAnimStateDefaults);
    const [nameLamosteState, setnameLamosteState] = useState<nameAnimStateType>(nameAnimStateDefaults);


    useEffect(() => {
        setTimeout(() => {
            setInitialize(true);
        }, 1000);

    }, [])


    const unMountName = () => {

    }

    const base_text_style = `absolute -z-10 top-0 font-semibold delay-300 select-none  pointer-events-none ease-bezier-in opacity-0 duration-1500 ${initialize && "opacity-100"} text-text text-[4rem]`;

    return (
        <div className="h-max flex flex-wrap justify-center mb-7">
            <div className="w-56 h-16  relative" >
                <div className="absolute z-10 left-0 h-5 w-max  overflow-hidden flex">
                    <h2 className="text-text font-semibold slide-up animate-[SlideUpFadeIn_0.3s_ease-out_backwards_0.1s] ">H</h2>
                    <h2 className="text-text font-semibold slide-up animate-[SlideUpFadeIn_0.3s_ease-out_backwards_0.13s] ">i</h2>
                    <h2 className="text-text font-semibold slide-up animate-[SlideUpFadeIn_0.3s_ease-out_backwards_0.16s] ">!</h2>
                    <div className="size-1.5" />
                    <h2 className="text-text font-semibold slide-up animate-[SlideUpFadeIn_0.3s_ease-out_backwards_0.19s] ">I</h2>
                    <h2 className="text-text font-semibold slide-up animate-[SlideUpFadeIn_0.3s_ease-out_backwards_0.21s] ">m</h2>
                </div>
                <h1 className="absolute z-10 top-0 font-semibold text-transparent text-[4rem] selection:bg-accent-2/25 selection:text-accent-1/75 ">Roland</h1>
                {
                    !nameRolandState.ended &&

                    <div className={`w-full h-full mt-[1.1rem] -translate-x-2 select-none pointer-events-none ${!nameRolandState.loaded && " opacity-0 "}`}>
                        <DotLottieReact
                            src="/assets/name_introduction_roland.lottie"
                            autoplay
                            dotLottieRefCallback={(dotLottie) => {
                                dotLottie?.addEventListener('play', () => setnameRolandState(x => ({ ...x, loaded: true })));
                                // dotLottie?.addEventListener('complete', () => setnameRolandState(x => ({ ...x, ended: true })));
                            }}
                        />
                    </div>
                }
                <h1 className={base_text_style}>Roland</h1>
            </div>
            <div className="w-40 h-16 relative ">
                <h1 className="absolute z-10 top-0 font-semibold text-transparent text-[4rem] selection:bg-accent-2/25 selection:text-accent-1/75">Fonz</h1>
                {
                    !nameFonzState.ended &&
                    <div className={`w-full h-full mt-[1.1rem]  -translate-x-[0.4rem] select-none pointer-events-none ${!nameFonzState.loaded && " opacity-0 "}`}>
                        <DotLottieReact
                            src="/assets/name_introduction_fonz.lottie"
                            autoplay
                            dotLottieRefCallback={(dotLottie) => {
                                dotLottie?.addEventListener('play', () => setnameFonzState(x => ({ ...x, loaded: true })));
                                // dotLottie?.addEventListener('complete', () => setnameFonzState(x => ({ ...x, ended: true })));
                            }}
                        />
                    </div>}
                <h1 className={base_text_style}>Fonz</h1>
            </div>
            <div className="w-72 h-16 relative">
                <h1 className="absolute z-10 top-0 font-semibold text-transparent text-[4rem] selection:bg-accent-2/25 selection:text-accent-1/75">Lamoste</h1>
                {
                    !nameLamosteState.ended &&
                    <div className={`w-full h-full mt-[1.1rem] -translate-x-[0.7rem] select-none pointer-events-none ${!nameLamosteState.loaded && "opacity-0 "}`}>
                        <DotLottieReact
                            src="/assets/name_introduction_lamoste.lottie"
                            autoplay
                            dotLottieRefCallback={(dotLottie) => {
                                dotLottie?.addEventListener('play', () => setnameLamosteState(x => ({ ...x, loaded: true })));
                                // dotLottie?.addEventListener('complete', () => setnameLamosteState(x => ({ ...x, ended: true })));
                            }}
                        />
                    </div>}
                <h1 className={base_text_style}>Lamoste</h1>

            </div>
        </div>
    )
}