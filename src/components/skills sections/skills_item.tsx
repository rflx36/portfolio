

export default function SkillsItem(props: {
    skill: {
        name: string,
        imgUrl: string,
    },
    index: number,
    styleState: boolean
}) {

    const disabled_url = props?.skill.imgUrl?.replace(".png", "_disabled.png");

    return (
        <div key={props.index} className="flex justify-center h-max relative skill-card-item">
            <div
                style={{
                    '--image-disabled-url': `url(${disabled_url})`,
                    '--image-name-url': `url(${props.skill.imgUrl})`,
                } as React.CSSProperties}
                className={`size-[50px] [image-rendering:pixelated] skill-image-container ${props.styleState ? "bg-[image:var(--image-name-url)]" : "bg-[image:var(--image-disabled-url)]"}`}
            />
            {/* <img src={props.styleState ? props.skill.imgUrl : disabled_url} className="size-[50px] [image-rendering:pixelated]" /> */}
            <p
                className={`${props.styleState ? "block" : "hidden"} ${props.skill.name.length > 8 ? "text-xs" : "text-sm"} absolute bottom-0 leading-3.5 translate-y-[calc(100%+0.25rem)] text-text font-bold `}
                style={{
                    animation: `SlideUpFadeIn 0.3s ease-out ${0.1 + (props.index / 25)}s backwards`,
                }}
            >
                {props.skill.name}
            </p>
        </div>
    )
}

