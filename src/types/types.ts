

export interface nameAnimStateType {
    loaded: boolean,
    ended: boolean,
}



export type skillActiveStateType = "frontend" | "backend" | "other" | "design";
export type backgroundActiveStateType = "education" | "work";

export type heartAnimActiveStateType = "idle" | "initialized" | "transformed";

export type modalActiveStateType = "projects" | "contacts" | null;

export type resizeRegion = "mobile" | "tablet" | "desktop"
export interface skillInfo {
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
export interface projectInfo {
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

export interface projectDataType {
    projects: projectInfo[],
    isLoaded: boolean,
}

export interface animationLoadStateType {
    preload: boolean,
    postload: boolean
}

export interface modalStateType {
    activeModal: modalActiveStateType,
    modalInfo: projectInfo | null, // add contacts info type soon
}

export interface processImplementationDetailsType {
    type: string,
    offset: {
        first_leg_width_multiplier: number,
        second_leg_fixed_length: number,
        rotation_on_hover: number,
        rotation_on_hover_second_leg_length_offset: number[],
    },
    text_display: string,
}

export interface polygonRotationStateType {
    rotation_on_hover: number,
    rotation_on_hover_second_leg_length_offset: number[],
}

export interface cursorStateType {
    tooltip?: string,
    type: "default" | "pointer" | "text",
    
}