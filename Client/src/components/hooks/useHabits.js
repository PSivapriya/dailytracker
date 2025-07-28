import { useCallback, useEffect, useState } from "react"
import axiosInstance from "../utils/axiosInstance";

export const useHabits = () =>{
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchHabits =useCallback(async ()=>{
        setLoading(true);
        try{
            const res =await axiosInstance.get("/habits");
            setHabits(res.data.getHabit || []);
        }catch (err){
            console.error("error fetching habits",err);
            setError("Failed to load habits");
        }finally{
            setLoading(false);
        }
    },[]);

    useEffect(()=>{
        fetchHabits();
    }, []);

    return {habits, setHabits, fetchHabits, loading, error};
}