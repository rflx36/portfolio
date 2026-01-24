

export interface nameAnimStateType {
    loaded: boolean,
    ended: boolean,
}



export type skillActiveStateType = "frontend" | "backend" | "other" | "design";


 interface skillInfo {
    name: string,
    url: string,
}

export interface skillDataType {
    design: skillInfo[],
    frontend: skillInfo[],
    backend: skillInfo[],
    other: skillInfo[],
    isLoaded: boolean,
}

