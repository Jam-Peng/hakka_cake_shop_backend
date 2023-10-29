import { createContext, useCallback, useState } from 'react'


export const StaffContext = createContext()
function StaffProvider({ children }) {
  const [staffs, setStaffs] = useState([])
  const [clockInMessage, setClockInMessage] = useState('')
  const [searchQ, setSearchQ] = useState('')

  const apiurl = "http://127.0.0.1:8000/api/v1"

  // 取得全部員工
  const getStaffs = useCallback(async () => {
    const response = await fetch(`${apiurl}/staffs/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setStaffs(data)
    } 
  }, [setStaffs]) 


  // 查詢員工
  const searchStaff = async () => {
    const response = await fetch(`${apiurl}/staffs/search/?search=${searchQ}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setStaffs(data)
      setSearchQ('')
    } 
  }

  // 查詢所有員工
  const searchStaffs = () => {
    getStaffs()
  }

  // 刪除員工 (設定員工的屬性is_delete=true)
  const cancelStaff = async (id) => {
    const response = await fetch(`${apiurl}/staff_delete/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setClockInMessage(data.message)
      getStaffs()
    } else {
      setClockInMessage(data.message)
    }
    setTimeout(() => {
      setClockInMessage('')
    }, 1800)
  }


  // 上班打卡紀錄
  const clockIn = async (id, authToken) => {
    const response = await fetch(`${apiurl}/clock-in/${id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + String(authToken.access) 
      }
    })
    const data = await response.json()
    if (response.status === 201) {
      setClockInMessage(data.message)
      getStaffs()
    } else {
      setClockInMessage(data.message)
    }

    setTimeout(() => {
      setClockInMessage('')
    }, 1800)
  }

  // 下班打卡紀錄
  const clockOut = async (id, authToken) => {
    const response = await fetch(`${apiurl}/clock-out/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + String(authToken.access) 
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setClockInMessage(data.message)
      getStaffs()
    } else {
      setClockInMessage(data.message)
    }
    
    setTimeout(() => {
      setClockInMessage('')
    }, 2000)
  }
  


  const contextData = {
    staffs : staffs,
    setStaffs : setStaffs,
    clockInMessage : clockInMessage, 
    setClockInMessage: setClockInMessage,
    searchQ : searchQ,
    setSearchQ : setSearchQ,
    
    getStaffs : getStaffs,
    clockIn : clockIn,
    clockOut : clockOut,
    searchStaff : searchStaff,
    searchStaffs: searchStaffs,
    cancelStaff : cancelStaff,
  }

  return (
    <StaffContext.Provider value={contextData}>
      { children }
    </StaffContext.Provider> 
  )
}

export default StaffProvider