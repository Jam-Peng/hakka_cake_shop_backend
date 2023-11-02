import { BiSearch } from "react-icons/bi";
import { useContext } from "react";
import { SalesContext } from "../../context/SalesContext";

function ChartSearchInput() {
  const { searchDateQ, setSearchDateQ, getSearchDateOrderState } = useContext(SalesContext)

  return (
    <section>
      <div className="relative flex w-full flex-wrap">
        <input
          type="date"
          id="search_date" name="search_date"
          className="border border-teal-500 rounded-l focus:outline-none px-2"
          value={searchDateQ}
          onChange={e => setSearchDateQ(e.target.value)}
        />
          
        <button className="relative flex items-center rounded-r bg-teal-500 px-4 py-1 leading-tight text-white"
          onClick={getSearchDateOrderState}>
          <BiSearch size={20}/>
        </button>
      </div>  
    </section>
  )
}

export default ChartSearchInput