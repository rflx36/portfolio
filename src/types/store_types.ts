import type { modalStateType } from "./types";

export interface MutatorModalStateType {
    get : modalStateType,
    set: (property?:  modalStateType) => void
}