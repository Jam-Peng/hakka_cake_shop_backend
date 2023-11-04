import { useCallback, useEffect, useState } from "react";

function SearchClockInOutItem({ month_record}) {
  const { clock_in_time, clock_out_time } = month_record
  const [monthClockInTime, setMonthClockInTime] = useState('')
  const [monthClockOutTime, setMonthClockOutTime] = useState('')
  const [monthClockDate, setMonthClockDate] = useState('')
  const [timeDifferences, setTimeDifferences] = useState(null)

  // 取日期
  const formatDate = useCallback(async () => {
    const date = clock_in_time.split('T')[0]
    setMonthClockDate(date)
  }, [clock_in_time]);

  // 轉換上班打卡時間
  const formatClockInTime = useCallback(async () => {
    const date = new Date(clock_in_time);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedDateTime = `${hours} : ${minutes}`;

    setMonthClockInTime(formattedDateTime)
  }, [clock_in_time]);
  
   // 轉換下班打卡時間
  const formatClockOutTime = useCallback(async () => {
    const date = new Date(clock_out_time);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedDateTime = `${hours} : ${minutes}`;
    
    setMonthClockOutTime(formattedDateTime);
  }, [clock_out_time]);

  // 計算時數
  const timeAmount = useCallback(async () => {
    const clockInTime = new Date(clock_in_time);
    const clockOutTime = new Date(clock_out_time);
    const timeDifference = clockOutTime - clockInTime;

    const absoluteHoursWithDecimal = Math.abs(timeDifference / (1000 * 60 * 60));
    const hoursWithDecimal = absoluteHoursWithDecimal.toFixed(1);
    const formattedDateTime = hoursWithDecimal

    setTimeDifferences(formattedDateTime);
  }, [clock_in_time, clock_out_time]);

  useEffect(() => {
    if (clock_in_time) {
      formatClockInTime()
      formatDate()
    }
    if (clock_out_time) {
      formatClockOutTime()
    }
    if (clock_in_time && clock_out_time) {
      timeAmount()
    }
  }, [clock_in_time, clock_out_time, formatClockInTime, formatClockOutTime, formatDate, timeAmount]);

  return (
    <section>
      <div className="grid grid-cols-6 hover:text-indigo-500">
        <div className="flex items-center justify-center">
          <span>{monthClockDate || "---- - -- - --"}</span>
        </div>
        <div className="flex items-center justify-center">
          <span>{monthClockInTime || "-- : --"}</span>
        </div>
        <div className="flex items-center justify-center">
          <span>{monthClockOutTime || "-- : --"}</span>
        </div>
        <div className="flex items-center justify-center">
          <span>{timeDifferences || "---"}</span>
        </div>
      </div>
    </section>
  )
}

export default SearchClockInOutItem