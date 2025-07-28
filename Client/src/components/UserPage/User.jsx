
import { Outlet } from "react-router-dom"
import DailyActivities from "./DailyActivities"
import History from "./History"
import ManageHabits from "./ManageHabit"
import OurSchedule from "./OurSchedule"
import UserHome from "./UserHome"
import { UserNav } from "./UserNav"


export const User = ()=>{
    return (
        <div>
           <UserNav />
           <UserHome />
           <ManageHabits />
           <DailyActivities />
           <OurSchedule />
           <History />
        </div>
    )
}

export const NavDash = () =>{
    return (
        <div>
            <UserNav />
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    )
}