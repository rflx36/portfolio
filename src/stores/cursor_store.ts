import { create } from 'zustand'
import type { MutatorCursorStateType } from '../types/store_types'
import { cursorStateDefaults } from '../constants'


export const useCursorStore = create<MutatorCursorStateType>((change) => ({
    get: cursorStateDefaults,
    set: (x?) => change((x != undefined) ? { get: x } : (state) => ({ get: state.get }))
}))