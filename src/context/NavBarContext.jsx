import { createContext, useState } from 'react'

export const NavBarContext = createContext()
function NavBarProvider({ children }) {
  const [userOpen, setUserOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)

  const contextData = {
    userOpen : userOpen,
    setUserOpen : setUserOpen,
    accountOpen : accountOpen,
    setAccountOpen : setAccountOpen
  }
  
  return (
    <NavBarContext.Provider value={contextData}>
      { children }
    </NavBarContext.Provider>
  )
}

export default NavBarProvider