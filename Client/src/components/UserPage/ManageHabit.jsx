import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const ManageHabits = () => {
  const [habits, setHabits] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", frequency: "weekdays", time: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHabits = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/habits");
      setHabits((res.data.getHabit || res.data || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error("Error fetching habits", error);
      setError("Failed to load habits");
      setHabits([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await axiosInstance.put(`/habits/${editId}`, formData);
      } else {
        await axiosInstance.post("/habits", formData);
      }
      setFormData({ name: "", description: "", frequency: "weekdays", time: "" });
      setEditId(null);
      fetchHabits(); // refresh list
    } catch (err) {
      console.log("submit failed", err.message?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (habit) => {
    setFormData({ name: habit.name, description: habit.description, frequency: habit.frequency, time: habit.time });
    setEditId(habit._id);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/habits/${id}`);
      fetchHabits();
    } catch (error) {
      console.error("Error deleting Habit", error);
      setError("Failed to delete habit");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl text-center font-bold mb-4">{editId ? "Edit Habit" : "Add Habit"} </h2>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md w-full max-w-md m-auto">
        <input name="name" value={formData.name} placeholder="Habit Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="manage" required />
        <input name="description" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="manage" />
        <select name="frequency" value={formData.frequency} onChange={(e) => setFormData({ ...formData, frequency: e.target.value })} className="manage">
          <option value="weekdays">Weekdays</option>
          <option value="weekend">Weekend</option>
        </select>
        <input type="time" name="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="manage" />
        <button type="submit" className="w-full bg-secondary hover:bg-third text-white font-semibold py-2 rounded">{loading ? "Saving..." : editId ? "Update" : "Add"}</button>
      </form>

      <h2 className="text-lg font-semibold mt-8">Your Habits</h2>
      {loading ? (
        <p className="text-gray-500 mt-3">Loading habits...</p>
      ) : (
        <>
          <div>
            <h3 className="font-bold text-gray mb-2">Weekdays</h3>
            <ul>
              {habits.filter(h => (h.frequency || "").toLowerCase() === "weekdays").map((habit) => (
                <li key={habit._id} className="flex p-3 border rounded justify-between items-start">
                  <div>
                    <p className="font-semibold">{habit.name}</p>
                    <p>{habit.description}</p>
                    <p>Time: {habit.time}</p>
                    {/* <p className="text-sm text-gray">Frequency: {habit.frequency} </p> */}
                    
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => handleEdit(habit)} className="bg-secondary text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(habit._id)} className="bg-primary text-white px-3 py-1 rounded">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="font-bold text-gray mb-2">Weekends</h3>
            <ul className="space-y-2">
              {habits.filter(h => (h.frequency || "").toLowerCase() === "weekend").map(habit => (
                <li key={habit._id} className="p-3 border rounded flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{habit.name}</p>
                    <p>{habit.description}</p>
                    <p>Time: {habit.time}</p>
                    {/* <p className="text-sm text-gray-500">Frequency: {habit.frequency}</p> */}
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => handleEdit(habit)} className="bg-secondary text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(habit._id)} className="bg-primary text-white px-3 py-1 rounded">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageHabits;
