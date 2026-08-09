import Polygon from "../../ui/pentagon";
import ProcessMobileNode1 from "./process_node_1";
import ProcessMobileNode2 from "./process_node_2";
import ProcessMobileNode3 from "./process_node_3";
import ProcessMobileNode4 from "./process_node_4";
import ProcessMobileNode5 from "./process_node_5";
import ProcessMobileNode6 from "./process_node_6";
import ProcessMobileNode7 from "./process_node_7";





export default function ProcessSectionMobile(props: { polygonSize: number }) {

    

    const processNodes = [
        ProcessMobileNode1,
        ProcessMobileNode2,
        ProcessMobileNode3,
        ProcessMobileNode4,
        ProcessMobileNode5,
        ProcessMobileNode6,
        ProcessMobileNode7
    ];

    return (

        <div className="w-full grid place-content-center relative  h-[1000px]">
            <div className="relative size-max opacity-90">
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
                    <h1 className="absolute w-[calc(100%-67px)] font-bold text-text uppercase min-[450px]:text-3xl  max:mobiletext-sm inset-0 m-auto text-center self-center">
                        Project Requirements
                    </h1>
                </div>
            </div>
            {
                processNodes.map((Node, i) => {

                    const offset = 90;
                    const angle = ((360 / 7) * i) - offset;

                    return (
                        <div key={i}
                            className="bg-red-500 rounded-full absolute  inset-1/2   h-1.5 origin-top-left"
                            style={{
                                width: `${props.polygonSize * 0.45}px`,
                                transform: `rotate(${angle}deg) translateY(-0.188rem)`
                            }}

                        >
                            <div className="absolute right-0 w-auto aspect-square  h-full">
                                <div className="absolute inset-0 m-auto grid place-content-center "
                                    style={{
                                        transform:`rotate(${-angle}deg)`
                                    }}
                                >
                                    <div className="  grid place-content-center "
                                        style={{
                                            // transform:`rotate(${-angle}deg)`
                                        }}
                                    >
                                        {/* <div className="size-[15px] bg-blue-500 inset-0 absolute m-auto " /> */}
                                        <Node />
                                    </div>

                                </div>
                            </div>

                        </div>
                    )
                })
            }
            <div className="bg-green-500 h-2 absolute bottom-0 left-0 right-0 m-auto rounded-full" 
            style={{
                width: `${props.polygonSize + 90}px`,   
            }}>

            </div>

        </div>
    )
}