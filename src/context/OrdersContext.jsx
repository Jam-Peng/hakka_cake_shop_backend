import { createContext, useCallback, useContext, useState } from 'react'
import { AuthContext } from "./AuthContext"
import { useNavigate } from 'react-router-dom'

export const OrdersContext = createContext()

function OrdersProvider({ children }) {
  const navigate = useNavigate()
  const { authToken } = useContext(AuthContext)
  const [allOrders, setAllOrders] = useState([])
  const [openAllOrderItem, setALLOpenOrderItem] = useState(null)
  const [getProductsForOrderItem, setGetProductsForOrderItem] = useState([])
  const [orderMessage, setOrderMessage] = useState('')
  const [searchOrderQ, setSearchOrderQ] = useState('')

  const apiurl = "http://127.0.0.1:8000/api/v1"

  // 取得全部訂單
  const getAllOrders = useCallback(async () => {
    if (!authToken) {
      navigate('/')
    } else {
      const response = await fetch(`${apiurl}/all_orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + String(authToken.access) 
        }
      })
      const data = await response.json()
      if (response.status === 200) {
        setAllOrders(data)
      } 
    }
  }, [authToken, navigate]) 

  // 取得全部產品
  const getAllProductsForOrder = useCallback(async () => {
    const response = await fetch(`${apiurl}/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setGetProductsForOrderItem(data)
    } 
  }, []) 

  // 刪除一筆訂單
  const deleteOrderFromDb = useCallback(async (id) => {
    const response = await fetch(`${apiurl}/delete_order/${id}/`, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + String(authToken.access) 
      }
    })
    
    if (response.status === 204) {
      setOrderMessage("已成功刪除訂單")
      getAllOrders()
    } else {
      const data = await response.json()
      setOrderMessage(data['message'])
    }

    setTimeout(() => {
      setOrderMessage('')
    }, 2000)
  }, [authToken, getAllOrders]) 

  // 查詢一筆訂單
  const searchUserOrder = async () => {
    const response = await fetch(`${apiurl}/order/search/?search=${searchOrderQ}/`, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + String(authToken.access)
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setAllOrders(data)
      setSearchOrderQ('')
    } 
  }

  const contextData = {
    allOrders: allOrders,
    openAllOrderItem : openAllOrderItem,
    setALLOpenOrderItem : setALLOpenOrderItem,
    getProductsForOrderItem : getProductsForOrderItem,
    orderMessage : orderMessage,
    searchOrderQ : searchOrderQ, 
    setSearchOrderQ : setSearchOrderQ,

    getAllOrders : getAllOrders,
    getAllProductsForOrder : getAllProductsForOrder,
    deleteOrderFromDb : deleteOrderFromDb,
    searchUserOrder : searchUserOrder,
  }

  return (
    <OrdersContext.Provider value={contextData}>
      { children }
    </OrdersContext.Provider>
  )
}

export default OrdersProvider