import { useCursorStore } from '../stores/cursor_store'
import type { cursorStateType } from '../types/types'

export function useCursor({ tooltip, type = "default" }: cursorStateType) {
  const cursor = useCursorStore()


  const onMouseEnter = () => {
    if (tooltip !== undefined) {
      cursor.get.tooltip = tooltip
    }
    cursor.get.type = type
    cursor.set();
  }

  const onMouseLeave = () => {
    cursor.get.type = "default"
    cursor.get.tooltip = undefined;
    cursor.set();
  }

  return { onMouseEnter, onMouseLeave }
}