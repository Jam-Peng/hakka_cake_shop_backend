import { IoMdClose } from "react-icons/io";
import { useContext } from 'react'
import { ProductContext } from '../../context/ProductContext'

function CreateUpdateModel() {
  const { productModel, handleSubmit, formData, setFormData, closeForm, isNew } = useContext(ProductContext)
  
  // 處理 onChange同步輸入資料
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value  });
  };

  // 處理照片
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  return (
    <section className={`${productModel ? 'top-24 right-0' : 'top-24 -right-full'} absolute z-20 
                        h-full w-full transition-all duration-500`}>
      <div className='px-4'>
        <div className=' bg-gray-200 rounded-md h-[580px] overflow-hidden'>
          <div className="flex items-center justify-between py-2 px-4 bg-rose-500 text-gray-50">
            <div>
              <span className="text-lg">{isNew ? '新增商品' : '更新商品'}</span>
            </div>
            <button className="hover:text-gray-200" onClick={closeForm}>
              <IoMdClose size={22} />
            </button>
          </div>

          <div className="p-4">
            <form action="" className="space-y-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name">商品中文名稱</label>
                    <input type="text" id="name" name="name"
                      value={ formData.name }       
                      onChange={ handleDataChange }
                      className="block w-full rounded-md py-1 px-3 ring-1 ring-inset 
                                ring-gray-300 placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="category">類型</label>
                    <select name="category" id="category" value={ formData.category } onChange={ handleDataChange }
                      className="rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400">
                      <option value="" disabled>請選擇產品類型</option>
                      <option value="包子">包子</option>
                      <option value="酥餅">酥餅</option>
                      <option value="鬆糕">鬆糕</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="description">商品描述</label>
                    <textarea name="description" id="description" rows="4" type="text"
                    value={ formData.description }
                    onChange={ handleDataChange }
                    className="block w-full rounded-md  py-1 px-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                    >
                    </textarea>
                  </div>
                </div>

                <div className="space-y-4">  
                  <div>
                    <label htmlFor="price">價錢</label>
                    <input type="number" id="price" name="price"
                      value={ formData.price }       
                      onChange={ handleDataChange }
                      className="block w-full rounded-md py-1 px-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="image">上傳圖片</label>
                    <input className="upload_img_input cursor-pointer" required={isNew}
                      id="image" type="file" name="image" accept="image/*" onChange={ handleImageChange } /> 
                  </div>
                </div>
              </div>
                
              <button className="btn-md btn-in">
                <span>確定</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreateUpdateModel