import { createContext, useState } from 'react'


export const SideBarContext = createContext()

function SideBarProvider({ children }) {
  const [helpOpen, setHelpOpen] = useState(false)


  const contextData = {
    helpOpen: helpOpen,
    setHelpOpen: setHelpOpen,
  }

  return (
    <SideBarContext.Provider value={contextData}>
      {children}
    </SideBarContext.Provider>
  )
}

export default SideBarProvider