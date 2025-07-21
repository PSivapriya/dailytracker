import { useEffect, useState } from "react";
import { motivationalQuotes,successQuotes } from "../Data/data";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const DailyActivities = () =>{
    const [quote, setQuote] = useState("");
    const [habits, setHabits] = useState([]);
    const [completedCount, setCompletedCount] = useState(0);
    const [successQuote, setSuccessQuote] = useState("");
    const [markStatus, setStatus] = useState({});

    const todayDate = new Date().toLocaleString();
    const statusOptions = ["Completed","Missed","Cancelled"];
    
    const today = new Date().toISOString().split("T")[0];

    const randomQuote = (arr) =>arr[Math.floor(Math.random()*arr.length)];

    useEffect(() =>{
        fetchHabits();
        setQuote(randomQuote(motivationalQuotes));
    }, []);

    const fetchHabits = async ()=>{
        const token = localStorage.getItem("accessToken");
        try{
            const res= await axiosInstance.get("/habits",{
                headers: {Authorization: `Bearer ${token}`},
            });
            setHabits(res.data.getHabit);
        }catch (error){
            console.error("Failed to fetch habits",error);
        }
    };

    const handleStatus = (habitId, status) =>{
        // setStatus((prev) =>{
        //     const update ={...prev, [habitId]: status};
        //     const allMarked = habits.every((h) => update[h._id]);

        //     if(allMarked){
        //         setSuccessQuote(randomQuote(successQuote));
        //     }
        //     return update;
        // })
        // saveStatus(habitId, status);

        // const completed = update.filter(h =>h.status === "Completed").length;
        // setCompletedCount(completed);
        const update ={...markStatus,[habitId]: status};
        setStatus(update);
        const completed = Object.values(update).filter((s) => s ==="Completed").length;
        setCompletedCount(completed);

        if(habits.length >0 && completed=== habits.length){
            setSuccessQuote(randomQuote(successQuote));
        }
        saveStatus(habitId,status);
    }

    const saveStatus = async(habitId, status)=>{
        const token = localStorage.getItem("accessToken");
        try{
            await axiosInstance.post(`http://localhost:5000/api/habits/mark`, {habitId, date:today, status},
                {
                    headers:{Authorization: `Bearer ${token}`},
                }
            )
        }catch (err){
            console.error("Error saving status",err);
        }
    }

    const colorCircle = (habitId, type) => 
        markStatus[habitId] === type? type==="Completed"?"bg-green" : type==="Missed"?"bg-red" : "bg-grey": "bg-white border"

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">DailyActivities</h1>
            <p className="text-sm text-gray">{todayDate}</p>

            {quote && !successQuote && (
                <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 rounded">
                   &#127775; {quote}
                </div>
            )}

            {habits.map((habit) =>(
                <div key={habit._id} className="p-4 mt-4 bg-white rounded shadow">
                    <p className="font-medium">{habit.name} </p>
                    <p className="text-sm text-gray-600"> {habit.description} </p>
                    <div className="flex gap-3 mt-2">
                        {statusOptions.map((status) =>(
                            <button key={status} onClick={()=> handleStatus(habit._id, status)} className={`w-8 h-8 rounded-full border-2 ${colorCircle(habit._id,status)}`} title={status}></button>
                        ))}
                        
                    </div>
                </div>
            ))}

            {completedCount === habits.length && habits.length>0 && (
                <div className="mt-6 p-3 bg-green-100 border-l-4 border-green-500 rounded">
                    &#128150; {successQuotes}
                </div>
            )}
        </div>
    )
}

export default DailyActivities;