import ProcessSectionDefault from "./default"
import ProcessSectionMobile from "./mobile"
import clamp from "../../utils/clamp";
import useResize from "../../hooks/use_resize";



export default function ProcessSection() {
    const responsiveBarrier = 768;
    const use_resize = useResize({ responsiveBarrier });

    const responsiveState = use_resize.aboveBarrier ? "WideView" : "smallView";

    const baseSize = use_resize.aboveBarrier ? use_resize.width * 0.4 : use_resize.width - 100;
    const polygonSize = clamp(baseSize, 250, 400);


    return (
        <div className="w-full  overflow-clip">
           
            {
                responsiveState === "WideView" ?
                    <ProcessSectionDefault polygonSize={polygonSize} />
                    :
                    <ProcessSectionMobile polygonSize={polygonSize} />
            }
        </div>
    )
}