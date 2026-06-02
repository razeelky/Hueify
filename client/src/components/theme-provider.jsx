import { createContext, useContext, useEffect, useState } from "react"

const initialState = {
  theme: "system",
  setTheme: () => null,
}

export const ThemeProviderContext = createContext(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const applyTheme = () => {
      root.classList.remove("light", "dark", "premium")

      if (theme === "system") {
        const systemTheme = mediaQuery.matches ? "dark" : "light"

        root.classList.add(systemTheme)
        return
      }

      // Support a special 'premium' theme that applies the premium token set
      if (theme === "premium") {
        root.classList.add("premium")
        return
      }

      root.classList.add(theme)
    }

    applyTheme()

    if (theme !== "system") return undefined

    mediaQuery.addEventListener("change", applyTheme)
    return () => mediaQuery.removeEventListener("change", applyTheme)
  }, [theme])

  const value = {
    theme,
    setTheme: (nextTheme) => {
      localStorage.setItem(storageKey, nextTheme)
      setTheme(nextTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (!context) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
