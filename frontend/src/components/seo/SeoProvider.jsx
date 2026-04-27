import { createContext, useContext } from 'react'

const SeoContext = createContext(null)

export function SeoProvider({ children, value = null }) {
  return <SeoContext.Provider value={value}>{children}</SeoContext.Provider>
}

export function useSeoContext() {
  return useContext(SeoContext)
}
