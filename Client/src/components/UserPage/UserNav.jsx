import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { UserMenu } from "../Data/data";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MobileIcon } from '../Navbar/NavbarStyle';

export const UserNav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("Logged out");
    navigate("/");
  };

  return (
    <nav className="bg-white py-4 shadow relative z-50">
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg flex items-center font-bold uppercase space-x-2">
          <CalendarMonthIcon />
          <p className="text-primary">Devify</p>
          <p className="text-secondary">Tracker</p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 text-lg">
          {UserMenu.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="hover:text-secondary"
            >
              {item.title}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="hover:bg-third hover:text-white text-white rounded-md border-2 border-secondary bg-secondary px-3 py-1"
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <MobileIcon className="md:hidden">
          {isOpen ? (
            <FaTimes className="text-2xl" onClick={() => setIsOpen(false)} />
          ) : (
            <FaBars className="text-2xl" onClick={() => setIsOpen(true)} />
          )}
        </MobileIcon>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-secondary text-white rounded-b-lg shadow-lg z-50">
          <ul className="flex flex-col items-center gap-6 py-6 text-lg">
            {UserMenu.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.link}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-third"
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <button
              onClick={handleLogout}
              className="bg-white text-secondary px-4 py-2 rounded-md border-2 border-white hover:bg-third hover:text-white"
            >
              Logout
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};
