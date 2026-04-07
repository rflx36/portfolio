


interface ButtonCloseProps {
    onClick: () => void
    className?: string
}


export default function ButtonClose(props: ButtonCloseProps) {

    return (
        <button onClick={props.onClick} className={"text-text/75 cursor-pointer hover:text-text  bg-container-soft-shadow rounded-full size-8 grid place-content-center " + props.className}>
            <svg width="11" height="11" className="stroke-current" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 5.5L1 1M5.5 5.5L10 1M5.5 5.5L10 10M5.5 5.5L1 10" stroke-width="2" stroke-linecap="round" />
            </svg>
        </button>
    )


}