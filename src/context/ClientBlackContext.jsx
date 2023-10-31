import React, { createContext, useCallback, useState } from 'react'

export const ClientBlackContext = createContext()

function ClientBlackProvider({ children }) {
  const [blackClient, setBlackClient] = useState([])
  const [blackClientMessage, setBlackClientMessage] = useState('')
  
  const apiurl = "http://127.0.0.1:8000/api/v1"

  // 取全部要被加入黑名單的會員
  const getAllBlackClient = useCallback( async() => {
    const response = await fetch(`${apiurl}/client_black_set/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setBlackClient(data)
    } 
  }, [])

  // 取回要刪除的會員
  const retrieve = async (id) => {
    const response = await fetch(`${apiurl}/client_black_set/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setBlackClientMessage(data.message)
      getAllBlackClient()
    } else {
      setBlackClientMessage(data.message)
    }

    setTimeout(() => {
      setBlackClientMessage('')
    }, 1800)
  }

  // 從資料庫中刪除會員
  const deleteClient = async (id) => {
    const response = await fetch(`${apiurl}/client_delete_from_db/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
    if (response.status === 204) {
      setBlackClientMessage("已將會員刪除")
      getAllBlackClient()
    } else {
      const data = await response.json()
      setBlackClientMessage(data.message)
    }

    setTimeout(() => {
      setBlackClientMessage('')
    }, 1800)
  }

  const contextData = {
    blackClient : blackClient,
    blackClientMessage : blackClientMessage,
    
    getAllBlackClient : getAllBlackClient,
    retrieve : retrieve,
    deleteClient : deleteClient,
  }

  return (
    <ClientBlackContext.Provider value={contextData}>
      { children }
    </ClientBlackContext.Provider>
  )
}

export default ClientBlackProvider