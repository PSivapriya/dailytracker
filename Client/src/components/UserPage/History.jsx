import axios from "axios";
import { useEffect, useState } from "react";
import { eachDayOfInterval, format } from "date-fns";
import axiosInstance from "../utils/axiosInstance";


const History =()=>{
    const [habits, setHabits]= useState([]);
    const [dates, setDates] = useState([]);

    useEffect(() =>{
        fetchHistory();
    },[]);

    const fetchHistory = async()=>{
        const token =localStorage.getItem("accessToken");
        try{
            const res= await axiosInstance.get("/habits/history");
            const habitData = res.data;
            const allDates = habitData.flatMap(habit => habit.completionHistory.map(entry => entry.date));

            const startDate = new Date(Math.min(...allDates.map(date =>new Date(date))));
            const today = new Date();

            const range = eachDayOfInterval({start: startDate, end: today});
            setDates(range);
            setHabits(habitData);
        }catch (err){
            console.error("Error fetching habit history",err);
        }
    }

    const colorCircle ={
        Completed: "bg-green",
        Missed: "bg-red",
        Cancelled:"bg-grey",
        None: "bg-white border",
    }

    const getStatus = (habit,date) =>{
        const day = format(date, "yyyy-MM-dd");
        const entry = habit.completionHistory.find(e=> e.date ===day);
        return entry?.status || "None";
    }

    return(
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Habit History</h1>

            {habits.map(habit =>(
                <div key={habit._id} className="mb-6">
                    <h1 className="font-semibold mb-2">{habit.name}</h1>
                    <div className="flex gap-2 flex-wrap">
                        {dates.map(date =>{
                            const status = getStatus(habit, date);
                            return(
                                <div key={date} className={`w-4 h-4 rounded-full ${colorCircle[status]} border`} title={`${format(date, "MM d")}: ${status}`}/>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default History;