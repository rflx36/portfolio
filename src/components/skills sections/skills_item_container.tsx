

export default function SkillsItemContainer(props: {
    isActiveState: boolean,
    children: React.ReactNode,
    onClick: () => void,
    text: string
}) {
    return (
        <button
            onClick={props.onClick}
            className={`${props.isActiveState ? "skill-card-container-selected" : "skill-card-container-disabled"} w-[calc(100px+6rem)] flex flex-col font-bold px-8  text-lg cursor-pointer skill-card-container`}
        >
                <div className="h-6.25 w-full">
                    {props.text.toUpperCase()}
                </div>
                <div className="grid grid-cols-2  bg-green-500 gap-9 ">
                    {props.children}
                </div>
            
        </button>
    )
}