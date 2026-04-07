import { useModalStore } from "../../../../stores/modal_store";
import ModalContainer from "../modal_container";








export default function ModalProjects() {
    const modalState = useModalStore();

    return (
        <ModalContainer className="max-h-max!">
            <div className="min-w-1/2 w-max flex flex-col bg-red-500 h-max">
            <h1 className="text-text  font-semibold text-xl text-center mb-6">{modalState.get.modalInfo?.project_title}</h1>
            <div className="w-full h-auto aspect-video bg-accent-1 rounded-xl"/>
            <div className="flex">
            </div>
            </div>
            <p>Test Here</p>
            <p>Test Here</p>
        </ModalContainer>
    )

}