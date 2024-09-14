import { Menu, X } from "lucide-react";
import { useState } from "react";
// import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

import { navItems } from "../../../constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);


  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleLogout = () => {
 
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg shadow-sm border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <Link to={'/'} className="flex items-center flex-shrink-0">
            {/* <img className="h-10 w-10 mr-2" src={logo} alt="Logo" /> */}
            <span className="text-xl font-semibold tracking-tight">Clinic Net</span>
          </Link>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-4 items-center">
            {1 ? (
              <button
                onClick={handleLogout}
                className="py-2 px-3 border rounded-md"
              >
                Log Out
              </button>
            ) : (
              <Link to={'/login'} className="py-2 px-3 border rounded-md">
                Log In
              </Link>
            )}
            <Link
              to="/signup"
              className="bg-gradient-to-r text-white from-blue-500 to-blue-800 py-2 px-3 rounded-md"
            >
              Create an account
            </Link>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="py-2 px-3 border rounded-md"
                >
                  Log Out
                </button>
              ) : (
                <Link to="/login" className="py-2 px-3 border rounded-md">
                  Log In
                </Link>
              )}
              <Link
                to="/signup"
                className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
              >
                Create an account
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
