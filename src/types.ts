

export interface nameAnimStateType {
    loaded: boolean,
    ended: boolean,
}



export type skillActiveStateType = "frontend" | "backend" | "other" | "design";


 interface skillInfo {
    name: string,
    imgUrl: string,
}

export interface skillDataType {
    design: skillInfo[],
    frontend: skillInfo[],
    backend: skillInfo[],
    other: skillInfo[],
    isLoaded: boolean,
}

