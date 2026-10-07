import { useState, type ReactNode } from "react"
import { useCursor } from "../../hooks/use_cursor"
import isMobile from "../../utils/is_mobile"

const EMAIL = "rolandfonzlamoste3608@gmail.com"

// Shared entrance: one staggered slide-up when the page loads
const ENTER = "animate-[SlideUp_0.5s_cubic-bezier(0.75,0.63,0.13,0.83)_both]"

const LINK_CLASS =
    "inline-flex items-center gap-3 py-1 text-sm text-bg outline-none cursor-none transition-colors duration-150 hover:text-accent-1 focus-visible:text-accent-1"

/* ---------- icons ---------- */

function IconSlot({ children }: { children: ReactNode }) {
    return <span className="grid w-3 shrink-0 place-content-center">{children}</span>
}

const PinIcon = () => (
    <svg className="fill-current" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M4 0C1.79086 0 0 1.79086  0 4C0 5.69958 4 13.7036 4 13.7036C4 13.7036 8 5.69958 8 4C8 1.79086 6.20914 0 4 0ZM4 5.69958C4.82843 5.69958 5.5 5.02801 5.5 4.19958C5.5 3.37116 4.82843 2.69958 4 2.69958C3.17157 2.69958 2.5 3.37116 2.5 4.19958C2.5 5.02801 3.17157 5.69958 4 5.69958Z" />
    </svg>
)

const FileIcon = () => (
    <svg className="fill-current" width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 11C0 11.5523 0.447715 12 1 12H8C8.55228 12 9 11.5523 9 11V3.5H5.0625V0H1C0.447715 0 0 0.447715 0 1V11ZM9 3L5.625 0V3H9Z" />
    </svg>
)

const GithubIcon = () => (
    <svg className="fill-current" width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M3.90491 12.2076C3.90491 12.3968 3.79063 12.6147 3.4942 12.6147H8.27277C7.97634 12.6147 7.86563 12.3968 7.86563 12.204C7.86563 11.9361 7.87634 11.0504 7.87634 9.95399C7.87634 9.1897 7.6192 8.6897 7.33349 8.43613C9.11563 8.23256 10.9871 7.5397 10.9871 4.3897C10.9871 3.49685 10.6763 2.76471 10.1656 2.18971C10.2478 1.98256 10.5228 1.14685 10.0871 0.0182773C10.0286 0.00429225 9.96854 -0.00171464 9.90849 0.000420201C9.6192 0.000420201 8.96563 0.111134 7.88706 0.861134C6.57651 0.494459 5.19046 0.494459 3.87991 0.861134C2.80134 0.111134 2.14777 0.000420201 1.85849 0.000420201C1.79843 -0.00171464 1.73836 0.00429225 1.67991 0.0182773C1.2442 1.14685 1.5192 1.98256 1.60134 2.18971C1.09063 2.76113 0.779914 3.49328 0.779914 4.3897C0.779914 7.53256 2.64777 8.23613 4.42277 8.44327C4.1942 8.65042 3.98706 9.01113 3.91563 9.5397C3.62933 9.67464 3.31778 9.74766 3.00134 9.75399C2.52277 9.75399 1.98706 9.55756 1.58706 8.85756C1.58706 8.85756 1.16563 8.07899 0.362057 8.00756H0.358486C0.304914 8.00756 -0.387943 8.02185 0.308486 8.51113C0.308486 8.51113 0.833485 8.7647 1.19777 9.71113C1.19777 9.71113 1.54777 10.9076 3.08706 10.9076C3.35885 10.9055 3.62957 10.8732 3.8942 10.8111C3.89777 11.4968 3.90491 12.0111 3.90491 12.2076Z" />
    </svg>
)

const FacebookIcon = () => (
    <svg className="fill-current translate-x-px" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M5.99988 0C2.68627 0 0 2.69619 0 6.02204C0 8.84614 1.93724 11.2159 4.55055 11.8668V7.86238H3.31337V6.02204H4.55055V5.22906C4.55055 3.1794 5.47477 2.22936 7.47969 2.22936C7.85984 2.22936 8.51575 2.30427 8.78406 2.37895V4.04705C8.64247 4.03212 8.39647 4.02465 8.09096 4.02465C7.10722 4.02465 6.72706 4.39874 6.72706 5.37118V6.02204H8.68687L8.35015 7.86238H6.72706V12C9.69797 11.6399 12 9.10099 12 6.02204C11.9998 2.69619 9.31349 0 5.99988 0Z" />
    </svg>
)

const MailIcon = () => (
    <svg className="fill-current translate-x-px" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M11 8C11.5523 8 12 7.55228 12 7V0.8L6 4.4L0 0.8V7C0 7.55228 0.447715 8 1 8H11ZM0 0L6 3.5L12 0H0Z" />
    </svg>
)

/* ---------- link ---------- */

interface FooterLinkProps {
    label: string
    icon: ReactNode
    delay: string
    tooltip?: string
    // link mode
    href?: string
    external?: boolean
    download?: boolean
    // button mode
    onClick?: () => void
}

function FooterLink({ label, icon, delay, tooltip, href, external, download, onClick }: FooterLinkProps) {
    // hook lives inside the component so it's safe to render in a list
    const cursor = useCursor(tooltip ? { type: "pointer", tooltip } : { type: "pointer" })

    const content = (
        <>
            <IconSlot>{icon}</IconSlot>
            <span>{label}</span>
        </>
    )

    return (
        <li className="overflow-hidden cursor-none">
            <div className={ENTER} style={{ animationDelay: delay }}>
                {href ? (
                    <a
                        {...cursor}
                        href={href}
                        download={download}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer" : undefined}
                        className={LINK_CLASS}
                    >
                        {content}
                    </a>
                ) : (
                    <button {...cursor} type="button" onClick={onClick} className={LINK_CLASS}>
                        {content}
                    </button>
                )}
            </div>
        </li>
    )
}

/* ---------- footer ---------- */

export default function Footer() {
    const [copied, setCopied] = useState<boolean>(false)

    const copyEmail = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(EMAIL)
            setCopied(true)
            setTimeout(() => setCopied(false), 1800)
        } catch {
            window.location.href = `mailto:${EMAIL}`
        }
    }

    return (
        <footer className="bg-text text-bg px-6 py-12 md:px-16 md:py-16">
            <div className="mx-auto w-full max-w-[1329px]">
                <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">

                    {/* identity */}
                    <div className="overflow-hidden max-mobile:self-center">
                        <div className={ENTER} style={{ animationDelay: "2.6s" }}>
                            <p className="text-3xl font-semibold tracking-tight md:text-4xl">
                                Roland Fonz Lamoste
                            </p>
                            <div className="mt-3 flex items-center gap-3 text-xs font-medium text-bg/67">
                                <IconSlot><PinIcon /></IconSlot>
                                <p>Based in Rizal, Philippines</p>
                            </div>
                        </div>
                    </div>

                    {/* links */}
                    <ul className="flex flex-col gap-1 self-end md:self-auto max-mobile:self-center">
                        <FooterLink
                            label={isMobile() ? "github.com/rflx36" : "Github"}
                            icon={<GithubIcon />}
                            href="https://github.com/rflx36"
                            external
                            tooltip="github.com/rflx36"
                            delay="2.7s"
                        />
                        <FooterLink
                            label={isMobile() ? "Download Resume" : "Resume"}
                            icon={<FileIcon />}
                            href="/resume.pdf" /* update to your resume path */
                            download
                            delay="2.9s"
                        />
                        <FooterLink
                            label={isMobile() ? "facebook.com/rolandfonz.lamoste" : "Facebook"}
                            icon={<FacebookIcon />}
                            href="https://facebook.com/rolandfonz.lamoste"
                            external
                            tooltip="facebook.com/rolandfonz.lamoste"
                            delay="2.8s"
                        />
                        <FooterLink
                            label={copied ? "Copied to clipboard" : EMAIL}
                            icon={<MailIcon />}
                            onClick={copyEmail}
                            tooltip="Copy to clipboard"
                            delay="3s"
                        />
                    </ul>
                </div>
                <div className="w-full h-[0.0625rem] mt-12 relative opacity-0 animate-[fadeIn_0.5s_cubic-bezier(0.130,0.835,0.130,0.830)_forwards_2.5s]">
                    <div className="bg-bg/25 w-full h-full " />
                    <div className=" bg-linear-to-r from-bg/0 to-text w-[25%] max-w-32 h-2 z-10 absolute right-0 top-0 bottom-0 -translate-y-1/2" />
                    <div className=" bg-linear-to-r from-text to-bg/0 w-[25%] max-w-32 h-2 z-10 absolute left-0 top-0 bottom-0 -translate-y-1/2" />
                </div>
                <div className=" pt-6 text-xs text-bg/67 max-mobile:text-center">
                    <p>&copy; 2026 Roland Fonz Lamoste. All rights reserved.</p>
                </div>

                <span className="sr-only" role="status" aria-live="polite">
                    {copied ? "Email copied to clipboard" : ""}
                </span>
            </div>
        </footer>
    )
}