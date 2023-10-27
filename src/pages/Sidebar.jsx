import logo from '../assets/logo.png'
import {
  BsListOl, BsInfoCircleFill, BsChevronUp,
  BsReceiptCutoff } from "react-icons/bs";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { Link } from 'react-router-dom'
import Help from '../components/sidebar/Help';
import { useContext } from 'react';
import { SideBarContext } from '../context/SideBarContext';

function Sidebar() {
  const { helpOpen, setHelpOpen } = useContext(SideBarContext)

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
            <li>
              <div>
                <Link to={'/dashboard/staff'} rel="noopener noreferrer"
                  className='flex items-center space-x-2 hover:text-gray-700'>
                  <FaUsersBetweenLines size={24}/>
                  <span className="">員工管理</span>
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