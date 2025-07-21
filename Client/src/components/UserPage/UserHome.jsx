import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
// import {useNavigate} from "react-router-dom";
import daily from '../assets/daily.png'
import axiosInstance from "../utils/axiosInstance";

const UserHome = () =>{
    const {user} = useContext(AuthContext);
    const [habits, setHabits] = useState([]);
    const [completedToday, setCompletedToday] = useState(0);
    const [topStreak, setTopStreak] = useState({name:"", streak:0});
    // const navigate = useNavigate();

    useEffect(() =>{
        const fetchHabits = async ()=>{
            try{
                const token = localStorage.getItem("accessToken");
                const res = await axiosInstance.get(`http://localhost:5000/api/habits`,{
                    headers: {Authorization: `Bearer ${token}`,},
                });

                const habits = res.data.habits || [];
                setHabits(habits);

                const today = new Date().toISOString().split("T")[0];
                const Completed = habits.filter((habit) => habit.completionHistory?.includes(today));
                setCompletedToday(Completed.length);

                let  maxStreak =0;
                let topHabit ="";
                habits.forEach((habit) => {
                    if(habit.streak > maxStreak){
                        maxStreak = habit.streak;
                        topHabit = habit.name;
                    }
                });
                setTopStreak({name: topHabit, streak: maxStreak});
            }catch (error){
                console.error("Error fetching habits",error);
            }
        }
        if(user)
            fetchHabits();
    },[user]);

    // const handleAddHabit = () =>{
    //     navigate("/manageHabits");
    // }
    return(
        <div className="container grid grid-cols-2 ">
            <div className="py-16">
            <h1 className="text-2xl font-bold mb-4">Hello, {user?.name || "User"}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 my-9 gap-10 mb-6">
                <p className="text-lg font-semibold">Total Habits</p>
                <p className="text-2xl">{habits.length}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-6">
                <p className="text-lg font-semibold">Completed Today</p>
                <p className="text-2xl">{completedToday}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-6">
                <p className="text-lg font-semibold">Streaks</p>
                <p className="text-base">{topStreak.streak}-day streak on "{topStreak.name || "No Habit"}"</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 py-10 gap-4 mb-6">
                <button className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-third transition">Add New Habit</button>
                <button className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-third transition">Start</button>
            </div>
            </div>

            <div className="flex justify-center md:py-10 ">
                 <img src={daily} alt="" className="md:py-10 w-[430px] md:w-[450px] xl:w-[360px] h-[250px] md:h-[400px] xl:h-[390px] drop-shadow"/>
            </div>
        </div>
       
    )

}
export default UserHome;