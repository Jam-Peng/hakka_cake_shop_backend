import { PiUserCircle, PiLockKeyLight } from "react-icons/pi"
// import { IoMdClose } from "react-icons/io";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { loginUser, loginMessage } = useContext(AuthContext)

  return (
    <section>
      <div className="flex justify-center items-center px-4 sm:px-8 min-h-screen">
        <div className="w-full md:w-5/12 lg:w-4/12 border rounded-md overflow-hidden bg-gray-50 ">

          <div className="py-2 px-4 bg-gray-500 text-gray-50">
            <span className="tracking-wide">後台管理系統</span>
          </div>

          <div className="px-8 pt-4">
            {loginMessage ? 
              <span className="text-rose-500">{loginMessage}</span>
                :
                null
            }
          </div>

          <div className="px-8 py-4">
            <form action="" className="space-y-4" onSubmit={loginUser}>
              <div className="flex items-center space-x-2">
                <label htmlFor="username">
                  <PiUserCircle size={30} />
                </label>
                <div className="w-11/12">
                  <input id="username" name="username" type="text" autoComplete="username" required
                    placeholder="Account / 會員帳號"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="input_set"/>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <label htmlFor="password">
                  <PiLockKeyLight size={30}/>
                </label>
                <div className="w-11/12">
                  <input id="password" name="password" type="password" autoComplete="current-password" required
                    placeholder="Password / 會員密碼" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="input_set"/>
                </div>
              </div>
              <div className="text-start py-4">
                <button
                  className ="btn-md btn-in w-full"
                  type="submit"
                >
                  <span>登入</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </section>
  )
}

export default Login