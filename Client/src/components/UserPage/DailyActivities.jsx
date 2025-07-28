import { useEffect, useState } from "react";
import { motivationalQuotes,Schedule,successQuotes } from "../Data/data";
import axiosInstance from "../utils/axiosInstance";

const DailyActivities = () =>{
    const [quote, setQuote] = useState("");
    const [habits, setHabits] = useState([]);
    const [completedCount, setCompletedCount] = useState(0);
    const [successQuote, setSuccessQuote] = useState("");
    const [markStatus, setStatus] = useState({});
    const [viewMode, setViewMode] = useState("habits");
    
    const [scheduleMode, setScheduleMode] = useState("weekday");
    const [personalMode, setPersonalMode] = useState("weekday");
    const [loading, setLoading] = useState(true);

    const [category, setCategory] =useState("SchoolStud");
    const [shift, setShift] = useState("");
    const [mode,setMode] = useState("weekday");

    const todayDate = new Date().toLocaleString();
    const statusOptions = ["Completed","Missed","Cancelled"];
    
    const today = new Date().toISOString().split("T")[0];

    const randomQuote = (arr) =>arr[Math.floor(Math.random()*arr.length)];

    useEffect(() =>{
        fetchHabits();
        // fetchDailyLogs();
        setQuote(randomQuote(motivationalQuotes));
    }, []);

    // const fetchDailyLogs = async() =>{
    //     const token =localStorage.getItem("accessToken");
    //     try{
    //         const res = await axiosInstance.get(`dailylogs?`)
    //     }
    // }

    const fetchHabits = async ()=>{
       const token = localStorage.getItem("accessToken");
        try{
            const res= await axiosInstance.get("/habits", {headers: {Authorization: `Bearer ${token}`},});
           // const data =res.data.getHabit || res.data.habits || [];
            //setHabits(Array.isArray(data)? data :[]);
             const data = Array.isArray(res.data)
                ? res.data
                : res.data.habits || res.data.getHabit || [];
            setHabits(data.map(h=>({
                _id: h._id, name: h.name, description: h.description, time:h.time || "N/A"
            })))
        }catch (error){
            console.error("Failed to fetch habits",error);
            setHabits([]);
        }finally {
            setLoading(false);
        }
    };


    useEffect(()=>{
        const completedCount = Object.values(markStatus).filter((s)=> s==="Completed").length;
        if(habits.length >0 && completedCount===habits.length){
            setSuccessQuote(randomQuote(successQuotes));
        }else{
            setSuccessQuote("");
        }
    }, [markStatus, habits]);

    if(loading){
        return <p className="text-center text-lg">Loading your habits...</p>
    }

    const handleStatus = (itemId, status, type = "habit") =>{
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
        const update ={...markStatus,[itemId]: status};
        setStatus(update);
        const completed = Object.values(update).filter((s) => s ==="Completed").length;
        setCompletedCount(completed);

        if(habits.length >0 && completed=== habits.length){
            setSuccessQuote(randomQuote(successQuotes));
        }
        //saveStatus(habitId,status);
         saveStatus(itemId, status,type);
    }

    const handleFinish = async()=>{
    //     const finalStatus = habits.map(habit =>({
    //     habitId: habit._id, status: markStatus[habit._id] || "Missed", date: today
    // }));
    try{
         const habitLogs = habits.map(habit =>({
        habitId: habit._id, habitName: habit.name, status: markStatus[habit._id] || "Missed", date: today, type:"habit"
    }));

    // const scheduleLogs = Schedule[scheduleMode].map((_, habit,idx) =>({
    //     habitId: `${scheduleMode} - ${idx}`,
    //     habitName: habit.activity,
    //     status: markStatus[`${scheduleMode} - ${idx}`] || "Missed",
    //     date: today,
    //     type: "schedule"
    // }));

    const scheduleLogs = (Schedule[category]?.[scheduleMode] || []).map((habit, idx) => ({
    habitId: `${category} - ${scheduleMode} - ${idx}`,
    habitName: habit.activity,
    status: markStatus[`${category} - ${scheduleMode} - ${idx}`] || "Missed",
    date: today,
    type: "schedule"
}));


    const logs =[...habitLogs,...scheduleLogs];
    const token = localStorage.getItem("accessToken");
        await axiosInstance.post("/dailylogs/bulk",{logs}, { headers: { Authorization: `Bearer ${token}` }});
        console.log("Access Token",token);
        alert("status saved");
    }catch{
        alert("Failed to save status");
    }
    }
const saveStatus = async (habitId, status, type = "habit") => {
    const token = localStorage.getItem("accessToken");
    const today = new Date().toISOString().split("T")[0];
    const habitName = habits.find(h=> h._id === habitId)?.name || habitId;
    try {
        const res = await axiosInstance.post(
            `/dailylogs`,
            { habitId,habitName, status, date: today, type },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Saved:", res.data);
    } catch (err) {
        console.error("Error saving status", err.response?.data || err.message);
    }
};

    const colorCircle = (itemId, type) => {
      // markStatus[itemId] === type? type==="Completed"?"bg-green" : type==="Missed"?"bg-red" : "bg-grey": "bg-white border"
         if (markStatus[itemId] !== type) return "bg-white border-gray-400 text-gray-700"; // Unselected
         if (type === "Completed") return "bg-green-500 text-white"; 
         if (type === "Missed") return "bg-red-500 text-white"; 
         if (type === "Cancelled") return "bg-gray-400 text-white"; 
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl text-center font-bold mb-2">DailyActivities</h1>
            {/* <p className="text-sm text-gray">{todayDate}</p> */}

            {quote && !successQuote && (
                <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 rounded">
                   &#127775; {quote}
                </div>
            )}
            <div className="flex justify-between items-center my-6">
                <div className="flex gap-4">
                <button onClick = {() => setViewMode("habits")} className={`px-4 py-2 rounded ${viewMode === "habits"? "bg-secondary text-white" :"bg-gray-200"}`}>
                     My Habits 
                </button>
               <button onClick={()=> setViewMode("schedule")} className={`px-4 py-2 rounded ${viewMode === "schedule" ? "bg-secondary text-white" : "bg-gray-200"}`}>
                  Our Schedule
               </button>
            </div>
                        <p className="text-sm text-gray">{todayDate}</p>
            </div>
            

            {viewMode === "habits" ? (habits.length >0 ?(
                <>
                 <div className="mb-6 flex items-center gap-4">
                    <label className="text-lg font-medium">Select Mode</label>
                    <select onChange={(e) => setPersonalMode(e.target.value)} value={personalMode} className="border border-gray px-4 py-3 rounded-md">
                        <option value="weekdays">Weekday</option>
                        <option value="weekend">Weekend</option>
                    </select>
                </div>
           {[...habits].sort((a,b) =>{
            const A =new Date(`1970-01-01T${a.time}`);
            const B = new Date(`1970-01-01T${b.time}`);
            return A-B;
           })
           .map((habit,idx) =>{
                //    const bgColor = idx%3===0 ? "bg-green" : idx%3===1? "bg-yellow" : "bg-red";
                   return(
                <div key={habit._id} className={`p-3 flex items-center rounded-md shadow ${idx%3 ===0 ?"bg-green-100" : idx%3===1?"bg-yellow-100":"bg-red-100"} mt-3`}>   
                    <span className="font-medium"> {habit.time} - {habit.name}</span> 
                    <div className="flex gap-3 ml-auto">
                        {statusOptions.map((status) =>(
                            <button key={status} onClick={()=> handleStatus(habit._id, status, "habit")} className={`w-8 h-8 rounded-full border-2 ${colorCircle(habit._id,status)}`} title={status}>
                                {status === "Completed" ? "✓" : status === "Missed" ? "✗" : "-"}
                            </button>
                        ))}
                        
                    </div>
                </div>
                
            )})}
            </>
        ):(
            <p className="mt-6 text-gray-500 text-center">No habits found. Add one to get started!</p>
        )
        ):(
            <div>
                <div className="mb-6 flex items-center gap-4">
                    <label className="text-lg font-medium">Select Category</label>
                    <select onChange={(e)=> setCategory(e.target.value)} value={category} className="border border-gray px-4 py-3 rounded-md">
                        {Object.keys(Schedule).map((cat)=>(
                            <option key={cat} value={cat}> {cat} </option>
                        ))}
                    </select>
                </div>
                
                {/* <div className="mb-6 flex items-center gap-4">
                    <label className="text-lg font-medium">Select Shift</label>
                    <select>
                        {Object.keys(Schedule[category] || {}).map((sh)=>(
                            <option key={sh} value={sh}> {sh} </option>
                        ))}
                    </select>
                </div> */}

                <div className="mb-6 flex items-center gap-4">
                    <label className="text-lg font-medium">Select Schedule</label>
                    <select onChange={(e) => setScheduleMode(e.target.value)} value={scheduleMode} className="border border-gray px-4 py-3 rounded-md">
                        <option value="weekday">Weekday</option>
                        <option value="weekend">Weekend</option>
                    </select>
                </div>
                
                <ul className="space-y-2">
                    {(Schedule[category]?.[scheduleMode] ||[]).map((item,idx)=>{
                        const scheduleKey = `${category} - ${scheduleMode} - ${idx}`;
                        return(
                            <li key={scheduleKey} className={`p-3 flex rounded-md ${idx%3 ===0 ?"bg-green-100" : idx%3===1?"bg-yellow-100":"bg-red-100"}`}>
                                {/* <span> {item.time} - {item.activity} </span> */}
                               <span className="font-medium"> {item.time? item.time: ''} - {item.activity} </span>
                                <div className="flex gap-2 ml-auto">
                                    {statusOptions.map((status) =>(
                                         <button key={status} onClick={()=> handleStatus(scheduleKey, status, "schedule")} className={`w-8 h-8 rounded-full border-2 ${colorCircle(scheduleKey,status)}`} title={status}>
                                             {status === "Completed" ? "✓" : status === "Missed" ? "✗" : "-"}
                            </button>
                        ))}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )}
        <button onClick={handleFinish} className="mt-6 bg-secondary text-white px-6 py-2 rounded hover:bg-green-700">Finish</button>

            {completedCount === habits.length && habits.length>0 && (
                <div className="mt-6 p-3 bg-green-100 border-l-4 border-green-500 rounded">
                    &#128150; {successQuotes}
                </div>
            )}
        </div>
    )
}

export default DailyActivities;