import { createContext, useCallback, useContext, useState } from "react"
import { AuthContext } from "./AuthContext"

export const ProductContext = createContext()

function ProductProvider({ children }) {
  const { logoutUser } = useContext(AuthContext)
  const [isNew, setIsNew] = useState(true)
  const [productModel, setProductModel] = useState(false)
  const [deleteModel, setDeleteModel] = useState(false)
  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([]); 
  const [productMessage, setProductMessage] = useState('')
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    price: '',
    description: '',
    image: null,
  });
  const apiurl = "http://127.0.0.1:8000/api/v1"

  // 取得全部產品
  const getProducts = useCallback(async () => {
    const response = await fetch(`${apiurl}/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setProducts(data)
      setAllProducts(data)
    } else if (response.statusText === 'Unauthorized') {
      logoutUser()
    }
  }, [logoutUser, setProducts]) 

  // 新增或更新商品
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log("formData:", formData)
    
    const submitData = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        submitData.append(key, formData[key]);
      }
    }
    if (isNew) {
      let response = await fetch(`${apiurl}/product_set/`, {
        method: "POST",
        body: submitData
      })
      const data = await response.json()
      if (response.status === 201) {
        setProductMessage(data['message'])
      }
    } else {
      let response = await fetch(`${apiurl}/product_set/${formData.id}/`, {
        method: "PUT",
        body: submitData
      })
      const data = await response.json()
      if (response.status === 200) {
        setProductMessage(data['message'])
        setIsNew(true)
      }
    }
    cancelFormData()
    setProductModel(false)
    getProducts()

    setTimeout(() => {
      setProductMessage('')
    }, 2000)
  };

  // 取得一筆商品
  const getOneProduct = (id) => {
    setIsNew(false)
    let product = products.find((item) => {
      return item.id === id
    })
    setFormData({ ...product });
  };

  // 是否在前台顯示特定商品
  const productShow = async (id, complete) => {
    let response = await fetch(`${apiurl}/product_show/${id}/`, {
      method: "PATCH",
      body: { "complete": complete, }
    })
    const data = await response.json()
    if (response.status === 200) {
      setProductMessage(data['message'])
      getProducts()
    }

    setTimeout(() => {
      setProductMessage('')
    }, 2000)
  };

  // 刪除商品
  const deleteProduct = async () => {
    const id = formData.id
    let response = await fetch(`${apiurl}/product_delete/${id}/`, {
      method: "DELETE",
    })
    if (response.status === 204) {
      setProductMessage("商品刪除成功")
    } else {
      setProductMessage("刪除失敗")
    }
    setDeleteModel(false)
    cancelFormData()
    getProducts()
    setIsNew(true)

    setTimeout(() => {
      setProductMessage('')
    }, 2000)
  };
  
  // 依照類別篩選全部商品
  const categoryByProducts = (category) => {
    if (category === '') {
      setProducts(allProducts);
    } else {
      let filterProduct = allProducts.filter((item) => {
        return item.category === category
      })
      setProducts(filterProduct)
    }
  };

  // 關閉from表單
  const closeForm = () => {
    cancelFormData()
    setProductModel(false)
    setIsNew(true)
  };

  const cancelFormData = () => {
    setFormData({
      category: '',
      name: '',
      price: '',
      description: '',
      image: null,
    });
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };


  const contextData = {
    isNew: isNew,
    setIsNew: setIsNew,
    products : products,
    setProducts : setProducts,
    productModel: productModel,
    setProductModel: setProductModel,
    deleteModel : deleteModel,
    setDeleteModel : setDeleteModel,
    formData : formData,
    setFormData : setFormData,
    productMessage : productMessage,
    allProducts : allProducts,

    getProducts : getProducts,
    handleSubmit : handleSubmit,
    closeForm: closeForm,
    cancelFormData : cancelFormData,
    getOneProduct : getOneProduct,
    productShow : productShow,
    deleteProduct : deleteProduct,
    categoryByProducts : categoryByProducts,
  }

  return (
    <ProductContext.Provider value={ contextData }>
      { children }
    </ProductContext.Provider>
  )
}

export default ProductProvider