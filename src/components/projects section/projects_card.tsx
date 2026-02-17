








export default function ProjectsCard(props: {
    index: number,
    projectTitle: string,
    projectImageUrl: string
}) {

    return (
        <div 
        className="bg-bg rounded-4xl left-[] absolute m-5 border-8 border-black/10 overflow-hidden h-max w-full max-w-[640px]"
        style={{
            left: `${props.index * 20}%`,
            zIndex: 10 - props.index
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
