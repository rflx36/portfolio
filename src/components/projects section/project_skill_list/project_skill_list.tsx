
import "./project_skill_list.css";
export default function ProjectSkillList(props: {
    project_tech_stack: Array<string>,
    styleState: boolean,
}) {
    return (
        <div className={`${props.styleState ? "project-skill-card-container" : ""} flex flex-wrap  gap-8 max-mobile:grid max-mobile:grid-cols-[repeat(auto-fit,50px)] max-mobile:justify-center `}>
            {
                props.project_tech_stack?.map((x, i) => {
                    const stack_name = x.toLowerCase().replace(" ", "");
                    const image_source = `/assets/skills/${stack_name == "reactnative" ? "react" : stack_name}.png`;

                    const disabledUrl = image_source?.replace(".png", "_disabled.png");
                    return (
                        <div className="flex justify-center h-max relative  project-skill-card-item">
                            <div
                                style={{
                                    '--image-disabled-url': `url(${disabledUrl})`,
                                    '--image-name-url': `url(${image_source})`,
                                    '--image-name-sequence-url': `url(${image_source.replace(".png", "_sequence.png")})`,
                                    animationDelay: (i / 25) + 0.1 + "s",
                                } as React.CSSProperties}
                                role="img"
                                aria-labelledby={x + "-description"}
                                className={`size-[50px] overflow-hidden [image-rendering:pixelated]  project-skill-image-container  ${props.styleState ? "bg-[image:var(--image-name-url)]" : "bg-[image:var(--image-disabled-url)] opacity-50"} `}
                            />
                            <p
                                className={`${props.styleState ? "block" : "hidden"} ${x.length >= 8 ? "text-xs" : "text-sm"} text-center absolute bottom-0 leading-3.5 translate-y-[calc(100%+0.25rem)] text-text/75 font-bold `}
                                style={{
                                    animation: `SlideUpFadeIn 0.3s ease-out ${0 + (i / 25)}s backwards`,
                                }}
                                id={x + "-description"}
                            >
                                {x}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    )
}