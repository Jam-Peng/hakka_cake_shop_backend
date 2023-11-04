import { useCallback, useEffect, useState } from "react";

function DailyClockInOutRecord({ daily_record }) {
  const { clock_in_time, clock_out_time } = daily_record
  const [clockInTime, setClockInTime] = useState('')
  const [clockOutTime, setClockOutTime] = useState('')
  const [monthDate, setMonthDate] = useState('')
  const [timeDifference, setTimeDifference] = useState(null)
  
  // 取日期
  const formatDate = useCallback(async () => {
    const date = clock_in_time.split('T')[0]
    setMonthDate(date)
  }, [clock_in_time]);

  // 轉換上班打卡時間
  const formatClockInTime = useCallback(async () => {
    const date = new Date(clock_in_time);

    // const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, '0');  
    // const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedDateTime = `${hours} : ${minutes}`;

    setClockInTime(formattedDateTime)
  }, [clock_in_time]);
  
   // 轉換下班打卡時間
  const formatClockOutTime = useCallback(async () => {
    const date = new Date(clock_out_time);

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const formattedDateTime = `${hours} : ${minutes}`;
    
    setClockOutTime(formattedDateTime);
  }, [clock_out_time]);

  // 計算時數
  const timeAmount = useCallback(async () => {
    const clockInTime = new Date(clock_in_time);
    const clockOutTime = new Date(clock_out_time);
    const timeDifference = clockOutTime - clockInTime;

    // const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    // const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    const absoluteHoursWithDecimal = Math.abs(timeDifference / (1000 * 60 * 60));
    const hoursWithDecimal = absoluteHoursWithDecimal.toFixed(1);
    const formattedDateTime = hoursWithDecimal

    setTimeDifference(formattedDateTime);
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
          <span>{monthDate || "---- - -- - --"}</span>
        </div>
        <div className="flex items-center justify-center">
          <span>{clockInTime || "-- : --"}</span>
        </div>
        <div className="flex items-center justify-center">
          <span>{clockOutTime || "-- : --"}</span>
        </div>
        <div className="flex items-center justify-center">
          <span>{timeDifference || "---"}</span>
        </div>
      </div>
    </section>
  )
}

export default DailyClockInOutRecord