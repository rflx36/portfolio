import { useState } from "react";
import AnimHeart from "../ui/anim_heart";
import ContactForm from "./contact_form";
import ContactEnvelope from "./contact_envelope";
import { useInView } from "react-intersection-observer";
import useResize from "../../hooks/use_resize";





export default function ContactSection() {
    const [onSubmitState, setOnSubmitState] = useState(false);
    const { ref, inView } = useInView({ threshold: 1, triggerOnce: true })
    const use_resize = useResize({ rerenderBarrier: [360, 578, 768] });


    return (
        <section id="contact-section-id" className="w-full h-max max-mobile:mt-24 flex flex-col  justify-center items-center relative">

            <div className="max-[426px]:hidden h-max w-max overflow-hidden flex flex-col pb-6 justify-center items-center relative">


                <div key={use_resize.currentBarrier ?? -1} className={`w-max max-[360px]:h-12 max-[578px]:h-14 max-[768px]:h-18 h-24  flex ${!onSubmitState && "overflow-hidden"} max-[768px]:mb-4 mb-8 items-center justify-center gap-4`}>
                    {
                        inView &&
                        (
                            <h1 aria-label="I'd be happy to connect" className="flex max-[360px]:gap-1  max-[578px]:gap-2 max-[768px]:gap-3 gap-4 items-center justify-center h-full">
                                {

                                    ["I'd", "be", "happy", "to", "connect"].map((word, index) => {
                                        return (

                                            <span key={index} aria-hidden="true" className={`   max-[578px]:text-[2.25rem] max-[768px]:text-[3rem] text-[4rem]   text-text ${onSubmitState ? "translate-y-52 opacity-0" : "translate-y-1"}  ease-in-out duration-250 font-semibold animate-[SlideUp_0.5s_cubic-bezier(0.29,0.98,0.29,0.99)_backwards]`}
                                                style={{
                                                    animationDelay: `${((index * 0.05) + 1)}s`,
                                                    transitionDelay: `${((index * 0.05) + 1.75)}s`
                                                }}
                                            >
                                                {word}
                                            </span>

                                        )
                                    })
                                }
                            </h1>
                        )
                    }
                </div>
                <AnimHeart
                    animationState={inView ? (onSubmitState ? "transformed" : "initialized") : "idle"}
                />


            </div>

            <div className="not-max-[426px]:hidden h-52 w-[calc(100%-4rem)] mx-auto overflow-hidden flex flex-col pb-6 relative">
                {
                    inView &&
                    (
                        <h1 aria-label="I'd be happy to connect" className=" text-[3rem] leading-12">
                            <span className={`h-max ${!onSubmitState && "overflow-hidden"}  flex gap-2`}>
                                {
                                    ["I'd", "be"].map((word, index) => {
                                        return (
                                            <span key={index} aria-hidden="true" className={`text-text  ${onSubmitState ? "translate-y-52 opacity-0" : "translate-y-1"} ease-in-out duration-250 font-semibold animate-[SlideUp_0.5s_cubic-bezier(0.29,0.98,0.29,0.99)_backwards]`}
                                                style={{
                                                    animationDelay: `${((index * 0.05) + 1)}s`,
                                                    transitionDelay: `${((index * 0.05) + 1.75)}s`
                                                }}
                                            >
                                                {word}
                                            </span>

                                        )
                                    })
                                }
                            </span>
                            <span className={`h-16 ${!onSubmitState && "overflow-hidden"} flex  `}>
                                <span aria-hidden="true" className={`text-text ${onSubmitState ? "translate-y-48 opacity-0" : "translate-y-1"} ease-in-out duration-250 font-semibold animate-[SlideUp_0.5s_cubic-bezier(0.29,0.98,0.29,0.99)_backwards]`}
                                    style={{
                                        animationDelay: `${((2 * 0.05) + 1)}s`,
                                        transitionDelay: `${((2 * 0.05) + 1.75)}s`
                                    }}>
                                    happy
                                </span>
                            </span>
                            <span className={`h-max ${!onSubmitState && "overflow-hidden"}  -translate-y-3 flex gap-2`}>
                                {
                                    ["to", "connect"].map((word, index) => {
                                        return (
                                            <span key={index} aria-hidden="true" className={`text-text  ${onSubmitState ? "translate-y-40 opacity-0" : "translate-y-1"} ease-in-out duration-250 font-semibold animate-[SlideUp_0.5s_cubic-bezier(0.29,0.98,0.29,0.99)_backwards]`}
                                                style={{
                                                    animationDelay: `${(((index + 4) * 0.05) + 1)}s`,
                                                    transitionDelay: `${(((index + 4) * 0.05) + 1.75)}s`
                                                }}
                                            >
                                                {word}
                                            </span>

                                        )
                                    })
                                }
                            </span>

                        </h1>
                    )
                }
                <div className={`absolute ease-in-out w-max   delay-2000 duration-300 left-0 mx-auto right-0 top-4 ${onSubmitState ? "translate-y-20" : "translate-x-20 "}`}>
                    <AnimHeart
                        animationState={inView ? (onSubmitState ? "transformed" : "initialized") : "idle"}
                    />
                </div>

            </div>
            <div className={
                ` p-2.5 bg-container-soft-shadow/50 duration-1200 ease-in-out mb-6 relative overflow-hidden 
                ${onSubmitState ?
                    "w-[calc(100%-4rem)]   max-mobile-tablet-threshold:w-[calc(100%-2rem)] mx-auto  rounded-3xl flex flex-col justify-center items-center  py-[calc(2.5%+1rem)]" :
                    "w-[calc(660px)] rounded-lg  max-mobile-tablet-threshold:w-[calc(100%-2rem)] max-mobile-tablet-threshold:mx-auto max-mobile-tablet-threshold:duration-0 "} 
                 `}
                ref={ref}
            >
                {
                    onSubmitState &&

                    <div className=" absolute z-30 w-max flex gap-4 items-center justify-center -translate-y-4 h-full">
                        <h1 aria-label="Thank you for reaching out" className="max-[500px]:hidden flex gap-4 max-[578px]:gap-2 max-[768px]:gap-3 items-center justify-center h-full">

                            {
                                ["Thank", "you", "for", "reaching", "out"].map((word, index) => (
                                    <span aria-hidden="true" key={index} className="text-[4rem]     max-[56rem]:text-[3.5rem] max-[52rem]:text-[2.75rem] max-[37rem]:text-[2.25rem] max-[31.25rem]-text-[1.75rem] text-text font-semibold  animate-[SlideDown3_0.45s_cubic-bezier(0.23,0.94,0.27,0.93)_backwards]"
                                        style={{
                                            animationDelay: `${((index * 0.05) + 1.9)}s`
                                        }}
                                    >
                                        {word}
                                    </span>
                                ))
                            }
                        </h1>
                        <h1 aria-label="Thank you for reaching out" className="text-[3rem] text-text font-semibold not-max-[500px]:hidden flex flex-col  justify-center h-full">
                            <span className="flex gap-2">
                                {
                                    ["Thank", "you","!"].map((word, index) => {
                                        return (
                                            <span key={index} aria-hidden="true" className=" animate-[SlideDown3_0.45s_cubic-bezier(0.23,0.94,0.27,0.93)_backwards]"
                                                style={{
                                                    animationDelay: `${((index * 0.05) + 1.9)}s`
                                                }}>
                                                {word}
                                            </span>
                                        )
                                    })
                                }
                            </span>

                            {/* <span aria-hidden="true" className="animate-[SlideDown3_0.45s_cubic-bezier(0.23,0.94,0.27,0.93)_backwards]"
                                style={{
                                    animationDelay: `${((2 * 0.05) + 1.9)}s`
                                }}>
                                for
                            </span> */}

                        </h1>
                    </div>

                }

                <ContactForm onContactSubmit={() => { setOnSubmitState(true) }} />

                <ContactEnvelope
                    transition_initialized={onSubmitState}
                />

            </div>
        </section>
    )
}