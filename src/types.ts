

export interface nameAnimStateType {
    loaded: boolean,
    ended: boolean,
}



export type skillActiveStateType = "frontend" | "backend" | "other" | "design";
export type backgroundActiveStateType = "education" | "work";

interface skillInfo {
    name: string,
    img_url: string,
}

export interface skillDataType {
    design: skillInfo[],
    frontend: skillInfo[],
    backend: skillInfo[],
    other: skillInfo[],
    isLoaded: boolean,
}


export interface backgroundDataType {
    education: backgroundEducationType[],
    work: backgroundWorkType[],
    isLoaded: boolean,
}


export interface backgroundEducationType {
    school_name: string,
    school_image_url: string,
    sub_information: string,
    start_date: string,
    end_date: string,
}

export interface backgroundWorkType {
    company_name: string,
    company_image_url: string,
    role: string,
    start_date: string,
    end_date: string,
    description: string
}
export interface ProjectInfo {
     project_title: string,
    project_img_url: string,
    project_video_url: string,
    project_description: string,
    project_finished_date: string,
    project_tech_stack: string[],
    project_live_link: string,
    project_github_link: string,
    project_is_featured: boolean
}

export interface ProjectDataType {
   projects: ProjectInfo[],
    isLoaded: boolean,
}