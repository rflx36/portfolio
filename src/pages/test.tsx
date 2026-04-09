import { useParams } from "react-router"





export default function PageTest (){
    const ah = useParams();
    

    return (
        <div>
            <p>Test Page</p>
            <p>Value: { ah.value}</p>
        </div>
    )
}