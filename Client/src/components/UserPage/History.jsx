import { useEffect, useState } from "react";
import { eachDayOfInterval, format, isToday } from "date-fns";
import axiosInstance from "../utils/axiosInstance";
import { Schedule } from "../Data/data";

const History = () => {
  const [dates, setDates] = useState([]);
  const [logs, setLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    if (logs.length > 0) {
      const earliest = logs.reduce((min, log) => {
        const d = new Date(log.date);
        return d < min ? d : min;
      }, new Date());
      generateDatesFromStart(earliest);
    }
  }, [logs]);

  const fetchHistory = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await axiosInstance.get(`/dailylogs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const logData = res.data || [];
      setLogs(logData);
    } catch (err) {
      console.error("Error fetching history", err);
    }
  };

  const generateDatesFromStart = (startDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = now;
    const allDates = eachDayOfInterval({start, end});
    setDates(allDates.sort((a,b) => a-b));
  };

  const colorCircle = {
    Completed: "bg-green-500",
    Missed: "bg-red-500",
    Cancelled: "bg-gray-400",
    None: "bg-white border",
  };

  // Filter logs for the selected date
  const dayLogs = logs.filter(
    (l) => format(new Date(l.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
  );

  // Unique items for that date
  
  const dayItems = [
    ...new Map(dayLogs.map((l) =>{
      if(l.type === "habit"){
        return [
          l.habitId || `habit-${Math.random()}`, { id: l.habitId, name: l.habitName || "Unnamed Habit", type: "habit" },
        ]
      }
      if (typeof l.habitId === "string" && l.habitId.includes(" - ")) {
        const [mode, index] = l.habitId.split(" - ");
        const scheduleItem = Schedule[mode]?.[parseInt(index)] || {};
        const name = `${scheduleItem.time || ""} ${scheduleItem.activity || "Unknown Activity"}`.trim();
        return [
          l.habitId,
          { id: l.habitId, name, type: "schedule" },
        ];
      }
      return [
        `unknown-${Math.random()}`, {id:null, name: "Unknow Activity", type:"schedule"},
      ]
    })).values(),
  ]


  // Count completed for that day
  const completedCount = dayLogs.filter((l) => l.status === "Completed").length;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">
        {isToday(selectedDate) ? "Today" : format(selectedDate, "EEEE, MMM d")}
      </h1>

      {/* Calendar */}
      <div className="flex overflow-x-auto gap-2 mb-4">
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`flex flex-col items-center p-2 rounded-lg ${
              format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
                ? "bg-secondary text-white"
                :isToday(date) ? "border-2 border-secondary bg-whiter text-secondary"
                : "bg-gray text-gray-300"
            }`}
          >
            <span className="text-sm">{format(date, "EEE")}</span>
            <span className="text-lg font-bold">{format(date, "d")}</span>
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="mb-4 text-gray-600">
        {completedCount} of {dayItems.length} habits completed
      </p>

      {/* Daily logs */}
      {dayItems.length === 0 ? (
        <p className="text-gray-500">No data for this date.</p>
      ) : (
        dayItems.map((item) => {
          const log = dayLogs.find((l) => l.habitId === item.id);
          const status = log ? log.status : "None";
          return (
            <div key={item.id} className="mb-6 flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full ${colorCircle[status]} border`}
                title={`${format(selectedDate, "MMM d")}: ${status}`}
              />
              <div>
                <h1 className="font-semibold">{item.name}</h1>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    item.type === "habit"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {item.type === "habit" ? "Habit" : "Schedule"}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default History;

