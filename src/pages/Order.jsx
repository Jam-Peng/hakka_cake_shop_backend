import OrderSearchInput from "../components/order/OrderSearchInput"
import OrderList from "../components/order/OrderList"

function Order() {

  return (
    <section className="h-full p-4 space-y-4 relative overflow-hidden">
      <div className="border rounded-md bg-gray-100 px-4 py-4
                      flex items-center justify-between w-full overflow-x-hidden">
        <div className="flex items-center space-x-4">
          <div>
            <button className="btn-category">
              <span>全部訂單</span>
            </button>
          </div>
          <OrderSearchInput />
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-rose-500 hidden sm:block">訊息回饋</div>
          
        </div>
      </div>
      
      <div>
        <div className="border rounded-md bg-gray-100 sm:px-0 h-[580px] overflow-y-auto"> 
          <div className="p-4 text-base space-y-4">

            <div>
              <OrderList />
            </div>

          </div> 
        </div>
      </div>
    </section>
  )
}

export default Order