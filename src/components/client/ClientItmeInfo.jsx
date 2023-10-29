import { useContext } from "react"
import { ClientContext } from "../../context/ClientContext"

function ClientItmeInfo({ item }) {
  const { getProductsForClientInfo } = useContext(ClientContext)

  // 取回訂單內的商品資料
  const orderProduct = getProductsForClientInfo.find(product => {
    return product.id === item.product
  })
  const { quantity } = item

  return (
    <section>
      <div className="flex items-center px-1 pb-1 space-x-3 text-slate-800/70">
        <div className="w-2/12">
          <span>{orderProduct.category}</span>
        </div>
        <div className="w-5/12">
          <span>{orderProduct.name}</span>
        </div>
        <div className="w-2/12 px-2.5">
          <span>{quantity}</span>
        </div>
        <div className="w-2/12">
          <span>NT. {orderProduct.price}</span>
        </div>
      </div>  
    </section>
  )
}

export default ClientItmeInfo