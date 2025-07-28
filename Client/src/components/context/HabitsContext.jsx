import {  createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const HabitsContext = createContext();

export const HabitsProvider = ({children}) =>{
    const [habits, setHabits] =useState([]);
    const [loading,setLoading] = useState(false);

    const fetchHabits = async()=>{
        setLoading(true);
        try{
            const res =await axiosInstance.get("/habits");
            setHabits(res.data.getHabit || []);
        }catch (err){
            console.error("Error fetching habits", err);
            setHabits([]);
        }finally {
            setLoading(false);
        }
    };

    const refreshHabits =async ()=>{
        await fetchHabits();
    } 

    useEffect(() =>{
        fetchHabits();
    }, []);

    return (
        <HabitsContext.Provider value={{habits,loading,refreshHabits}}>
            {children}
        </HabitsContext.Provider>
    )
}

export const useHabits = () => useContext(HabitsContext);