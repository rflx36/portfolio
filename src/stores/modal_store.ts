import { create } from "zustand";
import type { MutatorModalStateType } from "../types/store_types";
import { modalStateDefaults } from "../constants";




export const useModalStore = create<MutatorModalStateType>((change) => ({
    get: modalStateDefaults,
    set: (x?) => change((x != undefined) ? { get: x } : (state) => ({ get: state.get }))
}))