import type { animationLoadStateType, backgroundActiveStateType, backgroundDataType, cursorStateType, modalStateType, nameAnimStateType, polygonRotationStateType, projectDataType, relativeSkillsPositioningMapType, skillActiveStateType, skillDataType } from "./types/types";




export const nameAnimStateDefaults: nameAnimStateType = {
    loaded: false,
    ended: false
}

export const skillActiveStateDefaults: skillActiveStateType = "frontend";
export const backgroundActiveStateDefaults: backgroundActiveStateType = "education";

export const skillDataDefaults: skillDataType = {
    design: [],
    frontend: [],
    backend: [],
    other: [],
    isLoaded: false,
}

export const backgroundDataDefaults: backgroundDataType = {
    education: [],
    work: [],
    isLoaded: false,
}

export const projectsDataDefaults: projectDataType = {
    projects: [],
    isLoaded: false,
}

export const animationLoadStateDefaults: animationLoadStateType = {
    preload: false,
    postload: false
}

export const modalStateDefaults: modalStateType = {
    activeModal: null,
    modalInfo: null,
}

export const polygonRotationStateDefaults: polygonRotationStateType = {
    rotation_on_hover: 0,
    rotation_on_hover_second_leg_length_offset: [0, 0, 0, 0, 0, 0, 0]
}


export const scrollDefaults: ScrollIntoViewOptions = {
    behavior: 'smooth',
    block: 'start'
}

export const cursorStateDefaults: cursorStateType = {
    tooltip: undefined,
    type: "default"
}


export const activeRelativeSkillPositioningMap: relativeSkillsPositioningMapType = {
    "design": 0,
    "frontend": 1,
    "backend": 2,
    "other": 3
}
