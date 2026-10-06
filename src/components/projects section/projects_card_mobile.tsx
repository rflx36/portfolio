import { useEffect, useState } from "react";
import ProjectsCardHover from "./projects_card_hover";


export default function ProjectsCardMobile(props: {
    ref: React.Ref<HTMLDivElement> | undefined,
    index: number,
    projectTitle: string,
    projectInformation: string,
    projectImageUrl: string,
    projectImageShowcaseAmount: number,
    projectDate: string,
    projectStacks: Array<string>,
    focus: number,
    showcaseInitialized: boolean,
    isInView: boolean,
}) {

    const [isShowcaseInitialized, setIsShowcaseInitialized] = useState(false);
    const imageThumbnailUrl = `/assets/projects/${props.projectImageUrl.replace(".png", ".webp")}`;
    const imageList = [imageThumbnailUrl].concat(Array.from({ length: props?.projectImageShowcaseAmount || 0 }, (_, i) => `/assets/projects/${props.projectImageUrl.replace("project_thumbnail", "project_showcase").replace(".png", `_${i + 1}.webp`)}`));

    useEffect(() => {
        let delay = 4300;
        if (isShowcaseInitialized){
            setIsShowcaseInitialized(false);
            delay = 2000;
        }

        const timeout = setTimeout(() => {
            if (props.showcaseInitialized) {
                setIsShowcaseInitialized(true);
            }
        }, delay);
        
        return () => {
            clearTimeout(timeout);
        }
    }, [props.showcaseInitialized,props.focus]);

    return (
        <div ref={props.ref} className=" absolute top-0 flex items-center justify-start w-full h-full">
            <div
                className={`bg-bg rounded-md duration-150 ease-initial  overflow-hidden aspect-268/133 h-max w-full ${props.focus != props.index ? "opacity-0 scale-50" : ""} `}

                style={{
                    transform: `translateX(calc(${props.index - props.focus} * 100%))`
                }}
            >
                <ProjectsCardHover
                    imageList={imageList}
                    title={props.projectTitle}
                    isActive={isShowcaseInitialized && (props.focus == props.index && props.isInView)}
                />
            </div>

            <div className="-bottom-9 left-0 right-0 mx-auto w-full flex flex-col absolute translate-y-8">
                <p>{props.projectTitle}</p>
            </div>
        </div>
    )
}