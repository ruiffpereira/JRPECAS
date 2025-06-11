import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    const el = document.querySelector('.main-content') // Troque para a sua classe/div desejada
    if (el) {
      el.scrollTo({ top: 0 })
    }
  }, [pathname])

  return null
}
