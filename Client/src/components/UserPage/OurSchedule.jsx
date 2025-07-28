import { useState } from "react";
import { Schedule } from "../Data/data";

const OurSchedule = () => {
    const [mode, setMode] = useState("weekday");
    const [category, setCategory] = useState("SchoolStud");
    const [shift, setShift] = useState("");

    const availableShifts = category ==="Prof_rotationalshift" ? Object.keys(Schedule[category]):null;

    const scheduleData = category ==="Prof_rotationalshift" ? (shift ? Schedule[category][shift][mode] : null) : Schedule[category][mode];

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Our Schedule</h1>
            <div className="mb-6 flex items-center gap-4">
                <label className="text-lg font-medium">Select Category</label>
                <select onChange={(e) => setCategory(e.target.value)} value={category} className="border border-gray px-4 py-3 rounded-md w-full">
                    
                    {Object.keys(Schedule).map((cat)=>(
                        <option key={cat} value={cat}> {cat.replace(/_/g," ")} </option>
                    ))}
                    
                </select>
            </div>

            {availableShifts && (
                <div className="mb-4">
                    <label className="block text-lg font-medium">Select Shift</label>
                    <select value={shift} onChange={(e)=> setShift(e.target.value)} className="border px-4 py-2 rounded-md w-full">
                        <option value=""> Select Shift </option>
                        {availableShifts.map((sh) =>(
                            <option key={sh} value={sh}> {sh.replace(/_/g, " ")} </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="mb-4">
                <label className="block text-lg font-medium">Select Mode</label>
                <select value={mode} onChange={(e)=> setMode(e.target.value)} className="border px-4 py-2 rounded-md w-full">
                    <option value="weekday">Weekday</option>
                    <option value="weekend">Weekend</option>
                </select>
            </div>

            {scheduleData ? (
                <div className="bg-gray rounded-md shadow-md p-4">
                    <h2 className="text-xl font-semibold text-center mb-4">
                        {category.replace(/_/g," ")} - {shift ? `${shift} -`:""} {mode}
                    </h2>
                    <ul className="space-y-2">
                        {scheduleData.map((item,idx)=>(
                            <li key={idx} className={`p-3 rounded-md ${idx%3===0 ? "bg-green-100" : idx%3 ===1 ? "bg-yellow-100":"bg-red-100"}`}>
                                {item.time} - {item.activity}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p className="text-center text-gray mt-6">Please select all options to view Schedule.</p>
            )}
            {/* {Schedule[mode] && (
            //     <div className="bg-gray-100 rounded-md shadow-md p-4 mb-8">
            //         <h2 className="text-xl font-semibold text-center mb-4 capitalize">
            //             {mode === "weekday" ? "Weekday" : "Weekend"} Schedule
            //         </h2>
            //         <ul className="space-y-2">
            //             {Schedule[mode].map((item, idx) => (
            //                 <li
            //                     key={idx}
            //                     className={`p-3 rounded-md ${
            //                         idx % 3 === 0
            //                             ? "bg-green-100"
            //                             : idx % 3 === 1
            //                             ? "bg-yellow-100"
            //                             : "bg-red-100"
            //                     }`}
            //                 >
            //                     {item.time} - {item.activity}
            //                 </li>
            //             ))}
            //         </ul>
            //     </div>
            // )} */}
        </div>
    );
};

export default OurSchedule;
