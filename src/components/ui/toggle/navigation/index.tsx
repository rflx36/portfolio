import "./toggle_navigation.css"

interface ToggleNavigationProps {
    isChecked: boolean,
    onClick: (e: boolean) => void
    className?: string
}

export default function ToggleNavigation(props: ToggleNavigationProps) {

    return (
        <div className={props.className}>
            <input className="opacity-0 absolute size-full"
                id="checkbox"
                type="checkbox"
                checked={props.isChecked}
                onClick={e => props.onClick(e.currentTarget.checked)}
                onChange={() => { }}
            />
            <label className="toggle text-text" htmlFor="checkbox">
                <div className="bar bg-current bar--top" />
                <div className="bar bg-current bar--middle" />
                <div className="bar bg-current bar--bottom" />
            </label>
        </div>
    )

}