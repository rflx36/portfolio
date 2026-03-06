import { useState } from "react";
import AnimHeart from "../ui/anim_heart";
import ContactForm from "./contact_form";
import ContactEnvelope from "./contact_envelope";





export default function ContactSection() {
    const [onSubmitState, setOnSubmitState] = useState(false);


    return (
        <div className="w-full h-[1700px] flex flex-col  justify-center items-center relative">
            <div className="w-max h-24 flex overflow-hidden mb-8 items-center justify-center gap-4">

                {
                    ["I'd", "be", "happy", "to", "connect"].map((word, index) => (
                        <h1 key={index} className="text-[4rem] text-text translate-y-1 font-semibold animate-[SlideUp_0.5s_cubic-bezier(0.29,0.98,0.29,0.99)_backwards]" style={{ animationDelay: `${((index * 0.05) + 1)}s` }}>
                            {word}
                        </h1>
                    ))
                }
            </div>
            <AnimHeart />


            <div className={
                ` 
                 p-2.5 bg-container-soft-shadow/50 duration-1200 ease-in-out my-6
                ${onSubmitState ?
                    "w-[calc(100%-4rem)] mx-auto overflow-hidden  rounded-3xl flex flex-col justify-center items-center  py-[calc(2.5%+1rem)]" :
                    "w-[calc(660px)] rounded-lg "} 
                 `}>
                <ContactForm onContactSubmit={() => { setOnSubmitState(true) }} />
            </div>
            <ContactEnvelope/>
        </div>
    )
}