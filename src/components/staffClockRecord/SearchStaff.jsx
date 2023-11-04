import { BiSearch } from "react-icons/bi";
import { useContext } from "react"
import { StaffClockInRecordStatContext } from "../../context/StaffClockInRecordStatContext";

function SearchStaff() {
  const { sendSubmitSearch, searchId, setSearchId, searchDate, setSearchDate } = useContext(StaffClockInRecordStatContext)

  return (
    <section>
      <form action="" onSubmit={sendSubmitSearch}>
        <div className="flex items-center space-x-3">
          <input
            type="search"
            className="input_search text-gray-800 hover:text-gray-800 placeholder:text-[0.87rem] btn-category 
                      bg-gray-100 pl-2 pr-1 focus:outline-none"
            placeholder="輸入員工編號(僅數字)"
            aria-label="Search"
            value={searchId}
            onChange={e => setSearchId(e.target.value.trim())}
            />

          <select name="search_month" id="search_month" className="bg-gray-100 border border-teal-500 rounded-md py-1 px-1"
            value={searchDate} onChange={e => { setSearchDate(e.target.value)}}>
            <option value="" disabled>-- 請選擇月份 --</option>
            <option value="1">1月</option>
            <option value="2">2月</option>
            <option value="3">3月</option>
            <option value="4">4月</option>
            <option value="5">5月</option>
            <option value="6">6月</option>
            <option value="7">7月</option>
            <option value="8">8月</option>
            <option value="9">9月</option>
            <option value="10">10月</option>
            <option value="11">11月</option>
            <option value="12">12月</option>
          </select>
          
          <button className="px-1 flex items-center">
            <BiSearch size={20}/>
            <span>查詢</span>
          </button>
        </div>
      </form>
    </section>
  )
}

export default SearchStaff