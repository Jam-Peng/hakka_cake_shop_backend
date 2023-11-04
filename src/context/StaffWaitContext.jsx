import { createContext, useCallback, useState } from 'react'

export const StaffWaitContext = createContext()

function StaffWaitProvider({ children }) {
  const [waitHandleStaff, setWaitHandleStaff] = useState([])
  const [staffWaitMessage, setStaffWaitMessage] = useState('')

  const apiurl = "http://127.0.0.1:8000/api/v1"

  // 取全部要被加入待刪除區的員工
  const getAllWaitStaff = useCallback( async() => {
    const response = await fetch(`${apiurl}/staff_wait_set/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setWaitHandleStaff(data)
    } 
  }, [])

  // // 取回要刪除的員工
  const retrieveStaff = async (id) => {
    const response = await fetch(`${apiurl}/staff_wait_set/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setStaffWaitMessage(data.message)
      getAllWaitStaff()
    } else {
      setStaffWaitMessage(data.message)
    }

    setTimeout(() => {
      setStaffWaitMessage('')
    }, 1800)
  }
  // 從資料庫中刪除員工
  const deleteStaff = async (id) => {
    const response = await fetch(`${apiurl}/staff_delete_from_db/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    if (response.status === 204) {
      setStaffWaitMessage("已將員工刪除")
      getAllWaitStaff()
    } else {
      const data = await response.json()
      setStaffWaitMessage(data.message)
    }

    setTimeout(() => {
      setStaffWaitMessage('')
    }, 1800)
    
  }

  const contextData = {
    waitHandleStaff : waitHandleStaff,
    staffWaitMessage : staffWaitMessage,
    
    getAllWaitStaff : getAllWaitStaff,
    retrieveStaff : retrieveStaff,
    deleteStaff : deleteStaff,
  }

  return (
    <StaffWaitContext.Provider value={contextData}>
      { children }
    </StaffWaitContext.Provider>
  )
}

export default StaffWaitProvider