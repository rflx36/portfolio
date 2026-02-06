import type { backgroundActiveStateType, backgroundEducationType, backgroundWorkType } from "../../types";







export default function BackgroundCard(
    props: {
        index: number,
        type: backgroundActiveStateType,
        data: backgroundEducationType | backgroundWorkType,
        isLast: boolean,
    }

) {

    let formattedData;

    if (props.type === "education") {
        const formattedType = props.data as backgroundEducationType;
        formattedData = {
            name: formattedType.school_name,
            image_url: formattedType.school_image_url,
            sub_information: formattedType.sub_information,
            start_date: formattedType.start_date,
            end_date: formattedType.end_date,
        }
    }
    else {
        const formattedType = props.data as backgroundWorkType;
        formattedData = {
            name: formattedType.company_name,
            image_url: formattedType.company_image_url,
            sub_information: formattedType.role,
            start_date: formattedType.start_date,
            end_date: formattedType.end_date,
            description: formattedType.description,
        }
    }
    

    return (
        <div className="w-full h-max flex justify-between">
            <div className="flex gap-5">

                <div className="flex flex-col items-center">

                    <img
                        src={formattedData.image_url}
                        alt={formattedData.name.replace(".png", " logo").replace(".webp", " logo")}
                        className={`size-[50px]  aspect-square bg-container-soft-shadow border-container-stroke border object-contain rounded-full`}
                    />
                    {
                        !props.isLast &&
                        <div className="w-[0.0625rem] h-12 bg-container-stroke" />
                    }
                </div>
                <div className="flex flex-col">
                    <p
                        className="text-text/75 font-bold text-base"
                        style={{
                            animation: `SlideUpFadeIn 0.3s ease-out ${0 + (props.index / 25)}s backwards`,
                        }}
                    >
                        {formattedData.name}
                    </p>
                    <p
                        className="text-text/50 font-semibold text-base"
                        style={{
                            animation: `SlideUpFadeIn 0.3s ease-out ${0 + (props.index / 25)}s backwards`,
                        }}
                    >
                        {formattedData.sub_information}
                    </p>
                </div>
            </div>
            <div className="text-text/75 font-bold text-base">{formattedData.start_date} - {formattedData.end_date}</div>
        </div>

    )
}