import user_img from "../../assets/user.png"
import { FiTrash2 } from "react-icons/fi";
import { BsStackOverflow } from "react-icons/bs";
import { useContext } from "react";
import { ClientBlackContext } from "../../context/ClientBlackContext";

function BlackClientList({ client }) {
  const { retrieve, deleteClient } = useContext(ClientBlackContext)
  const { id, image, username, name } = client
  
  return (
    <section className="border rounded-lg bg-gray-50 overflow-hidden">
      <div className="py-2 px-4 space-y-1 bg-gray-300 hover:bg-gray-200 hover:text-indigo-500 cursor-pointer"
        >
        <div className="flex items-center justify-between">
          <div className="w-10/12 flex items-center">
            <div className="w-2/12">
              {image ?
                <img src={image} alt="大頭照" className="h-14 w-14 rounded-md"/>
              : 
                <img src={user_img} alt="大頭照" className="h-14 w-14 rounded-md bg-gray-100"/>
              } 
            </div>
            <div className="w-3/12">
              <span>{username}</span>
            </div>
            <div className="w-3/12">
              <span>{name || "未提供"}</span>
            </div>

            <div className="w-2/12">
              <span>一般會員</span>
            </div>
          </div>

          <div onClick={() => { retrieve(id) }}>
            <button className="btn-md btn-out">
              <BsStackOverflow size={18}/>
            </button>
          </div>
          <div onClick={() => { deleteClient(id) }}>
            <button className="btn-md btn-out">
              <FiTrash2 size={18}/>
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default BlackClientList