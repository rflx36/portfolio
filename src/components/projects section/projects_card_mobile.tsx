

export default function ProjectsCardMobile(props: {
    index: number,
    projectTitle: string,
    projectInformation: string,
    projectImageUrl: string,
    projectDate: string,
    projectStacks: Array<string>,
   
    focus: number
}) {



    return (
        <div className=" absolute top-0 flex items-center justify-start w-full h-full">
            <div
                className={`bg-bg rounded-md duration-150 ease-initial  overflow-hidden aspect-268/133 h-max w-full ${props.focus != props.index ?"opacity-0 scale-50": ""} `}
         
                style={{
                    transform: `translateX(calc(${props.index - props.focus} * 100%))`
                }}
            >
                <img src={`/assets/projects/${props.projectImageUrl}`} alt={props.projectTitle} className="object-cover" loading="lazy" />
            </div>
            
            <div className="-bottom-9 left-0 right-0 mx-auto w-full flex flex-col absolute translate-y-8">
                <p>{props.projectTitle}</p>
            </div>
        </div>
    )
}