import { useEffect, useRef, useState } from "react"
import "./contact_form.css"
import InvertedCorner from "../ui/inverted_border";
import Loader from "../ui/loader";
import { useCursor } from "../../hooks/use_cursor";



export default function ContactForm(props: { onContactSubmit: () => void }) {
    const [isFocused, setIsFocused] = useState(false);
    const [result, setResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);






    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // return;
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append("access_key", import.meta.env.VITE_FORM_ACCESS_KEY);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        if (data.success) {
            props.onContactSubmit();
        }
        setResult(data.success ? "Success" : " Error");

        setIsLoading(false);
    }

    useEffect(() => {
        const textarea = document.getElementById("message") as HTMLTextAreaElement;
        const handleInput = () => {
            textarea.classList.toggle('overflow', textarea.scrollHeight > textarea.clientHeight);
        }
        textarea.addEventListener("input", handleInput);

        return () => {
            textarea.removeEventListener("input", handleInput);
        }
    }, [])

    // const tempfunct = () => {
    //     setResult("Success");
    //     props.onContactSubmit();
    // }

    const cursorOnHover = useCursor({ type: "pointer" })
    const inputStyle = ` ease-in duration-500 focus:outline-1 -outline-offset-1 place-holder-opacity-50 text-text font-medium outline-text/50 ${result === "Success" ? "bg-none" : "bg-container-soft-shadow/50"}`

    return (

        <form className={`h-[360px] flex flex-col gap-3 aspect-video w-auto border z-10 border-container-stroke bg-bg rounded-lg p-3 ${result === "Success" && "form-container"}`} onSubmit={onSubmit}>
            {/* <div  onClick={tempfunct} className="absolute bg-red-500 size-10">
                Test
            </div> */}
            <div className="flex gap-2.5">
                <div className="flex flex-col flex-1 gap-1">
                    <label htmlFor="name" className={`ml-3 font-semibold text-sm text-text`}>Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        className={`h-9 pl-3 rounded-md ${inputStyle}`}
                        required
                        disabled={isLoading || result === "Success"}
                    />
                </div>
                <div className="flex flex-col flex-1 gap-1">
                    <label htmlFor="email" className="ml-3 font-semibold text-sm text-text">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@email.com"
                        className={`h-9 pl-3 rounded-md ${inputStyle}`}
                        required
                        disabled={isLoading || result === "Success"} />
                </div>
            </div>
            <div className="flex flex-col gap-1 grow relative">
                <label id="message-label" htmlFor="message" className="ml-3 font-semibold text-sm text-text">Message</label>
                <textarea
                    id="message"
                    className={`h-32 pr-1 grow pl-3 pt-2 rounded-t-md rounded-r-md resize-none ${inputStyle}`}
                    required
                    name="message"
                    aria-labelledby="message-label"
                    aria-multiline="true"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={isLoading || result === "Success"}
                    ref={textAreaRef}
                />


                <div
                    className="w-full flex justify-end gap-1.5 h-max pt-0.75 "
                >
                    <div
                        className={`bg-bg absolute rounded-b-md  ${result === "Success" ? "text-bg ease-in duration-500" : "text-container-soft-shadow/50"} cursor-text  h-11 bottom-0 flex left-0 w-[calc(100%-9.375rem)]`}
                        id="textarea-fill"
                        onClick={() => { textAreaRef.current?.focus() }}
                    >
                        {/* <div className="flex w-full">

                            </div> */}
                        <div className={`${result === "Success" ? "bg-none ease-in duration-500 " : "bg-container-soft-shadow/50"}  w-full rounded-b-md h-full ${isFocused ? ' border-b border-x border-text/50' : ''}`} />
                        <div className={`absolute -right-3 0 ${result === "Success" ? "opacity-0 ease-in duration-50" : "opacity-100"}`}>
                            <div className="w-3 h-px " />
                            <div className="relative"
                                style={{
                                    stroke: "color-mix(in oklch, var(--color-container-soft-shadow) 50%, var(--color-text) 50%)"
                                }}>
                                <div className="absolute  -top-px -left-px w-px h-[13px]  z-5"
                                    style={{
                                        backgroundColor: "color-mix(in oklch, var(--color-container-soft-shadow) 50%, var(--color-container-bg))"
                                    }}
                                />
                                <div className="absolute  -top-px -left-px w-[13px] h-px  z-5"
                                    style={{
                                        backgroundColor: "color-mix(in oklch, var(--color-container-soft-shadow) 50%, var(--color-container-bg))"
                                    }}
                                />
                                <InvertedCorner position="br" size={12} strokeWidth={isFocused ? 1 : 0} classNameFill="absolute z-10 fill-current " />
                            </div>

                        </div>

                    </div>
                    <button
                        type="submit"
                        disabled={isLoading || result === "Success"}
                        aria-label="Send message"
                        className={`bg-text ${result === "Success" ? "opacity-0 ease-in duration-50" : "opacity-100 "} focus:outline-accent-2  ease-in duration-150 transition-colors focus:text-accent-2 hover:bg-text/90 group flex items-center font-medium text-lg justify-center gap-1.5 text-bg w-36 h-9 rounded-md`}
                        {...(result !== "Success" && cursorOnHover)}
                    >

                        {
                            isLoading ? <Loader />
                                :
                                <>
                                    Send
                                    <svg width="17" height="15" className="fill-current group-hover:translate-x-4 ease-in duration-150" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.0176702 12.2581C-0.187962 13.8333 1.43646 15.008 2.86795 14.3192L15.6666 8.16148C16.4219 7.7981 16.4219 6.7226 15.6666 6.35922L2.86795 0.201476C1.43646 -0.487254 -0.187962 0.68742 0.0176711 2.26262L0.433832 5.45052C0.495356 5.9218 0.880098 6.28467 1.35417 6.31853L7.04082 6.72472C7.32183 6.74479 7.53955 6.97862 7.53955 7.26035C7.53955 7.54207 7.32183 7.7759 7.04082 7.79597L1.35417 8.20216C0.880097 8.23602 0.495356 8.59889 0.433833 9.07017L0.0176702 12.2581Z" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M15.6666 8.16148L2.86795 14.3192C1.43646 15.008 -0.187962 13.8333 0.0176702 12.2581L0.433833 9.07017C0.495356 8.59889 0.880097 8.23602 1.35417 8.20216L7.04082 7.79597C7.32183 7.7759 7.53955 7.54207 7.53955 7.26035C7.53955 6.97862 7.32183 6.74479 7.04082 6.72472L1.35417 6.31853C0.880098 6.28467 0.495356 5.9218 0.433832 5.45052L0.0176711 2.26262C-0.187962 0.68742 1.43646 -0.487254 2.86795 0.201476L15.6666 6.35922C16.4219 6.7226 16.4219 7.7981 15.6666 8.16148Z" />
                                    </svg>
                                </>
                        }
                    </button>

                </div>
                {/* <div className="w-max h-max pt-1.5 pl-1.5 rounded-tl-xl bg-red-500 absolute  -right-0.5 -bottom-0.5">
                        <button type="submit" className="bg-text w-36 h-9 rounded-md">
                            <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clip-rule="evenodd" d="M0.0176702 12.2581C-0.187962 13.8333 1.43646 15.008 2.86795 14.3192L15.6666 8.16148C16.4219 7.7981 16.4219 6.7226 15.6666 6.35922L2.86795 0.201476C1.43646 -0.487254 -0.187962 0.68742 0.0176711 2.26262L0.433832 5.45052C0.495356 5.9218 0.880098 6.28467 1.35417 6.31853L7.04082 6.72472C7.32183 6.74479 7.53955 6.97862 7.53955 7.26035C7.53955 7.54207 7.32183 7.7759 7.04082 7.79597L1.35417 8.20216C0.880097 8.23602 0.495356 8.59889 0.433833 9.07017L0.0176702 12.2581Z" fill="#EEEEEE" />
                                <path fillRule="evenodd" clip-rule="evenodd" d="M15.6666 8.16148L2.86795 14.3192C1.43646 15.008 -0.187962 13.8333 0.0176702 12.2581L0.433833 9.07017C0.495356 8.59889 0.880097 8.23602 1.35417 8.20216L7.04082 7.79597C7.32183 7.7759 7.53955 7.54207 7.53955 7.26035C7.53955 6.97862 7.32183 6.74479 7.04082 6.72472L1.35417 6.31853C0.880098 6.28467 0.495356 5.9218 0.433832 5.45052L0.0176711 2.26262C-0.187962 0.68742 1.43646 -0.487254 2.86795 0.201476L15.6666 6.35922C16.4219 6.7226 16.4219 7.7981 15.6666 8.16148Z" fill="#EEEEEE" />
                            </svg>
                        </button>
                    </div> */}
            </div>
        </form>

    )
}