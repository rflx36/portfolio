import type { backgroundActiveStateType, backgroundEducationType, backgroundWorkType } from "../../types/types";







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
            <div className="flex gap-5 max-mobile:gap-2">

                <div className="flex flex-col items-center">
                    <div className="bg-container-soft-shadow border-container-stroke border size-[50px] max-mobile:size-[40px] grid place-content-center rounded-full">

                        <img
                            src={formattedData.image_url}
                            alt={formattedData.name.replace(".png", " logo").replace(".webp", " logo")}
                            className={`size-full  aspect-square object-contain rounded-full`}
                            style={{
                                animation: `scaleIn 0.3s ease-out ${0 + (props.index / 25)}s backwards`
                            }}
                        />
                    </div>
                    {
                        !props.isLast &&
                        <div className="w-[0.0625rem] h-12 max-mobile:h-14 bg-container-stroke" />
                    }
                </div>
                <div className="flex flex-col max-mobile:gap-1">
                    <p
                        className="text-text/75 font-bold max-mobile:leading-5 text-base"
                        style={{
                            animation: `SlideUpFadeIn 0.3s ease-out ${0 + (props.index / 25)}s backwards`,
                        }}
                    >
                        {formattedData.name}
                    </p>
                    <p
                        className="text-text/50 font-semibold text-base max-mobile:text-xs max-mobile:text-text/30"
                        style={{
                            animation: `SlideUpFadeIn 0.3s ease-out ${0.05 + (props.index / 25)}s backwards`,
                        }}
                    >
                        {formattedData.sub_information}
                    </p>
                </div>
            </div>
            <div className="text-text/75 font-bold max-mobile:text-xs max-mobile:text-center text-base" style={{
                animation: `fadeScaleIn 0.3s ease-out ${0.1 + (props.index / 25)}s backwards`,
            }}>
                {  

                    <span className="max-mobile:hidden">
                        <span>{`${formattedData.start_date}`}</span>
                        {" - "}
                    </span>
                }
                <span><p>{formattedData.end_date}</p></span>
            </div>
        </div>

    )
}