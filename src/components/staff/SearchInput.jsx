import { BiSearch } from "react-icons/bi";
import { useContext } from "react"
import { StaffContext } from "../../context/StaffContext";

function SearchInput() {
  const { searchQ, setSearchQ, searchStaff} = useContext(StaffContext)
  
  return (
    <section>
      <div className="relative flex w-full flex-wrap">
        <input
          type="search"
          className="input_search placeholder:text-[0.87rem] border border-teal-500 rounded-l pl-2 pr-1 focus:outline-none"
          placeholder="輸入姓名or信箱查詢"
          aria-label="Search"
          value={searchQ}
          onChange={e => setSearchQ(e.target.value.trim())}
          />
          
        <button
            className="relative flex items-center rounded-r bg-teal-500 px-4 py-1 right-5
          leading-tight text-white transition duration-150 ease-in-out focus:ring-0  "
          onClick={searchStaff}
        >
          <BiSearch size={20}/>
        </button>
      </div>
    </section>
  )
}

export default SearchInput