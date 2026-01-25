

export default function SkillsItemContainer(props: {
    isActiveState: boolean,
    isLoaded: boolean,
    children: React.ReactNode,
    onClick: () => void,
    text: string
}) {
    return (
        <button
            onClick={props.onClick}
            className={`${props.isActiveState ? "skill-card-container-selected" : "skill-card-container-disabled"} w-[calc(100px+6rem)] flex flex-col gap-12 font-bold px-8  text-lg cursor-pointer skill-card-container`}
        >
            <div className="h-6.25 w-full relative">
                {props.text.toUpperCase()}

                {
                    props.isActiveState &&

                    <div className="absolute bg-accent-1 -bottom-3 h-0.5 w-full" />
                }
            </div>

            {/* {
                props.isLoaded ?


                    <div className="grid grid-cols-2  gap-9 ">
                        {props.children}
                    </div>
                    :
                    <div className="w-full h-[50px] bg-container-soft-shadow rounded-xl animate-pulse"/>
            } */}
            <div className="grid grid-cols-2 gap-9">
                {
                    props.isLoaded ?
                        props.children
                        :
                        Array.from({ length: Math.ceil(Math.random() * 8) }).map((_, index) => (
                            <div key={index} className="w-full h-[50px] bg-container-soft-shadow animate-pulse rounded-xl " />
                        ))
                }
            </div>

        </button>
    )
}