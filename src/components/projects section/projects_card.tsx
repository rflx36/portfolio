




// current width * 4 %% parent width

//  max width + dampening


export default function ProjectsCard(props: {
    index: number,
    projectTitle: string,
    projectImageUrl: string,
    DisplayProperties: {
        dampening: number,
        featuredAmountLimit: number,
        inverseBoolValue: boolean,
        loadAnimation: boolean,
    }
}) {


    const featuredAmountLimit = props.DisplayProperties.featuredAmountLimit;
    const dampening = props.DisplayProperties.dampening;
    const randomRotation = Math.floor((Math.random() * 6) + 5) * (props.index % 2 == (props.DisplayProperties.inverseBoolValue ? 1 : 0) ? -1 : 1);
    const randomTransform = Math.floor(Math.random() * 21) - 10;


    console.log(randomRotation)
    console.log(randomTransform);
    console.log(props.DisplayProperties.loadAnimation);
    return (
        <div
            className={`bg-bg rounded-4xl hover:z-20! hover:delay-300 hover:duration-150 hover:-translate-y-2 hover:rotate-[${(5 * (props.index % 2 == (props.DisplayProperties.inverseBoolValue ? 1 : 0) ? -1 : 1)).toString()}deg]! absolute border-4 shadow-2xl ease-initial duration-300 border-black/10 overflow-hidden h-max w-full`}
            style={{
                // left: `${props.index * 20}%`, //    reverse formula for parent /4    current width 
                left: `calc(${props.index * (100 / featuredAmountLimit)}% ${props.index > 0 && `- ${dampening}px`})`, //    reverse formula for parent /4    current width
                zIndex: 10 - props.index,
                maxWidth: `calc(${100 / featuredAmountLimit}% + ${dampening}px)`,
                transform: props.DisplayProperties.loadAnimation ? `rotate(${randomRotation}deg) translateX(${randomTransform}px)` : "scale(90%) translateY(100px)",
            }}
        >
            <img src={`/assets/projects/${props.projectImageUrl}`} alt={props.projectTitle} className="object-cover" />
            {/* (
            <svg
                width={640}
                height={318}
                viewBox="0 0 640 318"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <foreignObject x={-4} y={-4} width={648} height={326}>
                    <div
                        style={{
                            backdropFilter: "blur(2px)",
                            clipPath: "url(#bgblur_0_574_41_clip_path)",
                            height: "100%",
                            width: "100%",
                        }}
                    />
                </foreignObject>

                <path
                    dataFigmaBgBlurRadius={4}
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M640 36C640 16.1178 623.882 0 604 0H36C16.1177 0 0 16.1177 0 36L0 282C0 301.882 16.1177 318 36 318H604C623.882 318 640 301.882 640 282V36ZM604 16H36C24.9543 16 16 24.9543 16 36V283C16 293.739 24.9543 302.444 36 302.444H604C615.046 302.444 624 293.739 624 283V36C624 24.9543 615.046 16 604 16Z"
                    fill="black"
                    fillOpacity={0.1}
                />

                <defs>
                    <clipPath id="bgblur_0_574_41_clip_path" transform="translate(4 4)">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M640 36C640 16.1178 623.882 0 604 0H36C16.1177 0 0 16.1177 0 36L0 282C0 301.882 16.1177 318 36 318H604C623.882 318 640 301.882 640 282V36ZM604 16H36C24.9543 16 16 24.9543 16 36V283C16 293.739 24.9543 302.444 36 302.444H604C615.046 302.444 624 293.739 624 283V36C624 24.9543 615.046 16 604 16Z"
                        />
                    </clipPath>
                </defs>
            </svg> */}

        </div>
    )

}
