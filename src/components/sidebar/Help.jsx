import { useContext } from "react"
import { SideBarContext } from "../../context/SideBarContext"
import { Link } from 'react-router-dom'

function Help() {
  const { helpOpen } = useContext(SideBarContext)

  const projectInfo_url = 'https://drive.google.com/file/d/1Wups9sJXrtaekjT-g4PlhXHNE3NWr9t_/view?usp=sharing'

  return (
    <section className={`${helpOpen ? 'bottom-12 left-2':'-bottom-full -left-0'} absolute w-[18vw] h-[18vh] transition-all duration-500 z-20 text-gray-100 bg-gray-500 border rounded-md`}>
      <div className="p-4 space-y-4">
        <Link to={projectInfo_url} target="_blank" className="grid hover:text-white">
          <span className="font-semibold">系統教學</span>
          <span className="text-sm">歡迎由此瀏覽相關操作教學手冊</span>
        </Link>
        <Link to={'/dashboard'} className="grid hover:text-white">
          <span className="font-semibold">聯絡管理中心</span>
          <span className="text-sm">如有操作問題歡迎與我們聯絡</span>
        </Link>
      </div>
    </section>
  )
}

export default Help