import axios from "axios";
import { useEffect, useState } from "react"

const ManageHabits = () =>{
    const [habits, setHabits] = useState([]);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({name:"", description:"", frequency:"",time:""});

    const fetchHabits =async() =>{
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("http://localhost:5000/api/habits",{
            headers: {Authorization: `Bearer ${token}`},
        })
        setHabits(res.data.habits);
    }

    useEffect(() =>{
        fetchHabits();;
    },[]);
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const token = localStorage.getItem("accessToken");

        try{
            if(editId){
                await axios.put(`http://localhost:5000/api/habits/${editId}`,formData,{
                    headers:{Authorization:`Bearer ${token}`},
                });
            } else {
                await axios.post(`http://localhost:5000/api/habits`, formData,{
                    headers:{Authorization:`Bearer ${token}`},
                })
            }
            setFormData({name:"", description:"",frequency:"",time:""});
            setEditId(null);
            fetchHabits();
        }catch (err){
            console.log("submit failed",err.message?.data || err.message);
        }
    }

    const handleEdit = (habit) =>{
        setFormData(habit);setEditId(habit._id);
    }

    const handleDelete = async (id)=>{
        const token = localStorage.getItem("accessToken");
        await axios.delete(`http://localhost:5000/api/habits/${id}`,{
            headers:{Authorization:`Bearer ${token}`},
        })
        fetchHabits();
    }

    return(
        <div className="max-w-2xl">
            <h2 className="text-xl font-bold mb-4">{editId? "Edit Habit" : "Add Habit"} </h2>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md w-full max-w-md m-auto">
                <input name="name" value={formData.name} placeholder="Habit Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="manage"/>
                <input name="description" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="manage"/>
                <select name="frequency" value={formData.frequency} onChange={(e) => setFormData({ ...formData, frequency: e.target.value })} className="manage">
                    <option value="weekdays">Weekdays</option>
                    <option value="weekend">Weekend</option>
                </select>
                <input type="text" placeholder="Time (HH:MM)" name="time" value={formData.time} onChange={(e) =>setFormData({...formData, time:e.target.value})} className="manage" />
                <button type="submit" className="w-full bg-secondary hover:bg-third text-white font-semibold py-2 rounded">{editId ? "Update" : "Add"} </button>
            </form>

            <h2 className="text-lg font-semibold mt-8">Your Habits</h2>
           <div>
                <h3 className="font-bold text-gray mb-2">Weekdays</h3>
            <ul>
                {habits.filter(h=> h.frequency ==="weekdays").map((habit)=>(
                    <li key={habit._id} className="flex p-3 border rounded justify-between items-start">
                        <div>
                            <p className="font-semibold">{habit.name}</p>
                            <p>{habit.description}</p>
                            <p className="text-sm text-gray">Frequency:{habit.frequency} </p>
                            <p>Time: {habit.time}</p>
                        </div>
                        <div className="space-x-2">
                            <button onClick={()=> handleEdit(habit)} className="bg-primary text-white rounded">Edit</button>
                            <button onClick={()=> handleDelete(habit._id)} className="bg-primary text-white rounded">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            </div>
            <div className="mt-6">
  <h3 className="font-bold text-gray-700 mb-2">Weekends</h3>
  <ul className="space-y-2">
    {habits
      .filter(h => h.frequency === "weekends")
      .map(habit => (
        <li key={habit._id} className="p-3 border rounded flex justify-between items-start">
          <div>
            <p className="font-semibold">{habit.name}</p>
            <p>{habit.description}</p>
            <p className="text-sm text-gray-500">Frequency: {habit.frequency}</p>
          </div>
          <div className="space-x-2">
            <button onClick={() => handleEdit(habit)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
            <button onClick={() => handleDelete(habit._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </li>
      ))}
  </ul>
</div>
        </div>
    )
}

export default ManageHabits;