import DailyClockInOutRecord from "./DailyClockInOutRecord"

function ClockInOutItem({ month_record, index }) {
  const { clock_records } = month_record

  return (
    <section>
      <div className="border rounded-md overflow-hidden">
        <div className="">
          <div className="p-2 bg-gray-300 grid grid-cols-6">
            <span className="flex items-center justify-center">
              {index + 1} 月份
            </span>
            <span className="flex items-center justify-center">
              上班紀錄
            </span>
            <span className="flex items-center justify-center">
              下班紀錄
            </span>
            <span className="flex items-center justify-center">
              時數
            </span>
          </div>

          <div className="py-2">
            {clock_records?
              clock_records.map((daily_record, index) => {
                return (
                  <div key={index} className="py-2 px-2">
                    <DailyClockInOutRecord daily_record={daily_record} index={index} />
                  </div>
                )
              })
              :
              null
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClockInOutItem