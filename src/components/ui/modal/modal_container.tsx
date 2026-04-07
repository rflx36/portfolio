import { useModalStore } from "../../../stores/modal_store";
import ButtonClose from "../button/button close";


interface ModalContainerProps {
    children: React.ReactNode
    className?: string
}



export default function ModalContainer(props: ModalContainerProps) {

    const modalState = useModalStore();



    const closeModal = () => {

        modalState.get.activeModal = null;
        modalState.get.modalInfo = null;
        modalState.set();

    }

    return (

        <div className={" flex  w-[calc(100%-4rem)] max-w-[calc(1920px-4rem)] max-h-[calc(1080px-4rem)] relative  bg-container-bg border shadow-lg border-container-stroke m-8 p-8 pt-12 rounded-2xl " + props.className}>
            <ButtonClose
                onClick={closeModal}
                className="absolute top-3 right-3"
            />
            {props.children}
        </div>

    )
}