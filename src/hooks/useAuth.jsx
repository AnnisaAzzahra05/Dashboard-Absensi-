import { createContext, useContext, useState } from 'react'
import { USERS } from '../data/dummyData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (id, password) => {
    const found = USERS[id]
    if (found && found.password === password) {
      setUser(found)
      return { ok: true, role: found.role }
    }
    return { ok: false }
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
