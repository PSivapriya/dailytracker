import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { UserMenu } from "../Data/data";

export const UserNav = ()=>{
   const handleLogout =()=>{
      localStorage.removeItem("token");
      alert("logged out");
      window.location.href="/login";
   }
   
    return(
         <nav className="bg-white py-4 shadow">
      <div className="container flex justify-between item-center ">
        <div className="text-lg flex items-center font-bold uppercase space-x-2">
          <CalendarMonthIcon />
          <p className="text-primary">Devify</p>
          <p className="text-secondary">Tracker</p>
        </div>
        <div className="flex items-center">
            <ul className="hidden md:flex items-center space-x-2">
               {UserMenu.map((item) =>{
                  return <li key={item.id}>
                    <a href={item.link} className="py-1 py-3 hover:text-secondary ">{item.title}</a>
                    </li>
               })
            }
            </ul>
            </div>
          
         <button onClick={handleLogout} className='hover:bg-third hover:text-white text-white rounded-md border-2 border-secondary bg-secondary px-1 py-0.5'>Logout</button>
       </div>

    </nav>
    )
}