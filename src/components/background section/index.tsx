import { useEffect, useState } from "react";
import { backgroundActiveStateDefaults, backgroundDataDefaults } from "../../constants";
import type { backgroundActiveStateType, backgroundDataType } from "../../types/types";
import BackgroundCard from "./background_card";
import { useCursor } from "../../hooks/use_cursor";
import { useCursorStore } from "../../stores/cursor_store";




export default function BackgroundSection() {

    const [backgroundActiveState, setBackgroundActiveState] = useState<backgroundActiveStateType>(backgroundActiveStateDefaults);
    const [backgroundDataState, setBackgroundDataState] = useState<backgroundDataType>(backgroundDataDefaults);
    const [backgroundDockState, setBackgroundDockState] = useState<boolean>(false);
    const cursor = useCursorStore();
    const fetchBackgroundData = async () => {
        const response = await fetch("/background.json");
        const data = await response.json();

        const formattedData: backgroundDataType = {
            education: data.Education,
            work: data.Experience,
            isLoaded: true,
        }

        setBackgroundDataState(formattedData);
        console.log(formattedData)
    }
    useEffect(() => {
        fetchBackgroundData();
    }, []);


    const handleBackgroundActiveState = (state: backgroundActiveStateType) => {
        setBackgroundActiveState(state);
        cursor.get.type = "default";
        cursor.set();
    }

    const handleBackgroundDockState = (state: boolean) => {
        setBackgroundDockState(state);
        cursor.get.type = "default";
        cursor.set();
    }


    const cursorOnHover = useCursor({ type: "pointer" })
    return (
        <section className="w-full flex flex-col items-center min-h-max h-screen max-h-[700px]">

            <h1 className="font-bold text-xl uppercase text-text mb-10"></h1>
            <div className="w-full flex gap-8 mt-5">
                <div className=" w-[calc(100%-2rem)] mx-auto max-w-185 flex flex-col gap-8 ">
                    <div className="flex mx-auto w-full max-w-100 gap-4 bg-container-soft-shadow/50 p-1 rounded-full overflow-hidden">
                        <button
                            onClick={() => handleBackgroundActiveState("education")}
                            className={`${backgroundActiveState === "education" ? "bg-bg  text-text/75  border border-container-stroke/40 " : "  text-container-stroke focus:text-text/50  hover:text-text/50 "}  outline-text/50 font-bold  w-1/2 h-9 rounded-full`}
                            tabIndex={backgroundActiveState === "education" ? -1 : 0}
                            {...(backgroundActiveState != "education" ? cursorOnHover : {})}
                        >
                            Education
                        </button>
                        <button
                            onClick={() => handleBackgroundActiveState("work")}
                            className={`${backgroundActiveState === "work" ? "bg-bg    text-text/75 border border-container-stroke/40 " : "  text-container-stroke  focus:text-text/50  hover:text-text/50 "}  outline-text/50 font-bold  w-1/2 h-9 rounded-full`}
                            tabIndex={backgroundActiveState === "work" ? -1 : 0}
                            {...(backgroundActiveState != "work" && cursorOnHover)}
                        >
                            Experience
                        </button>
                        {/* <button onClick={() => setBackgroundActiveState("education")} className={`px-4 py-2 rounded-lg ${backgroundActiveState === "education" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                            Education
                            </button>
                            <button onClick={() => setBackgroundActiveState("work")} className={`px-4 py-2 rounded-lg ${backgroundActiveState === "work" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                            Experience
                            </button> */}
                    </div>
                    {
                        backgroundDataState.isLoaded ?
                            <>
                                <div className={` relative h-max  ${!backgroundDockState && "max-h-60 overflow-hidden"}`}>
                                    {

                                        backgroundActiveState === "education" ? (
                                            backgroundDataState.education.map((item, index) => (
                                                <BackgroundCard key={index} index={index} type="education" data={item} isLast={index === backgroundDataState.education.length - 1} />
                                            ))
                                        ) : (
                                            backgroundDataState.work.map((item, index) => (
                                                <BackgroundCard key={index} index={index} type="work" data={item} isLast={index === backgroundDataState.work.length - 1} />
                                            ))
                                        )
                                    }
                                    {
                                        !backgroundDockState &&
                                        <div className="h-50 bg-linear-to-b from-transparent via-70% to-bg absolute w-full top-10" />
                                    }
                                </div>
                                {
                                    ((!backgroundDockState && backgroundDataState.education.length > 2 && backgroundActiveState === "education") ||
                                        (!backgroundDockState && backgroundDataState.work.length > 2 && backgroundActiveState === "work")) &&
                                    <button
                                        onClick={() => handleBackgroundDockState(!backgroundDockState)}
                                        {...cursorOnHover}
                                        className="text-text/50 hover:text-text/75 hover:bg-container-bg rounded-full font-bold py-2 -translate-y-10  w-max px-8 mx-auto flex gap-1 items-center">
                                        Show All

                                        <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1L6 5L11 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                                        </svg>


                                    </button>
                                }
                            </>
                            :
                            <p>loading</p>
                    }
                </div>

            </div>
        </section>
    )
}