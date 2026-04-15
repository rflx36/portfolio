import { useEffect, useState } from "react"
import { useCursor } from "../../../hooks/use_cursor";




export default function LandingContacts() {
    const [githubData, setGithubData] = useState()



    const fetchGithubData = async () => {
        const response = await fetch("https://api.github.com/users/rflx36");
        const data = await response.json();
        setGithubData(data);
    }

    useEffect(() => {
        fetchGithubData();
        console.log(githubData);
    }, []);

    const cursorOnHoverCV = useCursor({ tooltip: 'Download Resume', type: "pointer" })

    const cursorOnHoverGithub = useCursor({ tooltip: `github`, type: "pointer" })

    const cursorOnHoverEmail = useCursor({ tooltip: "Copy to clipboard", type: "pointer" })
    return (
        <div className="flex max-mobile:flex-col max-mobile:flex max-mobile:mx-auto max-mobile:w-max max-[820px]:grid max-[820px]:grid-cols-2  w-[calc(100%-4rem)] mx-8  justify-evenly ">
            <div className="size-max  overflow-hidden">
                <div className="  animate-[SlideUp_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.6s] flex gap-3 p-2 font-semibold text-xs ease-bezier-in duration-50  items-center text-text/50 hover:text-accent-1">
                    <div className="w-3 h-auto grid place-content-center ">
                        <svg className="fill-current" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4 0C1.79086 0 0 1.79086  0 4C0 5.69958 4 13.7036 4 13.7036C4 13.7036 8 5.69958 8 4C8 1.79086 6.20914 0 4 0ZM4 5.69958C4.82843 5.69958 5.5 5.02801 5.5 4.19958C5.5 3.37116 4.82843 2.69958 4 2.69958C3.17157 2.69958 2.5 3.37116 2.5 4.19958C2.5 5.02801 3.17157 5.69958 4 5.69958Z" />
                        </svg>
                    </div>
                    <p className="text-current">Based in Rizal, Philippines</p>
                </div>
            </div>
            <div className="size-max  overflow-hidden">

                <button      {...cursorOnHoverCV} className=" outline-none focus:text-accent-1 animate-[SlideUp_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.7s] flex gap-3 p-2 font-semibold text-xs ease-bezier-in duration-50 cursor-none items-center text-text/50 hover:text-accent-1">
                    <div className="w-3 h-auto grid place-content-center ">

                        <svg className="fill-current" width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 11C0 11.5523 0.447715 12 1 12H8C8.55228 12 9 11.5523 9 11V3.5H5.0625V0H1C0.447715 0 0 0.447715 0 1V11ZM9 3L5.625 0V3H9Z" />
                        </svg>
                    </div>

                    <p className="text-current">Download Resume</p>
                </button>
            </div>
            <div className="size-max  overflow-hidden">

                <button {...cursorOnHoverGithub} className=" outline-none focus:text-accent-1 animate-[SlideUp_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.8s] flex gap-3 p-2 font-semibold text-xs ease-bezier-in duration-50 cursor-pointer items-center text-text/50 hover:text-accent-1">
                    <div className="w-3 h-auto grid place-content-center ">

                        <svg className="fill-current" width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.90491 12.2076C3.90491 12.3968 3.79063 12.6147 3.4942 12.6147H8.27277C7.97634 12.6147 7.86563 12.3968 7.86563 12.204C7.86563 11.9361 7.87634 11.0504 7.87634 9.95399C7.87634 9.1897 7.6192 8.6897 7.33349 8.43613C9.11563 8.23256 10.9871 7.5397 10.9871 4.3897C10.9871 3.49685 10.6763 2.76471 10.1656 2.18971C10.2478 1.98256 10.5228 1.14685 10.0871 0.0182773C10.0286 0.00429225 9.96854 -0.00171464 9.90849 0.000420201C9.6192 0.000420201 8.96563 0.111134 7.88706 0.861134C6.57651 0.494459 5.19046 0.494459 3.87991 0.861134C2.80134 0.111134 2.14777 0.000420201 1.85849 0.000420201C1.79843 -0.00171464 1.73836 0.00429225 1.67991 0.0182773C1.2442 1.14685 1.5192 1.98256 1.60134 2.18971C1.09063 2.76113 0.779914 3.49328 0.779914 4.3897C0.779914 7.53256 2.64777 8.23613 4.42277 8.44327C4.1942 8.65042 3.98706 9.01113 3.91563 9.5397C3.62933 9.67464 3.31778 9.74766 3.00134 9.75399C2.52277 9.75399 1.98706 9.55756 1.58706 8.85756C1.58706 8.85756 1.16563 8.07899 0.362057 8.00756H0.358486C0.304914 8.00756 -0.387943 8.02185 0.308486 8.51113C0.308486 8.51113 0.833485 8.7647 1.19777 9.71113C1.19777 9.71113 1.54777 10.9076 3.08706 10.9076C3.35885 10.9055 3.62957 10.8732 3.8942 10.8111C3.89777 11.4968 3.90491 12.0111 3.90491 12.2076Z" />
                        </svg>
                    </div>

                    <p className="text-current">github.com/rflx36</p>
                </button>
            </div>
            <div className="size-max  overflow-hidden">

                <button {...cursorOnHoverEmail} className=" outline-none focus:text-accent-1 animate-[SlideUp_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both_2.9s] flex gap-3 p-2  font-semibold text-xs ease-bezier-in duration-50 cursor-pointer items-center text-text/50 hover:text-accent-1">
                    <div className="w-3 h-auto grid place-content-center translate-x-px">

                        <svg className="fill-current" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M11 8C11.5523 8 12 7.55228 12 7V0.8L6 4.4L0 0.8V7C0 7.55228 0.447715 8 1 8H11ZM0 0L6 3.5L12 0H0Z" />
                        </svg>
                    </div>


                    <p className="text-current ">rolandfonzlamoste3608@gmail.com</p>
                </button>
            </div>

        </div>

    )
}