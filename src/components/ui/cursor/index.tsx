import { useEffect, useRef, useState } from 'react'
import { useCursorStore } from '../../../stores/cursor_store'
import { useLocation } from 'react-router';
import { useCursor } from '../../../hooks/use_cursor';
import { cursorStateDefaults } from '../../../constants';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const location = useLocation();
  const cursor = useCursorStore()
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    const element = cursorRef.current
    if (!element) return
    let raf: number

    const move = (e: MouseEvent) => {
      if (!isInitialized) {
        setIsInitialized(true);
      }

      raf = requestAnimationFrame(() => {
        element.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      })
    }

    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [cursorRef.current])


  useEffect(() => {
    cursor.get.tooltip = undefined;
    cursor.get.type = "default";
    cursor.set();
  }, [location.pathname])


  console.log(cursor.get);
  return (

    <div
      ref={cursorRef}
      className={`pointer-events-none fixed left-0 top-0 z-9999 ${isInitialized ? "-translate-x-2 -translate-y-2" : "-translate-x-10 -translate-y-10"}`}
      style={{ willChange: 'transform' }}
    >

      {cursor.get.type == "pointer" ? (

        <svg width="21" height="22" className='fill-bg stroke-text' viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg" >
          <path d="M4.85657 6.87133C1.4597 2.62147 2.36956 1.50086 3.5915 1.15744C4.41645 0.658611 6.62527 1.11016 9.35221 6.26444C11.8634 4.82914 13.4371 6.19313 13.9101 7.05453C21.1765 5.48953 19.4808 17.623 19.4808 17.623C19.4808 17.623 13.5571 19.9521 11.0914 20.8043C9.50429 20.091 5.45167 17.6925 2.19571 14.8432C-1.06026 11.9939 2.91354 9.39026 7.17834 12.2201C8.04805 11.9984 8.23615 11.0996 4.85657 6.87133Z" />
          <path d="M10.2443 8.08499C9.94168 7.42124 9.64398 6.81592 9.35221 6.26444M13.9101 7.05453C21.1765 5.48953 19.4808 17.623 19.4808 17.623C19.4808 17.623 13.5571 19.9521 11.0914 20.8043C9.50429 20.091 5.45167 17.6925 2.19571 14.8432C-1.06026 11.9939 2.91354 9.39026 7.17834 12.2201C8.04805 11.9984 8.23615 11.0996 4.85657 6.87133C1.4597 2.62147 2.36956 1.50086 3.5915 1.15744C4.41645 0.658611 6.62527 1.11016 9.35221 6.26444M13.9101 7.05453C13.4371 6.19313 11.8634 4.82914 9.35221 6.26444M13.9101 7.05453L14.6091 8.65959" shapeRendering="geometricPrecision" strokeWidth="1.5" strokeLinecap="round" />
        </svg>


      ) : (
        <>

          <svg width="18" height="25" className='fill-text stroke-bg' viewBox="0 0 18 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.74544 22.7032L1.00439 1.88281L15.8348 14.9337L8.23673 15.0515L3.74544 22.7032Z" strokeWidth="1.5" strokeLinecap="round" />
          </svg>


        </>
      )}



      {/* Tooltip bubble */}
     


      <div className={`absolute left-7 top-1 px-2.5 py-1 text-xs font-semibold bg-text text-bg  whitespace-nowrap shadow-lg origin-left  ease-smooth   ${cursor.get.tooltip != undefined ? "duration-150 scale-100 opacity-100 rounded-md": " duration-150 scale-0 rounded-none -translate-x-7 opacity-0"}`}>
        {cursor.get?.tooltip}
        <span className="absolute -left-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
      </div>

    </div>
  )
}