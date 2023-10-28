import { useContext } from "react"
import { OrdersContext } from "../../context/OrdersContext"

function OrderItems({ item }) {
  const { getProductsForOrderItem } = useContext(OrdersContext)
  
// 取回訂單內的商品資料
const orderItem = getProductsForOrderItem.find(product => {
  return product.id === item.product
})
const { quantity } = item

  return (
    <section>
      <div className="flex items-center px-1 pb-1 space-x-3 text-slate-800/70">
        <div className="w-2/12">
          <span>{orderItem.category}</span>
        </div>
        <div className="w-5/12">
          <span>{orderItem.name}</span>
        </div>
        <div className="w-2/12">
          <span>{quantity}</span>
        </div>
        <div className="w-2/12">
          <span>$ {orderItem.price}</span>
        </div>
      </div>  
    </section>
  )
}

export default OrderItems