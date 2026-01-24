

export default function SkillsItem(props: {
    skill: {
        name: string,
        url: string,
    },
    styleState: boolean
}) {

    const disabled_url = props?.skill.url?.replace(".png", "_disabled.png");

    return (
        <div className="flex justify-center h-max relative skill-card-item">
            <img src={props.styleState ? props.skill.url : disabled_url} className="size-[50px] bg-red-500" />

            <p className={`${props.styleState ? "block" : "hidden"} ${props.skill.name.length > 8 ? "text-xs" : "text-sm"} absolute bottom-0 leading-3.5 translate-y-[calc(100%+0.25rem)] text-text font-bold animate-[SlideUpFadeIn_0.3s_ease-out_backwards_0.1s]`}>{props.skill.name}</p>

        </div>
    )
}

