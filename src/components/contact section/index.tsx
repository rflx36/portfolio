import { useState } from "react";
import AnimHeart from "../ui/anim_heart";
import ContactForm from "./contact_form";
import ContactEnvelope from "./contact_envelope";
import { useInView } from "react-intersection-observer";





export default function ContactSection() {
    const [onSubmitState, setOnSubmitState] = useState(false);
    const { ref, inView } = useInView({ threshold: 1, triggerOnce: true })

    return (
        <div className="w-full h-screen min-h-max max-h-[1000px]  flex flex-col  justify-center items-center relative">
            <div className="h-max w-max overflow-hidden flex flex-col pb-6 justify-center items-center relative">


                <div className={`w-max h-24 flex ${!onSubmitState && "overflow-hidden"} mb-8 items-center justify-center gap-4`}>

                    {
                        inView &&
                        ["I'd", "be", "happy", "to", "connect"].map((word, index) => {
                            return (
                                <h1 key={index} className={`text-[4rem] text-text ${onSubmitState ? "translate-y-52 opacity-0" : "translate-y-1"}  ease-in-out duration-250 font-semibold animate-[SlideUp_0.5s_cubic-bezier(0.29,0.98,0.29,0.99)_backwards]`}
                                    style={{
                                        animationDelay: `${((index * 0.05) + 1)}s`,
                                        transitionDelay: `${((index * 0.05) + 1.75)}s`
                                    }}
                                >
                                    {word}
                                </h1>
                            )
                        })
                    }
                </div>
                <AnimHeart
                    animationState={inView ? (onSubmitState ? "transformed" : "initialized") : "idle"}
                />


            </div>


            <div className={
                ` p-2.5 bg-container-soft-shadow/50 duration-1200 ease-in-out mb-6 relative
                ${onSubmitState ?
                    "w-[calc(100%-4rem)] mx-auto overflow-hidden  rounded-3xl flex flex-col justify-center items-center  py-[calc(2.5%+1rem)]" :
                    "w-[calc(660px)] rounded-lg "} 
                 `}
                ref={ref}
            >
                {
                    onSubmitState &&
                    <div className="absolute z-30 w-max flex gap-4 items-center justify-center -translate-y-4 h-full">
                        {
                            ["Thank", "you", "for", "reaching", "out"].map((word, index) => (
                                <h1 key={index} className="text-[4rem] text-text font-semibold  animate-[SlideDown3_0.45s_cubic-bezier(0.23,0.94,0.27,0.93)_backwards]"
                                    style={{
                                        animationDelay: `${((index * 0.05) + 1.9)}s`
                                    }}
                                >
                                    {word}
                                </h1>
                            ))
                        }
                    </div>
                }

                <ContactForm onContactSubmit={() => { setOnSubmitState(true) }} />

                <ContactEnvelope
                    transition_initialized={onSubmitState}
                />

            </div>


        </div>
    )
}