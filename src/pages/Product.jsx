import { MdFormatListBulletedAdd } from "react-icons/md";
import { useContext, useEffect} from "react"
import { AuthContext } from "../context/AuthContext"
import { ProductContext } from "../context/ProductContext";
import ProductList from "../components/product/ProductList"
import CreateUpdateModel from "../components/product/CreateUpdateModel";
import DeleteModel from "../components/product/DeleteModel";


function Product() {
  const { authToken } = useContext(AuthContext)
  const { getProducts, products, allProducts, productModel, setProductModel, productMessage,
    isNew, categoryByProducts } = useContext(ProductContext)
  const categorys = []

  
  useEffect(() => {
      getProducts()
  },[authToken, getProducts])

  // 取得不重複類別
  allProducts.forEach(item => {
    const productCategory = item.category;
    if (!categorys.includes(productCategory)) {
      categorys.push(productCategory)
    }
  })
  
  return (
    <section className="h-full p-4 space-y-4 relative overflow-hidden">
      <div className="border rounded-md bg-gray-100 px-4 py-2
                      flex items-center justify-between w-full overflow-x-hidden">
        <div className="space-x-4 whitespace-nowrap overflow-x-auto w-8/12 sm:w-9/12 py-2">
          <button className="btn-category" onClick={getProducts}>
            <span>全部</span>
          </button>
          {categorys.map(category => {
            return (
              <button className="btn-category" key={category} onClick={() => { categoryByProducts(category) }}>
                <span>{category}</span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center space-x-2">
          <div className="text-rose-500 hidden sm:block">{ productMessage }</div>
          <button className="btn-md btn-in flex space-x-1" onClick={() => { setProductModel(!productModel)}} disabled={!isNew}>
            <span>新增</span>
            <MdFormatListBulletedAdd size={22}/>
          </button>
        </div>
        
        <CreateUpdateModel/>
      </div>
      <DeleteModel />
      
      <div className="border rounded-md bg-gray-100 px-2 sm:px-0 py-4 h-[580px] overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="hidden sm:block">照片</th>
              <th className="text-left">類別</th>
              <th className="text-left">商品名稱</th>
              <th className="text-left px-3">售價</th>
              <th>上架</th>
              <th>
                <div className="flex items-center justify-center space-x-6">
                  <span>編輯</span>
                  <span className="hidden sm:block">刪除</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
              {products.map(product => {
                return (
                  <ProductList key={product.id} product={product} />
                )
              })}
          </tbody>
        </table>  
        
      </div>
      
    </section>
  )
}

export default Product