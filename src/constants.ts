import type { backgroundActiveStateType, backgroundDataType, nameAnimStateType, ProjectDataType, skillActiveStateType, skillDataType } from "./types";




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

export const backgroundDataDefaults:backgroundDataType = {
    education: [],
    work: [],
    isLoaded: false,
}

export const projectsDataDefaults: ProjectDataType= {
    projects: [],
    isLoaded: false,
}