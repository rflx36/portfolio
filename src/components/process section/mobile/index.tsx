import { useInView } from "react-intersection-observer";
import Polygon from "../../ui/pentagon";



export default function ProcessSectionMobile(props: { polygonSize: number }) {

    // const process_implementations = ["Research", "Ai Assisted", "Security", " Testing", "Scalability and Maintainability", "Optimization", " User Experience"]

    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })
    const process_implementations = [{
        text: "Research",
        modifier: 0
    },
    {
        text: "AI Assisted",
        modifier: -2
    },
    {
        text: "Security",
        modifier: 3
    },
    {
        text: "Testing",
        modifier: 1
    },
    {
        text: "Scalability and Maintainability",
        modifier: -1,
        adjustment: 0.75
    },
    {
        text: "Optimization",
        modifier: 4
    },
    {
        text: "User Experience",
        modifier: 2,
        adjustment: -0.75
    }
    ]

    return (
        <>
            <div className="relative   bottom-0 top-0 my-auto h-[150px] z-30 w-full flex flex-col justify-center items-center">

                <div className="h-12 flex gap-2   w-max justify-center overflow-hidden  ">
                    {inView &&
                        ["How", "i", "work:"].map((word, index) => {
                            return (
                                <h2 key={index} className={`text-[2rem] text-text ease-in-out duration-250 font-bold animate-[SlideUp_0.5s_cubic-bezier(0.29,0.98,0.29,0.99)_backwards]`}
                                    style={{
                                        animationDelay: `${((index * 0.05))}s`,
                                    }}
                                >
                                    {word}
                                </h2>
                            )
                        })
                    }
                </div>

                <div className="relative ">

                    <div className="  absolute left-0 -translate-x-1/2 flex flex-wrap  w-screen gap-1 min-[650px]:justify-center justify-left px-4 overflow-hidden">
                        {inView &&
                            ["It's", "not", "just", "about", "writing", "code,", "I", "consider", "multiple", "processes", "simultaneously", "in", "my", "workflow"].map((word, index) => {
                                return (
                                    <div key={index} className="size-max overflow-hidden">

                                        <h3  className={`text-sm text-text/50  ease-in-out duration-250 font-regular animate-[SlideUp_0.5s_cubic-bezier(0.29,0.98,0.29,0.99)_backwards]`}
                                            style={{
                                                animationDelay: `${((index * 0.025) + 0.2)}s`,
                                            }}
                                        >
                                            {word}
                                        </h3>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="w-full grid place-content-center relative h-max p-20 ">

                <div className="relative size-max opacity-90" ref={ref}>
                    <Polygon
                        sides={7}
                        size={props.polygonSize}
                        cornerRadius={16}
                        fillColor="transparent"
                        strokeColor="color-mix(in oklch, var(--color-container-soft-shadow) 50%, var(--color-container-bg))"
                        strokeWidth={10}
                        className=""
                    />
                    <div className="absolute z-10 top-0 grid place-content-center size-full">
                        <Polygon
                            sides={7}
                            size={props.polygonSize - 10}
                            fillColor="var(--color-bg)"
                            cornerRadius={16}
                            strokeWidth={1}
                            strokeColor="var(--color-container-stroke)"
                        />
                        <h1 className="absolute w-[calc(100%-67px)] font-bold text-text uppercase min-[450px]:text-3xl  max:mobiletext-sm top-0 bottom-0 left-0 right-0 m-auto text-center self-center">
                            Project Requirements
                        </h1>
                    </div>
                </div>
                {
                    process_implementations.map((implementation, i) => {

                        const offset = 90;
                        const deg = 360 / 7;
                        const angle = (deg * i) - offset;

                        return (
                            <div key={i}
                                className=" rounded-full absolute  inset-1/2   h-1.5 origin-top-left"
                                style={{
                                    width: `${props.polygonSize * 0.5}px`,
                                    transform: `rotate(${angle + (deg / 2)}deg) translateY(-0.188rem)`
                                }}

                            >
                                <div className="absolute right-0 w-auto aspect-square  h-full">
                                    <div className="absolute inset-0 m-auto grid place-content-center "
                                        style={{
                                            transform: `rotate(${-angle}deg)`
                                        }}
                                    >
                                        <div className="  grid place-content-center "
                                            style={{
                                                transform: `rotate(${-((deg / 2) * implementation.modifier)}deg) ${implementation.adjustment ? `translateY(${implementation.adjustment}rem)` : ''}`
                                            }}
                                        >
                                            {/* <div className="size-[15px] bg-blue-500 inset-0 absolute m-auto " /> */}
                                            <div className="w-30  "  >

                                                <p className="font-bold text-text/50 text-center align-text-top">{`${implementation.text}`}</p>

                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
                <div className=" h-2 absolute bottom-0  left-0 right-0 m-auto rounded-full"
                    style={{
                        width: `${props.polygonSize + 90}px`,
                    }}>

                </div>

            </div>
        </>
    )
}