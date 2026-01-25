import { useEffect, useState } from "react";
import { backgroundActiveStateDefaults, backgroundDataDefaults } from "../../constants";
import type { backgroundActiveStateType, backgroundDataType } from "../../types";




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
    }
    useEffect(() => {
        fetchBackgroundData();
    }, []);



    return (
        <>
        </>
    )
}