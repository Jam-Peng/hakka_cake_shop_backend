import { createContext, useState } from 'react'

export const SideBarContext = createContext()

function SideBarProvider({ children }) {
  const [helpOpen, setHelpOpen] = useState(false)
  const [openBlackClient, setOpenBlackClient] = useState(false)
  const [openDeleteStaff, setOpenDeleteStaff] = useState(false)

  const openClientList = () => {
    setOpenBlackClient(!openBlackClient)
  }

  const openStaffList = () => {
    setOpenDeleteStaff(!openDeleteStaff)
  }

  const contextData = {
    helpOpen : helpOpen,
    setHelpOpen : setHelpOpen,
    openBlackClient : openBlackClient, 
    setOpenBlackClient : setOpenBlackClient,
    openDeleteStaff : openDeleteStaff,
    setOpenDeleteStaff: setOpenDeleteStaff,
    
    openClientList : openClientList, 
    openStaffList : openStaffList,
  }

  return (
    <SideBarContext.Provider value={contextData}>
      {children}
    </SideBarContext.Provider>
  )
}

export default SideBarProvider