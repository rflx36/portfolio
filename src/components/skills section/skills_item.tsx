import isMobile from "../../utils/is_mobile";


export default function SkillsItem(props: {
    skill: {
        name: string,
        img_url: string,
    },
    index: number,
    styleState: boolean
}) {

    const disabledUrl = props?.skill.img_url?.replace(".png", "_disabled.png");

    const imageUrl = props.skill.img_url;
    const animationDelay = isMobile() ? 0.1 : 0;
    
    return (
        <div className="flex justify-center h-max relative skill-card-item">

            <div
                style={{
                    '--image-disabled-url': `url(${disabledUrl})`,
                    '--image-name-url': `url(${imageUrl})`,
                    '--image-name-sequence-url': `url(${props.skill.img_url.replace(".png", "_sequence.png")})`,
                    animationDelay: (props.index / 25) + animationDelay + "s",
                } as React.CSSProperties}
                role="img"
                aria-labelledby={props.skill.name + "-description"}
                className={`size-[50px] overflow-hidden [image-rendering:pixelated]  skill-image-container  ${props.styleState ? "bg-[image:var(--image-name-url)] " : "bg-[image:var(--image-disabled-url)] opacity-50"}`}
            />

            <p
                className={`${props.styleState ? "block" : "hidden"} ${props.skill.name.length >= 8 ? "text-xs" : "text-sm"}  absolute bottom-0 leading-3.5 translate-y-[calc(100%+0.25rem)] text-text/75 font-bold `}
                style={{
                    animation: `SlideUpFadeIn 0.3s ease-out ${0 + (props.index / 25)}s backwards`,
                }}
                id={props.skill.name + "-description"}
            >
                {props.skill.name}
            </p>
        </div>
    )
}

