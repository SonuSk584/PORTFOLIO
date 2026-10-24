import { useEffect } from 'react'
const KEY = 'portfolio-scroll'
export function useScrollRestore() {
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const saved = Number(sessionStorage.getItem(KEY)) || 0
    if (saved && !location.hash) {
      const loaded = document.readyState === 'complete' ? Promise.resolve() : new Promise((r) => addEventListener('load', r, { once: true }))
      loaded.then(() => document.fonts?.ready).then(() => setTimeout(() => {
        const el = document.documentElement
        el.style.scrollBehavior = 'auto'; scrollTo(0, saved); el.style.scrollBehavior = ''
      }, 120))
    }
    let t
    const onScroll = () => { clearTimeout(t); t = setTimeout(() => sessionStorage.setItem(KEY, String(scrollY)), 120) }
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])
}