import React from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const ClientContext = createContext()

function ClientProvider({ children }) {
  const [openClientItem, setOpenClientItem] = useState(null)
  const [openClientItemInfo, setOpenClientItemInfo] = useState(null)
  const [getProductsForClientInfo, setGetProductsForClientInfo] = useState([])
  const [clientMessage, setClientMessage] = useState('')
  const [searchClientQ, setSearchClientQ] = useState('')
  const [getClients, setGetClients] = useState([])
  const [resultClients, setResultClients] = useState([])

const apiurl = "http://127.0.0.1:8000/api/v1"

// 取全部會員資料
  const getAllClient = useCallback( async() => {
    const response = await fetch(`${apiurl}/back_client_set/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setGetClients(data)
      setResultClients(data)
    } 

  }, []) 
  
  // 取得全部產品
  const getAllProductsForClient = useCallback(async () => {
    const response = await fetch(`${apiurl}/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setGetProductsForClientInfo(data)
    } 
  }, [])

  // 將會員加入黑名單 (將is_delete_client設為True)
  const addToBlackList = async (id) => {
    const response = await fetch(`${apiurl}/client_delete/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setClientMessage(data.message)
      getAllClient()
    } else {
      setClientMessage(data.message)
    }

    setTimeout(() => {
      setClientMessage('')
    }, 1800)
  }

  // 查詢會員
  const searchClient = async () => {
    const response = await fetch(`${apiurl}/client/search/?search=${searchClientQ}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()

    const tempData = []
    if (response.status === 200) {
      // 解決原本搜尋後大頭照無法帶有host位置，改用搜尋後和原本的會員資料做篩選
      data.forEach(item => {
        const filterData = getClients.find(client => {
          return client.id === item.id
        })
        tempData.push(filterData)
      });
      setResultClients(tempData)
    } 
    setSearchClientQ('')
  }
  

  const contextData = {
    getClients: getClients,
    resultClients : resultClients,
    openClientItem : openClientItem,
    setOpenClientItem : setOpenClientItem,
    openClientItemInfo : openClientItemInfo,
    setOpenClientItemInfo : setOpenClientItemInfo,
    getProductsForClientInfo : getProductsForClientInfo,
    clientMessage : clientMessage,
    searchClientQ : searchClientQ,
    setSearchClientQ : setSearchClientQ,

    getAllClient : getAllClient,
    getAllProductsForClient : getAllProductsForClient,
    addToBlackList : addToBlackList,
    searchClient : searchClient,
  }

  return (
    <ClientContext.Provider value={contextData}>
      { children }
    </ClientContext.Provider>
  )
}

export default ClientProvider