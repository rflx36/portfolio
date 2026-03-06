

export default function ContactEnvelope() {

    const value = true;
    //test toggle anim



    return (
        // <div className="h-[320px] w-auto aspect-video mask-[url('/assets/ui/mask_envelope.svg')] mask-size-[100%_100%] mask-no-repeat [-webkit-mask-image:url('/assets/ui/mask_envelope.svg')] rounded-b-[2.25rem] overflow-hidden relative bg-bg border border-container-stroke ">
        <div className="h-max w-max relative">
            <div className="  w-full h-[200px]">
                <div className={`absolute -left-24 right-0 top-0   z-10 origin-center ease-in-out duration-1500 ${value ? "rotate-x-90 translate-y-[15px]" : "rotate-0 translate-y-[120px]"}`}>
                    <svg width="761" height="392" viewBox="0 0 761 392" className="fill-bg stroke-text/25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_di_752_48)">
                            <path d="M665 80H96L366.698 275.514C374.978 281.495 386.022 281.495 394.302 275.514L665 80Z" />
                            <path d="M366.99 275.109C375.096 280.964 385.904 280.964 394.01 275.109L663.454 80.5H97.5459L366.99 275.109Z" />
                        </g>
                        <defs>
                            <filter id="filter0_di_752_48" x="0" y="0" width="761" height="392" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="16" />
                                <feGaussianBlur stdDeviation="48" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_752_48" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_752_48" result="shape" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="8" />
                                <feGaussianBlur stdDeviation="8" />
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_752_48" />
                            </filter>
                        </defs>
                    </svg>

                    <div className="absolute top-[80px] h-20 w-full bg-[linear-gradient(180deg,var(--color-bg)_0%,color-mix(in_oklch,var(--color-bg)_85%,transparent)_55%,transparent_100%)]" />
                </div>
            </div>
            <div className="absolute bg-container-soft-shadow w-full h-[200px] " />

            <div className="h-[320px] w-auto aspect-video rounded-b-[2.25rem] overflow-hidden relative  border-x border-b  border-container-stroke">
                <div className="w-full h-full bg-bg  mask-[url('/assets/ui/mask_envelope.svg')] mask-size-[100%_100%] mask-no-repeat [-webkit-mask-image:url('/assets/ui/mask_envelope.svg')]" />
                <div className="absolute -left-24 right-0 top-10 ">

                    <svg width="761" height="392" viewBox="0 0 761 392" className="fill-bg stroke-text/25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_di_752_48)">
                            <path d="M665 280H96L366.698 84.4857C374.978 78.5048 386.022 78.5048 394.302 84.4857L665 280Z" />
                            <path d="M366.99 84.8906C375.096 79.036 385.904 79.036 394.01 84.8906L663.454 279.5H97.5459L366.99 84.8906Z" />
                        </g>
                        <defs>
                            <filter id="filter0_di_752_48" x="0" y="0" width="761" height="392" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="16" />
                                <feGaussianBlur stdDeviation="48" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0" />
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_752_48" />
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_752_48" result="shape" />
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                <feOffset dy="8" />
                                <feGaussianBlur stdDeviation="8" />
                                <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0" />
                                <feBlend mode="normal" in2="shape" result="effect2_innerShadow_752_48" />
                            </filter>
                        </defs>
                    </svg>

                    <div className="absolute bottom-[113px] h-20 w-full bg-[linear-gradient(0deg,var(--color-bg)_0%,color-mix(in_oklch,var(--color-bg)_85%,transparent)_55%,transparent_100%)]" />
                </div>
            </div>
        </div >
    )
}