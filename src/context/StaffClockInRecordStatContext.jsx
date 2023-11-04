import { createContext, useCallback, useContext, useState } from 'react'
import { AuthContext } from './AuthContext'

export const StaffClockInRecordStatContext = createContext()

function StaffClockInRecordStatProvider({ children }) {
  const { authToken } = useContext(AuthContext)
  const [staffClockInOut, setStaffClockInOut] = useState([])              // 使用在比對搜尋員工
  const [resultStaffClockInOut, setResultStaffClockInOut] = useState([])  // 顯示取得打卡紀錄的結果
  const [showStaffClockInfo, setShowStaffClockInfo] = useState({})        // 檢視一個員工的打卡紀錄

  const [clockInOutMessage, setClockInOutMessage] = useState('')
  const [isOpenClockModel, setIsOpenClockModel] = useState(false)

  // 搜尋篩選用
  const [searchId, setSearchId] = useState('')
  const [searchDate, setSearchDate] = useState('')
  const [searchMonthRecord, setSearchMonthRecord]= useState({})
  const [isOpenSearchModel, setIsOpenSearchModel] = useState(false)

  const apiurl = "http://127.0.0.1:8000/api/v1"

  // 取得所有員工每個月打卡紀錄
  const getClockInOutRecords = useCallback( async() => {
    const response = await fetch(`${apiurl}/staff_clock_in_out_records/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + String(authToken.access)
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setStaffClockInOut(data)
      setResultStaffClockInOut(data)
    } else {
      setClockInOutMessage("系統連線失敗")
    }

    setTimeout(() => {
      setClockInOutMessage('')
    }, 1800)

  },[authToken])


  // 取得篩選一個員工的打卡紀錄
  const getOneStaffClockInStat = (id) => {
    let filterStaff = staffClockInOut.find(item => {
      return item.staff_id === id
    })
    setShowStaffClockInfo({ ...filterStaff })
  }

  // 解員工編號 (177284776-169903656- 6178)/2458314)
  const decodeId = (parseInt(searchId) - 169903656 - 6178) / 2458314 

  // 取得一個員工特定月份的打卡紀錄
  const getOneMonthClockRecord = useCallback(async () => {
    const response = await fetch(`${apiurl}/staff_one_month_clock_records/${decodeId}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: parseInt(searchDate) }),
    })
    const data = await response.json()
    if (response.status === 200) {
      setSearchMonthRecord(data)
      setIsOpenSearchModel(true)

    } else {
      setClockInOutMessage(data.message)
    }
    setTimeout(() => {
      setClockInOutMessage('')
    }, 1800)
  },[decodeId, searchDate]) 

  // 搜尋篩選員工或查詢員工特定月份打卡紀錄
  const sendSubmitSearch = useCallback(async (e) => {
    e.preventDefault()

    if (searchId === "" && searchDate === "") {
      getClockInOutRecords()

    }else if(searchId !== "" && searchDate !== ""){
      // 詢員工特定月份打卡紀錄
      getOneMonthClockRecord()

    } else {
       // 篩選員工
      let filterStaff = staffClockInOut.filter(item => {
        return item.staff_id === decodeId
      })

      setResultStaffClockInOut(filterStaff)
    } 

    setTimeout(() => {
      setSearchId("")
      setSearchDate("")
    }, 1800)
  },[decodeId, getClockInOutRecords, getOneMonthClockRecord, searchId, searchDate, staffClockInOut]) 


  const contextData = {
    resultStaffClockInOut : resultStaffClockInOut,
    clockInOutMessage : clockInOutMessage,
    isOpenClockModel : isOpenClockModel,
    setIsOpenClockModel : setIsOpenClockModel,
    showStaffClockInfo : showStaffClockInfo,
    setShowStaffClockInfo: setShowStaffClockInfo,
    searchId : searchId,
    setSearchId : setSearchId,
    searchDate : searchDate,
    setSearchDate : setSearchDate,
    isOpenSearchModel : isOpenSearchModel,
    setIsOpenSearchModel : setIsOpenSearchModel,
    searchMonthRecord : searchMonthRecord,
    setSearchMonthRecord : setSearchMonthRecord,

    getClockInOutRecords : getClockInOutRecords,
    getOneStaffClockInStat : getOneStaffClockInStat,
    getOneMonthClockRecord : getOneMonthClockRecord,
    sendSubmitSearch : sendSubmitSearch,
  }

  return (
    <StaffClockInRecordStatContext.Provider value={contextData}>
      { children }
    </StaffClockInRecordStatContext.Provider>
  )
}

export default StaffClockInRecordStatProvider