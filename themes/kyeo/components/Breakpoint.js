import { useEffect, useState } from 'react'

export const useCurrentBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('xs')

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width >= 1400) setBreakpoint('2xl')
      else if (width >= 1200) setBreakpoint('xl')
      else if (width >= 1081) setBreakpoint('lg')
      else if (width >= 650) setBreakpoint('md')
      else if (width >= 480) setBreakpoint('sm')
      else setBreakpoint('xs')
    }

    window.addEventListener('resize', updateBreakpoint)
    updateBreakpoint()

    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return breakpoint
}