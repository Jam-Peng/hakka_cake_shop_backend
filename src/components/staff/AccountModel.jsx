import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

function AccountModel() {
  const { openStaffModel, setOpenStaffModel, isStaff, handleStaffForm, staffMessage, cleanForm,
          userName, setUserName, password1, setPassword1, password2, setPassword2,
          staffName, setStaffName, email, setEmail} = useContext(AuthContext)


  return (
    <section className={`${openStaffModel ?  "opacity-1 scale-100 bg-slate-50/90" : "opacity-0 scale-0 bg-slate-0"} 
      pb-10 absolute w-full h-[772px] top-10 flex justify-center items-center transition-all duration-500 z-30 border rounded-r`}>
      <div className="overflow-hidden border rounded-lg bg-stone-50  shadow-lg md:w-5/12 xl:max-w-6/12">
        <div className={"h-[520px] bg-gray-200 rounded-md  overflow-hidden"} >
          <div className="flex items-center justify-between py-2 px-4 bg-rose-500 text-gray-50">
            <div>
              <span className="text-lg">{isStaff ? '新進員工註冊' : '修改帳號'}</span>
            </div>
            <button className="hover:text-gray-200" onClick={() => { setOpenStaffModel(false); cleanForm()}}>
              <IoMdClose size={22} />
            </button>
          </div>

          <div className="p-6">
            <form action="" className="space-y-10" onSubmit={handleStaffForm}>
              <div className="space-y-4">
                {staffMessage ? 
                  <span className="text-rose-500">{staffMessage}</span>
                  :
                  null
                }
                <div>
                  <label htmlFor="usernName">帳號</label>
                  <input type="text" id="userName" name="userName"
                    className="block w-full rounded-md py-1 px-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="staffName">姓名</label>
                  <input type="text" id="staffName" name="staffName"
                    className="block w-full rounded-md py-1 px-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                    value={staffName}
                    onChange={e => setStaffName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email">email</label>
                  <input type="email" id="email" name="email"
                    className="block w-full rounded-md py-1 px-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password1">密碼</label>
                  <input type="password" id="password1" name="password1"
                    className="block w-full rounded-md py-1 px-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                    value={password1}
                    onChange={e => setPassword1(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password2">確認密碼</label>
                  <input type="password" id="password2" name="password2"
                    className="block w-full rounded-md py-1 px-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                    value={password2}
                    onChange={e => setPassword2(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <button className="btn-md btn-in w-full">
                  <span>確認</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AccountModel