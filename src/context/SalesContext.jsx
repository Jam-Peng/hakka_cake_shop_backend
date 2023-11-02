import { createContext, useCallback, useState } from 'react'

export const SalesContext = createContext()

function SalesProvider( { children }) {
  const [currentStatData, setCurrentStatData] = useState([])
  const [isOpenChart, setIsOpenChart] = useState(false)
  const [orderStatData, setOrderStatData] = useState({})   // 資料視覺化用
  const [searchDateQ, setSearchDateQ] = useState('')
  const [searchStatMessage, setSearchStatMessage] = useState('')

  const apiurl = "http://127.0.0.1:8000/api/v1"

  // 取得當日訂單統計資料
  const getCurrentOrderStat = useCallback(async () => {
    const response = await fetch(`${apiurl}/daily_order_stats/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setCurrentStatData(data)
    }
  }, []);

  // 取得每月訂單統計資料 (目前年度)
  const getMonthsOrderStat = useCallback(async () => {
    const response = await fetch(`${apiurl}/monthly_order_stats/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setCurrentStatData(data)
    }
  }, []);

  // 取得當年度訂單統計資料
  const getYearOrderStat = useCallback(async () => {
    const response = await fetch(`${apiurl}/yearly_order_stats/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setCurrentStatData(data)
    }
  }, []);


  // 取得一個訂單統計資料 - 資料視覺化用
  const getOneOrderForChart = (order_index) => {
    let order = currentStatData.find((item, index) => {
      return index === order_index
    })
    setOrderStatData({ ...order });
  };


  // 取得查詢的日期訂單統計資料
  const getSearchDateOrderState = async () => {
    const currentDate = new Date()
    const searchDate = new Date(searchDateQ)

    if (searchDateQ === '') {
      getCurrentOrderStat()
    } else if (searchDate > currentDate){
      setSearchStatMessage('尚未有訂單')
    } else {
      const response = await fetch(`${apiurl}/search_date_order_stats/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "search": searchDateQ }),
      })
      const data = await response.json()
      if (response.status === 200) {
        setCurrentStatData(data)
      }
    }

    setTimeout(() => {
      setSearchDateQ('')
      setSearchStatMessage('')
    },1800)
  }

  const contextData = {
    currentStatData : currentStatData,
    isOpenChart : isOpenChart,
    setIsOpenChart : setIsOpenChart,
    orderStatData : orderStatData,
    searchDateQ : searchDateQ,
    setSearchDateQ : setSearchDateQ,
    searchStatMessage : searchStatMessage,

    getCurrentOrderStat : getCurrentOrderStat,
    getMonthsOrderStat : getMonthsOrderStat,
    getYearOrderStat : getYearOrderStat,
    getOneOrderForChart : getOneOrderForChart,
    getSearchDateOrderState : getSearchDateOrderState,
  }

  return (
    <SalesContext.Provider value={contextData}>
      { children }
    </SalesContext.Provider>
  )
}

export default SalesProvider