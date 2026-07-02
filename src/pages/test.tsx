import { useParams } from "react-router"
import PathNodeVisualizer from "../components/ui/path node/visualizer";





export default function PageTest (){
    const ah = useParams();
    

    return (
        <div>
            <p>Test Page</p>
            <p>Value: { ah.value}</p>
            <PathNodeVisualizer />
        </div>
    )
}