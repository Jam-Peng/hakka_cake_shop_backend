import { useContext } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FiTrash2 } from "react-icons/fi";
import { ProductContext } from "../../context/ProductContext";

function ProductList({ product }) {
  const {productModel, setProductModel, getOneProduct, productShow, setDeleteModel} = useContext(ProductContext)

  const { id, name, price, image, category, complete } = product;

  // 處理checkbox商品是否在前台顯示
  const handleComplete = () => {
    productShow(id, complete)
  }


  return (
    <>
      <tr>
        <td className="py-2 hidden sm:block">
          <div className="flex justify-center items-center w-full h-full">
            <div className="w-12">
              <img className="rounded-lg" src={image} alt={`${ name }照片`}/>
            </div>
          </div>
        </td>
        <td className="py-2">{ category }</td>
        <td>{ name }</td>
        <td className="text-left">NT. { price }</td>
        <td>
          <div className="flex items-center justify-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked={ complete } onChange={handleComplete}/>
                <div className="switch_checkbox dark:peer-focus:ring-indigo-500 rounded-full peer peer-focus:outline-none 
                  peer-focus:ring-4 peer-focus:ring-indigo-300 peer-checked:after:translate-x-full peer-checked:after:border-white
                  peer-checked:bg-indigo-500">
                </div>
            </label>
          </div>
        </td>
        <td>
          <div className="flex items-center justify-center space-x-4">
            <button className="btn-md btn-in" onClick={() => { setProductModel(!productModel); getOneProduct(id)}}>
              <BiSolidEditAlt size={20}/>
            </button>
            <button className="btn-md btn-out hidden sm:block" onClick={() => { setDeleteModel(true); getOneProduct(id)}}>
              <FiTrash2 size={20}/>
            </button>
          </div>
        </td> 
      </tr>
    </>
  )
}

export default ProductList