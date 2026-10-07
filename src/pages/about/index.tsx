"use client"

import { useEffect, type ReactNode } from "react"
import PixelBackground from "../../components/ui/pixel bg"
import { scrollDefaults } from "../../constants"

// month is 0-indexed (10 = November)
const BIRTHDAY = { year: 2002, month: 10, day: 20 }

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
]

const BIRTHDATE_LABEL = `${MONTHS[BIRTHDAY.month]} ${BIRTHDAY.day}, ${BIRTHDAY.year}`
const BIRTHDATE_ISO = `${BIRTHDAY.year}-${String(BIRTHDAY.month + 1).padStart(2, "0")}-${String(BIRTHDAY.day).padStart(2, "0")}`

const hats = [
    "GameDevelopment",
    "FullStack",
    "UIUX",
    "3D",
    "PhotoVideoEditing",
]

const projects = [
    "Dynamic constraint-based schedule generator",
    "Multiplayer horror game",
    "Quad-tree based map viewer",
    "Game stat laboratory calculator",
]

function Avatar({ size }: { size: "sm" | "lg" }) {
    const isLarge = size === "lg"
    const px = isLarge ? 224 : 88
    return (
        <img
            src="/assets/profile.png"
            alt={isLarge ? "Roland Fonz Lamoste" : ""}
            width={px}
            height={px}
            className={`${isLarge ? "size-24 sm:size-28" : "size-11 border border-container-stroke"
                } shrink-0 rounded-full object-cover`}
        />
    )
}

function PinIcon() {
    return (
        <svg className="absolute right-4 opacity-75 fill-text stroke-text" width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.311 1H6.81093H3.31104L4.11862 2L4.11873 7L1.81104 10.6667H6.81104H11.811L9.50334 7V2L10.311 1Z" />
            <path d="M6.81104 10.6667H11.811L9.50334 7V2L10.311 1H6.81093H3.31104L4.11862 2L4.11873 7L1.81104 10.6667H6.81104ZM6.81104 10.6667L6.81093 16" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

function CalendarIcon() {
    return (
        <svg width="15" height="15" className="stroke-current fill-current opacity-75" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0247 9.03892C13.2179 9.03892 14.1456 10.077 14.0121 11.2626L13.6791 14.2212H0.845784L0.51276 11.2626C0.379296 10.077 1.30704 9.03892 2.50021 9.03892H3.76245H7.26245H10.7625H12.0247Z" />
            <path d="M7.22231 1.22119C7.87045 2.66564 8.00008 2.27085 8.00008 3.82119C8.00008 4.71054 6.44453 4.71054 6.44453 3.82119C6.44453 2.27085 6.57416 2.66564 7.22231 1.22119Z" />
            <path d="M10.7625 2.40301C11.4106 3.84745 11.5402 3.45267 11.5402 5.00301C11.5402 5.90146 9.98467 5.90146 9.98467 5.00301C9.98467 3.45267 10.1143 3.84745 10.7625 2.40301Z" />
            <path d="M3.76245 2.40301C4.4106 3.84745 4.54023 3.45267 4.54023 5.00301C4.54023 5.90146 2.98467 5.90146 2.98467 5.00301C2.98467 3.45267 3.1143 3.84745 3.76245 2.40301Z" />
            <path d="M7.26245 9.03892L7.22231 6.42119M7.26245 9.03892H3.76245M7.26245 9.03892H10.7625M3.76245 9.03892H2.50021C1.30704 9.03892 0.379296 10.077 0.51276 11.2626L0.845784 14.2212H13.6791L14.0121 11.2626C14.1456 10.077 13.2179 9.03892 12.0247 9.03892H10.7625M3.76245 9.03892L3.76245 7.13028M10.7625 9.03892V7.13028M7.22231 1.22119C7.87045 2.66564 8.00008 2.27085 8.00008 3.82119C8.00008 4.71054 6.44453 4.71054 6.44453 3.82119C6.44453 2.27085 6.57416 2.66564 7.22231 1.22119ZM10.7625 2.40301C11.4106 3.84745 11.5402 3.45267 11.5402 5.00301C11.5402 5.90146 9.98467 5.90146 9.98467 5.00301C9.98467 3.45267 10.1143 3.84745 10.7625 2.40301ZM3.76245 2.40301C4.4106 3.84745 4.54023 3.45267 4.54023 5.00301C4.54023 5.90146 2.98467 5.90146 2.98467 5.00301C2.98467 3.45267 3.1143 3.84745 3.76245 2.40301Z" />
        </svg>


    )
}

function LocationIcon() {
    return (
        <svg className="fill-current shrink-0" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M4 0C1.79086 0 0 1.79086  0 4C0 5.69958 4 13.7036 4 13.7036C4 13.7036 8 5.69958 8 4C8 1.79086 6.20914 0 4 0ZM4 5.69958C4.82843 5.69958 5.5 5.02801 5.5 4.19958C5.5 3.37116 4.82843 2.69958 4 2.69958C3.17157 2.69958 2.5 3.37116 2.5 4.19958C2.5 5.02801 3.17157 5.69958 4 5.69958Z" />
        </svg>
    )
}

function Post({
    pinned = false,
    children,
}: {
    pinned?: boolean
    children: ReactNode
}) {
    return (
        <article
            className={`p-2.5 bg-container-soft-shadow/50 rounded-2xl`}
        >
            <div className="relative  flex flex-col max-mobile:gap-3 rounded-xl bg-bg border p-5 sm:p-6 border-container-stroke">

                {pinned && <PinIcon />}
                <div className="flex gap-4">

                    <Avatar size="sm" />
                    <header className={`text-base translate-y-1`}>
                        <span className="font-semibold">Roland Fonz Lamoste</span>
                    </header>

                </div>
                <div className="min-w-0 flex gap-4">
                    <div className="min-w-11 max-mobile:hidden" />
                    <div className="flex flex-col">

                        {children}
                    </div>
                </div>
            </div>


        </article>
    )
}

export default function PageAbout() {
    useEffect(() => {
        const section = document.getElementById("about-page-id");
        if (section) {
            section.scrollIntoView(scrollDefaults);
        }
    }, [])

    return (
        <section id="about-page-id" className="font-sans w-[calc(100%-2rem)] max-w-270 h-full mx-auto mt-0 pb-24">
            <div className="max-w-170 mx-auto text-base sm:text-lg leading-8 ">
                <div className="p-2.5 bg-container-soft-shadow/50 mb-4 rounded-2xl">
                    <header className=" overflow-hidden rounded-xl bg-bg border border-container-stroke ">
                        <div className="h-40 bg-accent-1 z-10 relative overflow-hidden" >
                            <h1 className="absolute  bottom-0 w-full text-center text-9xl left-0 right-0 mx-auto font-bold opacity-10 blur-xs translate-y-5">About <span className="max-mobile-tablet-threshold:hidden"> me </span></h1>
                            <PixelBackground className="opacity-50  " />
                        </div>
                        <div className="px-5 sm:px-6 pb-4 z-10 relative  ">
                            <div className="-mt-12 sm:-mt-14 flex items-end max-mobile:justify-self-center justify-between gap-4">
                                <div className="rounded-full ring-5 ring-bg border border-container-stroke">
                                    <Avatar size="lg" />
                                </div>
                            </div>
                            <h1 className="mt-2 text-3xl sm:text-4xl max-mobile:text-xl max-mobile:text-center font-semibold leading-tight">
                                Roland Fonz Lamoste
                            </h1>
                            <p className="text-text/50 text-xl -translate-y-1  max-mobile:text-lg max-mobile:text-center max-mobile:leading-4 max-mobile:mt-2 font-semibold">Full-Stack / Frontend Engineer</p>

                            <p className="mt-3 text-base text-text font-semibold max-mobile:text-center leading-5 ">
                                Hi, I’m a frontend engineer
                                with a full-stack and UI/UX background.
                            </p>
                            <ul className="mt-3 flex max-mobile:flex-col max-mobile:gap-2 gap-8 text-sm  text-text ">
                                <li className="flex items-center gap-2">
                                    <span className="flex w-4 justify-center">
                                        <LocationIcon />
                                    </span>
                                    <span>Based in Rizal, Philippines</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="flex w-4 justify-center">
                                        <CalendarIcon />
                                    </span>
                                    <time dateTime={BIRTHDATE_ISO}>{BIRTHDATE_LABEL}</time>
                                </li>
                            </ul>

                        </div>
                    </header>
                </div>

                <div className="flex flex-col gap-4">
                    <Post pinned>
                        <p className="text-xl sm:text-2xl max-mobile: font-semibold leading-snug text-text">
                            I build things where the logic underneath is solid
                            and the experience on top feels right, and I won’t
                            call something finished until both are.
                        </p>
                    </Post>

                    <Post>
                        <p>
                            Wrote my first “Hello World” in 2019, and it hit
                            me: a whole universe of possibilities I could
                            create. Moving forward, I’ve worn many hats through
                            the years: game development, full-stack, UI/UX, 3D,
                            and photo/video editing.{" "}
                            <span className="text-text font-semibold">
                                Each skill is correlated, and that strengthens
                                my domain.
                            </span>
                        </p>
                        <ul className="flex flex-wrap gap-x-3 gap-y-1 text-base font-bold text-accent-1">
                            {hats.map((hat) => (
                                <li key={hat}>#{hat}</li>
                            ))}
                        </ul>
                    </Post>

                    <Post>
                        <p>
                            <span className=" font-semibold">
                                I’m not just a creative who happens to code.
                            </span>{" "}
                            I’ve built: Dynamic constraint-based schedule generator, Multiplayer horror game, Quad-tree based map viewer, Game stat laboratory calculator
                        </p>

                        <p>
                            All of them involved{" "}
                            <span className=" font-semibold">
                                real algorithmic problems
                            </span>
                            , and in each one optimization and maintainability
                            came first.
                        </p>
                        <p>
                            I know my way around relational and document
                            databases, and I understand how data moves through
                            a system. I also designed and architected the data
                            structures behind these projects myself, from how
                            the data is shaped and stored to how it flows
                            between each part, building the logic from the
                            ground up. And when things get slow,{" "}
                            <span className=" font-semibold">
                                I know how to optimize performance, whether
                                it’s on the rendering side or the network side.
                            </span>
                        </p>
                        <p>
                            Most of the time, I engineer experiences that
                            understand what the user needs. The creative part
                            is making them feel{" "}
                            <span className="text-accent-1 font-bold">
                                unique yet familiar
                            </span>
                            , something new enough to be memorable, but natural
                            enough that nobody has to learn it.
                        </p>
                    </Post>
                </div>
            </div>
        </section>
    )
}