import { useEffect, useRef, useState } from 'react'
import { useCursorStore } from '../../../stores/cursor_store'
import { useLocation } from 'react-router';
import CursorDefault from './cursor_default';
import CursorPointer from './cursor_pointer';
import CursorText from './cursor_text';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const location = useLocation();
  const cursor = useCursorStore()
  const [isInitialized, setIsInitialized] = useState(false);
  const [isVisible, setIsVisible] = useState(true)
  useEffect(() => {
    const element = cursorRef.current
    if (!element) return
    let raf: number

    const onMouseMove = (e: MouseEvent) => {
      if (!isInitialized) {
        setIsInitialized(true);
      }

      raf = requestAnimationFrame(() => {
        element.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      })
    }


    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(raf)
    }
  }, [cursorRef.current])


  useEffect(() => {
    cursor.get.tooltip = undefined;
    cursor.get.type = "default";
    cursor.set();
  }, [location.pathname])


  console.log(cursor.get);


  const getCursorStyle = () => {

    switch (cursor.get.type) {

      case "default":
        return <CursorDefault />;

      case "pointer":
        return <CursorPointer />;

      case "text":
        return <CursorText />;

      default:
        return <></>
    }

  }

  return (

    <div
      ref={cursorRef}
      className={`pointer-events-none fixed ${isVisible ? "opacity-100" : "opacity-0"} left-0 top-0 z-9999 ${isInitialized ? "-translate-x-2 -translate-y-2" : "-translate-x-10 -translate-y-10"}`}
      style={{ willChange: 'transform' }}
    >

      {getCursorStyle()}


      <div className={`absolute left-7 top-1 px-2.5 py-1 text-xs font-semibold bg-text text-bg  whitespace-nowrap shadow-lg origin-left  ease-smooth   ${cursor.get.tooltip != undefined ? "duration-150 scale-100 opacity-100 rounded-md" : " duration-150 scale-0 rounded-none -translate-x-7 opacity-0"}`}>
        {cursor.get?.tooltip}
        <span className="absolute -left-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
      </div>

    </div>
  )
}