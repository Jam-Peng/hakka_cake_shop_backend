import { createContext, useCallback, useContext, useEffect, useState } from "react"
import jwt_decode from 'jwt-decode'
import { useNavigate } from "react-router-dom"
import { NavBarContext } from "./NavBarContext"
import { StaffContext } from "./StaffContext"

export const AuthContext = createContext()

function AuthProvider({ children }) {
  const navigate = useNavigate()
  const { setUserOpen, setAccountOpen } = useContext(NavBarContext)
  const { getStaffs } = useContext(StaffContext)
  const [authToken, setAuthToken] = useState(()=>localStorage.getItem("authToken") ? JSON.parse(localStorage.getItem("authToken")) : null)
  const [currentUser, SetCurrentUser] = useState(()=>localStorage.getItem("authToken") ? jwt_decode(localStorage.getItem("authToken")) : null)
  const [loading, setLoading] = useState(true)
  const [loginMessage, setLoginMessage] = useState('')
  const [openStaffModel, setOpenStaffModel] = useState(false)
  const [isStaff, setIsStaff] = useState(true)
  const [staffMessage, setStaffMessage] = useState('')
  const [userName, setUserName] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [staffName, setStaffName] = useState('')
  const [email, setEmail] = useState('')
  
  const apiurl = "http://127.0.0.1:8000/api/v1"

  
  // 登入
  const loginUser = async (e) => {
    e.preventDefault()
    let response = await fetch(`${apiurl}/token/`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({"username": e.target.username.value, "password": e.target.password.value})
    })
    const data = await response.json()
    if (response.status === 200) {
      setAuthToken(data)                                          // 儲存 access 和 refresh token
      SetCurrentUser(jwt_decode(data.access))                     // 解碼 access token
      localStorage.setItem("authToken", JSON.stringify(data));    // 將 token儲存到 localStorage
      navigate('/dashboard')
    } else {
      alert('無法取得連線')
    }
  }
  
  // 登出
  const logoutUser = useCallback(() => {
    setAuthToken(null)
    SetCurrentUser(null)
    localStorage.removeItem("authToken");
    setUserOpen(false)
    setAccountOpen(false)
    navigate('/')
  },[navigate, setUserOpen, setAccountOpen]) 
  

  // 更新 token
  const updateToken = useCallback(async () => {
    // console.log("更新token被觸發")
    let response = await fetch("http://127.0.0.1:8000/api/v1/token/refresh/", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({ "refresh": authToken?.refresh})
    })
    const data = await response.json()
    if (response.status === 200) { 
      setAuthToken(data)                                         
      SetCurrentUser(jwt_decode(data.access))                     
      localStorage.setItem("authToken", JSON.stringify(data)); 
    } else {
      logoutUser()
    }

    if (loading) {
      setLoading(false)
    }
  },[authToken?.refresh, loading, logoutUser]) 

  useEffect(() => {
    if (loading) {
      updateToken()
    }

    const fourMinutes = 58 * 60 * 1000      // 因為後端設定 token到期時間為 59分鐘，這裡設定 58分鐘後使用 refresh token重新取得新 token
    let interval = setInterval(() => {
      if (authToken) {
        updateToken()
      }
    }, fourMinutes)
    return () => clearInterval(interval)

  },[authToken, loading, updateToken])


  // 註冊、更新
  const handleStaffForm = async (e) => {
    e.preventDefault()

    if (e.target.password1.value !== e.target.password2.value) {
      setStaffMessage('請確認密碼是否相同')
    } else if (e.target.password1.value.length < 8 ) {
      setStaffMessage('密碼長度最少8碼英數字')
    } else {
      if (isStaff === true) {
        let response = await fetch(`${apiurl}/staff_set/`, {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "username": e.target.userName.value,
            "password1": e.target.password1.value,
            "password2": e.target.password2.value,
            "name": e.target.staffName.value,
            "email": e.target.email.value,
          })
        })
        const data = await response.json()
        if (response.status === 201) {
          setStaffMessage(data['message'])
  
        } else {
          setStaffMessage(data['message'])
        }
      } else {
        const id = currentUser.user_id
        let response = await fetch(`${apiurl}/staff_set/${id}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            "username": e.target.userName.value,
            "password1": e.target.password1.value,
            "name": e.target.staffName.value,
            "email": e.target.email.value,
          })
        })
        const data = await response.json()
        if (response.status === 200) {
          setStaffMessage(data['message'])
  
        } else {
          setStaffMessage(data['message'])
        }
      }
    }
    
    setTimeout(() => {
      setStaffMessage('')
      setOpenStaffModel(false)
      cleanForm()
      getStaffs()
    }, 2000)
  }

  // 清除表單
  const cleanForm = () => {
    setUserName('')
    setPassword1('')
    setPassword2('')
    setStaffName('')
    setEmail('')
  }


  const contextData = {
    currentUser : currentUser,
    authToken : authToken,
    openStaffModel : openStaffModel,
    setOpenStaffModel : setOpenStaffModel,
    isStaff : isStaff,
    setIsStaff : setIsStaff,
    loginMessage : loginMessage,
    setLoginMessage : setLoginMessage,
    staffMessage : staffMessage,
    setStaffMessage : setStaffMessage,
    userName : userName,
    setUserName : setUserName,
    password1 : password1,
    setPassword1 : setPassword1,
    password2 : password2,
    setPassword2 : setPassword2,
    staffName : staffName,
    setStaffName : setStaffName,
    email : email,
    setEmail : setEmail,

    loginUser : loginUser,
    logoutUser : logoutUser,
    handleStaffForm: handleStaffForm,
    cleanForm : cleanForm,
  }

  return (
    <AuthContext.Provider value={contextData}>
      { loading ? null : children }
    </AuthContext.Provider>
  )
}

export default AuthProvider