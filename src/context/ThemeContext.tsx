import { createContext, useContext } from 'react'

export type Theme = 'dark' | 'light' | 'system'
export const ThemeContext = createContext<Theme | null>('system')

export function ThemeProvider({ children, value }: { children: React.ReactNode; value: Theme }) {
    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useGetTheme() {
    return useContext(ThemeContext)
}

