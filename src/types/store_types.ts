import type { cursorStateType, modalStateType } from "./types";

export interface MutatorModalStateType {
    get: modalStateType,
    set: (property?: modalStateType) => void
}


export interface MutatorCursorStateType {
    get: cursorStateType,
    set: (property?: cursorStateType) => void
}