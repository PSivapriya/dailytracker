
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