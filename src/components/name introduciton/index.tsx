import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { useEffect, useRef, useState } from "react";
import { nameAnimStateDefaults } from "../../constants";
import { type nameAnimStateType } from "../../types/types";



export default function NameIntroduction() {
    const [initialize, setInitialize] = useState<boolean>(false);
    const [nameRolandState, setnameRolandState] = useState<nameAnimStateType>(nameAnimStateDefaults);
    const [nameFonzState, setnameFonzState] = useState<nameAnimStateType>(nameAnimStateDefaults);
    const [nameLamosteState, setnameLamosteState] = useState<nameAnimStateType>(nameAnimStateDefaults);
    const dotLottieRefs = useRef<Array<any>>([]);
    const initialWidth = useRef(window.innerWidth);


    useEffect(() => {
        const nameInitialize = setTimeout(() => {
            setInitialize(true);
        }, 1000);






        return () => {
            clearTimeout(nameInitialize);
        }
    }, [])

    useEffect(() => {
        if (dotLottieRefs.current.length < 3 && initialWidth.current <= 430) {
            return;
        }

        const animationInitialize = setTimeout(() => {
            dotLottieRefs.current?.forEach(dotlottie => {
                dotlottie.play();
            })
        }, 10);

        return () => {
            clearTimeout(animationInitialize);
        }
    }, [dotLottieRefs.current.length])


    const handleDotLottieRef = (index: number, dotLottie: any) => {
        dotLottieRefs.current.push(dotLottie);


        const handlePlay = () => {
            switch (index) {
                case 0:
                    setnameRolandState(x => ({ ...x, loaded: true }));

                    break;
                case 1:
                    setnameFonzState(x => ({ ...x, loaded: true }));
                    break;
                case 2:
                    setnameLamosteState(x => ({ ...x, loaded: true }));
                    break;
            }
        }

        const handleComplete = () => {

            dotLottie?.removeEventListener("play", handlePlay);
            dotLottie?.removeEventListener("complete", handleComplete);
        }

        dotLottie?.addEventListener("play", handlePlay);
        dotLottie?.addEventListener("complete", handleComplete);

    }


    const base_text_style = `absolute -z-10 top-0 font-semibold delay-300 select-none  pointer-events-none ease-bezier-in opacity-0 duration-1500 ${initialize && "opacity-100"} text-text text-[4rem]`;

    return (
        <div className="h-max flex flex-wrap  max-mobile:justify-start  max-mobile:w-74 max-mobile:translate-x-4  justify-center mb-7">
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

                    <div className={`w-full h-full mt-[1.1rem] -translate-x-2 select-none  pointer-events-none ${!nameRolandState.loaded ? " opacity-0 " : ""}`}>
                        <DotLottieReact
                            src="/assets/name_introduction_roland.lottie"
                            autoplay={(initialWidth.current > 430)}
                            dotLottieRefCallback={(dotLottie) => {
                                handleDotLottieRef(0, dotLottie);
                                // const handlePlay = () => {
                                //     setnameRolandState(x => ({ ...x, loaded: true }));
                                // }
                                // const handleComplete = () => {

                                //     dotLottie?.removeEventListener("play", handlePlay);
                                //     dotLottie?.removeEventListener("complete", handleComplete);
                                // }

                                // dotLottie?.addEventListener("play", handlePlay);
                                // dotLottie?.addEventListener("complete", handleComplete);


                                // dotLottie?.addEventListener('complete', () => setnameRolandState(x => ({...x, ended: true })));
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
                    <div className={`w-full h-full mt-[1.1rem]  -translate-x-[0.4rem]  select-none pointer-events-none ${!nameFonzState.loaded ? " opacity-0 " : ""}`}>
                        <DotLottieReact
                            src="/assets/name_introduction_fonz.lottie"
                            autoplay={(initialWidth.current > 430)}
                            dotLottieRefCallback={(dotLottie) => {
                                handleDotLottieRef(1, dotLottie);

                                // const handlePlay = () => {
                                //     setnameFonzState(x => ({ ...x, loaded: true }));
                                // }
                                // const handleComplete = () => {

                                //     dotLottie?.removeEventListener("play", handlePlay);
                                //     dotLottie?.removeEventListener("complete", handleComplete);
                                // }

                                // dotLottie?.addEventListener("play", handlePlay);
                                // dotLottie?.addEventListener("complete", handleComplete);
                            }}
                        />
                    </div>}
                <h1 className={base_text_style}>Fonz</h1>
            </div>
            <div className="w-72 h-16 relative">
                <h1 className="absolute z-10 top-0 font-semibold text-transparent text-[4rem] selection:bg-accent-2/25 selection:text-accent-1/75">Lamoste</h1>
                {
                    !nameLamosteState.ended &&
                    <div className={`w-full h-full mt-[1.1rem]  -translate-x-[0.7rem]    select-none pointer-events-none ${!nameLamosteState.loaded ? "opacity-0 " : ""}`}>
                        <DotLottieReact
                            src="/assets/name_introduction_lamoste.lottie"
                            autoplay={(initialWidth.current > 430)}
                            dotLottieRefCallback={(dotLottie) => {
                                handleDotLottieRef(2, dotLottie);

                                // const handlePlay = () => {
                                //     setnameLamosteState(x => ({ ...x, loaded: true }));
                                // }
                                // const handleComplete = () => {

                                //     dotLottie?.removeEventListener("play", handlePlay);
                                //     dotLottie?.removeEventListener("complete", handleComplete);
                                // }

                                // dotLottie?.addEventListener("play", handlePlay);
                                // dotLottie?.addEventListener("complete", handleComplete);
                                // dotLottie?.addEventListener('complete', () => setnameLamosteState(x => ({ ...x, ended: true })));
                            }}
                        />
                    </div>}
                <h1 className={base_text_style}>Lamoste</h1>

            </div>
        </div>
    )
}