import AnimHeart from "../ui/anim_heart";
import ContactForm from "./contact_form";





export default function ContactSection() {
    return (
        <div className="w-full h-[1700px] flex flex-col gap-8 justify-center items-center relative">
            <div className="w-max h-24 flex overflow-hidden items-center justify-center gap-4">

                {
                    ["I'd", "be", "happy", "to", "connect"].map((word, index) => (
                        <h1 key={index} className="text-[4rem] text-text translate-y-1 font-semibold animate-[SlideUp_0.5s_cubic-bezier(0.29,0.98,0.29,0.99)_backwards]" style={{ animationDelay: `${((index * 0.05) + 1)}s` }}>
                            {word}
                        </h1>
                    ))
                }
            </div>
            <AnimHeart />
            <ContactForm />
            

        </div>
    )
}