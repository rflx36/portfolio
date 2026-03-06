import { useModalStore } from "../../stores/modal_store"




export default function ProjectsModal() {
    const modalState = useModalStore();




    return (
        <div className="absolute top-0 left-0 right-0 bottom-0 m-auto aspect-video h-auto max-w-[calc(1920px-64px)] overflow-hidden  w-[calc(100%-2rem)] bg-bg ">
            {/* <p>Huh Dog</p> */}
            {/* <p>{JSON.stringify(modalState.get)}</p> */}
        </div>
    )
}