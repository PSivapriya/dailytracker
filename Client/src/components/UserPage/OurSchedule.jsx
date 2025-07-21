import { useState } from "react";
import { Schedule } from "../Data/data";

const OurSchedule =()=>{
    const [mode,setMode] = useState("weekday");
    const [preferences, setPreferences] = useState({startTime:"6", endTime:"21", area:"Study"});
    const [generateSchedule, setGenerateSchedule] =useState([]);
    
    const userSchedule =({startTime, endTime, area})=>{
        const generated =[];
        let start=parseInt(startTime);
        let end = parseInt(endTime);
        for(let i=start;i<end;i++){
            generated.push({time:`${i}:00`,activity: `${area} Session`});
        }
        return generated;
    }

    const handleGenerate = ()=>{
        const shown = userSchedule(preferences);
        setGenerateSchedule(shown);
    }
    
    return(
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Our Schedule</h1>
            <div className="mb-6 flex items-center gap-4">
                <label className="text-lg font-medium">Select Mode</label>
                <select onChange={(e)=>setMode(e.target.value)} value={mode} className="border border-gray px-4 py-3 rounded-md">
                    <option value="weekday">Weekday</option>
                    <option value="weekend">Weekend</option>
                </select>
            </div>

            <div className="bg-gray rounde-md shadow-md p-4 mb-8">
                <h2 className="text-xl font-semibold text-center mb-4 capitalize">{mode === "weekday"?"weekday":"weekend"} Schedule</h2>
                <ul className="space-y-2">
                    {Schedule[mode].map((item,idx)=>(
                        <li key={idx} className={`p-3 rounded-md ${idx%3 ===0 ?"bg-green": idx%3===1?"bg-yellow":"bg-red"}`}>{item.time}-{item.activity}</li>
                    ))}
                </ul>
                <button className="bg-secondary hover:bg-third text-white font-semibold py-2 px-4 rounded">Start</button>
            </div>
            <hr></hr>

            <div className="mt-6 flex flex-col items-center justify-center">
                    <p className="text-lg text-gray ">Want to modify? Go to <a className="text-secondary underline cursor-pointer hover:text-third">ManageHabit</a></p>
            </div>
        </div>
    )
}

export default OurSchedule;