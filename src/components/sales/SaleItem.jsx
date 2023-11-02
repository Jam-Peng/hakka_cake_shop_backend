


function SaleItem({ item }) {
  const { product_category, product_name, total_quantity, total_amount } = item

  return (
    <section>
      <div className="flex items-center px-1 pb-1 space-x-3 text-slate-800/70 hover:text-indigo-500">
        <div className="w-2/12">
          <span>{product_category}</span>
        </div>
        <div className="w-5/12">
          <span>{product_name}</span>
        </div>
        <div className="w-2/12 px-5">
          <span>{total_quantity}</span>
        </div>
        <div className="w-2/12">
          <span>NT. {total_amount}</span>
        </div>
      </div>  
    </section>
  )
}

export default SaleItem