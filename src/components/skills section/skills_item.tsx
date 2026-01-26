

export default function SkillsItem(props: {
    skill: {
        name: string,
        img_url: string,
    },
    index: number,
    styleState: boolean
}) {

    const disabled_url = props?.skill.img_url?.replace(".png", "_disabled.png");

    return (
        <div  className="flex justify-center h-max relative skill-card-item">
            <div
                style={{
                    '--image-disabled-url': `url(${disabled_url})`,
                    '--image-name-url': `url(${props.skill.img_url})`,
                } as React.CSSProperties}
                className={`size-[50px] [image-rendering:pixelated]  skill-image-container  ${props.styleState ? "bg-[image:var(--image-name-url)] " : "bg-[image:var(--image-disabled-url)] opacity-50"}`}
            />
            {/* <img src={props.styleState ? props.skill.img_url : disabled_url} className="size-[50px] [image-rendering:pixelated]" /> */}
            <p
                className={`${props.styleState ? "block" : "hidden"} ${props.skill.name.length >= 8 ? "text-xs" : "text-sm"}  absolute bottom-0 leading-3.5 translate-y-[calc(100%+0.25rem)] text-text/75 font-bold `}
                style={{
                    animation: `SlideUpFadeIn 0.3s ease-out ${0 + (props.index / 25)}s backwards`,
                }}
            >
                {props.skill.name}
            </p>
        </div>
    )
}

