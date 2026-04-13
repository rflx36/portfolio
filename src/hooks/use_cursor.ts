import { useCursorStore } from '../stores/cursor_store'
import type { cursorStateType } from '../types/types'
import isMobile from '../utils/is_mobile'

export function useCursor({ tooltip, type = "default" }: cursorStateType) {
  const cursor = useCursorStore()


  const onMouseEnter = () => {
    if (isMobile()) {
      return;
    }

    if (tooltip !== undefined) {
      cursor.get.tooltip = tooltip
    }
    cursor.get.type = type
    cursor.set();
  }

  const onMouseLeave = () => {
    if (isMobile()) {
      return;
    }
    cursor.get.type = "default"
    cursor.get.tooltip = undefined;
    cursor.set();
  }

  return { onMouseEnter, onMouseLeave }
}