import { useEffect, useState } from "react";
import { backgroundActiveStateDefaults, backgroundDataDefaults } from "../../constants";
import type { backgroundActiveStateType, backgroundDataType } from "../../types";
import BackgroundCard from "./background_card";




export default function BackgroundSection() {

    const [backgroundActiveState, setBackgroundActiveState] = useState<backgroundActiveStateType>(backgroundActiveStateDefaults);
    const [backgroundDataState, setBackgroundDataState] = useState<backgroundDataType>(backgroundDataDefaults);

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



    return (
        <div className="w-full flex gap-8">
            {backgroundDataState.isLoaded && (
                <div className=" w-[calc(100%-2rem)] mx-auto max-w-185 flex flex-col ">
                    <div className="flex mx-auto w-full max-w-100 gap-4 bg-container-soft-shadow/50 p-1.5 rounded-full overflow-hidden">
                        <button
                            onClick={() => setBackgroundActiveState("education")}
                            className={`${backgroundActiveState === "education" ? "bg-container-bg  border border-container-stroke text-text/75 shadow-[0_0_6px_0_rgba(0,0,0,0.25)] " : " hover:bg-container-bg text-container-stroke hover:text-text  focus:text-accent-1 cursor-pointer"}  outline-accent-1 font-bold  w-1/2 h-9 rounded-full`}
                            tabIndex={backgroundActiveState === "education" ? -1 : 0}
                        >
                            Education
                        </button>
                        <button
                            onClick={() => setBackgroundActiveState("work")}
                            className={`${backgroundActiveState === "work" ? "bg-container-bg  border border-container-stroke text-text/75 shadow-[0_0_6px_0_rgba(0,0,0,0.25)] " : " hover:bg-container-bg text-container-stroke hover:text-text  focus:text-accent-1 cursor-pointer"}  outline-accent-1 font-bold  w-1/2 h-9 rounded-full`}
                            tabIndex={backgroundActiveState === "work" ? -1 : 0}

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
                    {backgroundActiveState === "education" ? (
                        backgroundDataState.education.map((item, index) => (
                            <BackgroundCard key={index} type="education" data={item} isLast={index === backgroundDataState.education.length - 1} />
                        ))
                    ) : (
                        backgroundDataState.work.map((item, index) => (
                            <BackgroundCard key={index} type="work" data={item} isLast={index === backgroundDataState.work.length - 1} />
                        ))
                    )}
                </div>
            )}
        </div>
    )
}