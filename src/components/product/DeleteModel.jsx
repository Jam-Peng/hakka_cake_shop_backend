import { IoMdClose } from "react-icons/io";
import { useContext } from 'react'
import { ProductContext } from '../../context/ProductContext' 

function DeleteModel() {
  const { deleteModel, setDeleteModel, formData, cancelFormData, deleteProduct, setIsNew } = useContext(ProductContext)
  
  const handleClose = () => {
    setDeleteModel(false)
    setIsNew(true)
    cancelFormData()
  }

  return (
    <section className={`${deleteModel ?  "opacity-1 scale-100 bg-slate-50/90" : "opacity-0 scale-0 bg-slate-0"} 
      pt-0 absolute w-full min-h-screen top-0 pb-80 flex justify-center items-center transition-all duration-500 z-30`}>
      <div className="overflow-hidden border rounded-lg bg-stone-50  shadow-lg md:w-5/12 xl:max-w-6/12">
        <div className="space-y-1 ">
          <div className="py-2 px-4 bg-rose-500 text-gray-50 flex justify-between items-center">
            <span className="text-lg ">刪除</span>
            <button className="hover:text-gray-200" onClick={ handleClose }>
              <IoMdClose size={22} />
            </button>
          </div>
          <div className="p-3 border-b space-x-2">
            <span>是否刪除</span>
            <span className='text-indigo-600 text-lg'>{ formData.name }</span>
            <span>(刪除後將無法復原)。</span>
          </div>
          <div className="px-3 py-4 flex justify-end" >
            <button className="btn-md btn-in" onClick={ deleteProduct }>
              <span>確認</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DeleteModel