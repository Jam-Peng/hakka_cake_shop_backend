import logo from '../assets/logo.png'
import { BsListOl, BsInfoCircleFill, BsChevronUp,
  BsReceiptCutoff } from "react-icons/bs";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa"
import { AiOutlineTeam, AiOutlineBarChart } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { PiUserCircleMinus } from "react-icons/pi"
import { Link } from 'react-router-dom'
import Help from '../components/sidebar/Help';
import { useContext } from 'react';
import { SideBarContext } from '../context/SideBarContext';

function Sidebar() {
  const { helpOpen, setHelpOpen, openBlackClient, setOpenBlackClient, openDeleteStaff, setOpenDeleteStaff,
    openClientList, openStaffList } = useContext(SideBarContext)

  return (
    <section className='h-full flex flex-col justify-between tracking-wide relative'>
      <div className="flex flex-col space-y-8 p-4 ">
        <div className="flex items-center space-x-2">     
          <img src={logo} alt="Logo_Img" className="w-10 h-10"/>
          <div>
            <span className="font-semibold text-lg">客家糕粿店</span>
          </div>
        </div>

        <div>
          <ul className='space-y-4'>
            <li>
              <div>
                <Link to={'/dashboard'} rel="noopener noreferrer"
                  className='flex items-center space-x-2 hover:text-gray-700'>
                  <BsListOl size={25}/>
                  <span className="">商品管理</span>
                </Link>
              </div>
            </li>
            <li>
              <div>
                <Link to={'/dashboard/order'} rel="noopener noreferrer"
                  className='flex items-center space-x-2 hover:text-gray-700'>
                  <BsReceiptCutoff size={24}/>
                  <span className="">訂單管理</span>
                </Link>
              </div>
            </li>
            <li onMouseLeave={()=>{setOpenBlackClient(false)}}>
              <div>
                <div className='flex items-center space-x-9 hover:text-gray-700'>
                  <Link to={'/dashboard/client'} rel="noopener noreferrer" className='flex items-center space-x-2'>
                    <AiOutlineTeam size={24}/>
                    <span className="">會員管理</span>
                  </Link>
                  <div onClick={ openClientList }>
                    <IoIosArrowDown size={20} className={`transform ${openBlackClient ? 'rotate-180' : ''} cursor-pointer hover:text-rose-500`}/>
                  </div>
                </div>
                <div className={`${openBlackClient ? 'h-full' : 'h-0'} overflow-hidden transition-all duration-75 z-20 hover:text-indigo-500`}>
                  <Link to={'/dashboard/client_black'}>
                    <div className='flex items-center space-x-2 px-2 py-1'>
                      <FaUserCircle size={24}/>
                      <span>黑名單</span>
                    </div>
                  </Link>
                </div>
              </div>
            </li>
            <li onMouseLeave={()=>{setOpenDeleteStaff(false)}}>
              <div>
                <div className='flex items-center space-x-9 hover:text-gray-700'>
                  <Link to={'/dashboard/staff'} rel="noopener noreferrer" className='flex items-center space-x-2'>
                    <FaUsersBetweenLines size={24}/>
                    <span className="">員工管理</span>
                  </Link>
                  <div onClick={ openStaffList }>
                    <IoIosArrowDown size={20} className={`transform ${openDeleteStaff ? 'rotate-180' : ''} cursor-pointer hover:text-rose-500`}/>
                  </div>
                </div>
                <div className={`${openDeleteStaff ? 'h-full' : 'h-0'} overflow-hidden transition-all duration-75 z-20 hover:text-indigo-500`}>
                  <Link to={'/dashboard/staff_wait_delete'}>
                    <div className='flex items-center space-x-2 px-2 py-1'>
                      <PiUserCircleMinus size={24}/>
                      <span>待刪除員工</span>
                    </div>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <div>
                <Link to={'/dashboard/sales'} rel="noopener noreferrer"
                  className='flex items-center space-x-2 hover:text-gray-700'>
                  <AiOutlineBarChart size={24}/>
                  <span className="">銷售管理</span>
                </Link>
              </div>
            </li>

          </ul>
        </div>
      </div>

      <div className='py-2 px-4 bg-rose-500 text-gray-50'>
        <div className="flex justify-between">
          <div className='flex items-center space-x-2'>
            <BsInfoCircleFill size={20} />
            <span>協助中心</span>
          </div>
          <button onClick={()=>{setHelpOpen(!helpOpen)}}>
            <BsChevronUp size={16} />
          </button>
        </div>  
      </div>
      <Help/>
    </section>
  )
}

export default Sidebar