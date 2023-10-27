import { SlCalender } from "react-icons/sl";
import { BsTags, BsTelephone} from "react-icons/bs";
// import { FaTruck } from "react-icons/fa"
import { LuUser2 } from "react-icons/lu"
import { FiTrash2 } from "react-icons/fi";
import { RiTakeawayLine } from "react-icons/ri";


function OrderList() {
  return (
    <section className="border rounded-lg bg-white overflow-hidden">
      <div className="space-y-5 pb-2">
        <div className="py-2 px-4 bg-rose-500 text-white space-y-1">
          <div className="grid grid-cols-2 gap-52">
            <div className="space-x-2 flex items-center">
              <BsTags size={20}/>
              <span>訂單編號</span>
              <span className="tracking-wide">1234567890abcdefghijkl</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-x-2 flex items-center text-sm">
                <span><SlCalender size={20} /></span>
                <span> 2023-12-31 12:59 星期六 </span>
              </div>
              <div>
                <button className="btn-order_delete">
                  <FiTrash2 size={18}/>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-20 ">
            <div className="space-x-2 flex items-center">
              <span><LuUser2 size={20}/></span>
              <span>顧客姓名</span>
            </div>
            <div className="space-x-2 flex items-center">
              <span><BsTelephone size={17}/></span>
              <span>0912345678</span>
            </div>
            <div className="space-x-2 flex items-center">
              <span><RiTakeawayLine size={20}/></span>
              <span className="tracking-wide">運送地址</span>
            </div>
          </div>
        </div>
        
        <div className="px-4">
          <div className="flex items-center border-b px-1 pb-1 mb-1 font-medium space-x-3 text-slate-800">
            <div className="w-2/12">
              <span>類別</span>
            </div>
            <div className="w-5/12">
              <span>商品</span>
            </div>
            <div className="w-2/12">
              <span>數量</span>
            </div>
            <div className="w-2/12 px-3.5">
              <span>售價</span>
            </div>
          </div>

          {/* {item.current_course.map((obj) => (
            <div className="flex items-center px-1 pb-1 space-x-3 text-slate-800/70" key={obj.id}>
              <div className="w-2/12">
                  <span>{ obj.course_category }</span>
              </div>
              <div className="w-5/12">
                <span>{ obj.course_title }</span>
              </div>
              <div className="w-2/12">
                <span>{ obj.course_teacher }</span>
              </div>
              <div className="w-2/12">
                <span>$ { obj.course_price }</span>
              </div>
            </div>  
          ))} */}

        </div>
          <div className="px-4 text-end">
            <span>付款金額：</span>
            <span>NT. 3000</span>
          </div>
      </div>
    </section>
  )
}

export default OrderList