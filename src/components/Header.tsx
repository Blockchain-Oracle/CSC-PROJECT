import { useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { ShieldIcon, LogOutIcon } from 'lucide-react';


const Header = () => {

  const location = useLocation();

  // dummy variable

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <header className="bg-purple-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-6 w-6" />
          <span className="text-xl font-bold">Anonymous Feedback System</span>
        </Link>
        <nav>
          {isAuthenticated ?
            (
              <div className="flex items-center space-x-4">
                {location.pathname !== '/admin/dashboard' && (
                  <Link to="/admin/dashboard" className="flex items-center space-x-1 px-4 py-2 rounded hover:bg-purple-700 transition">
                    <ShieldIcon className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                )}
                <button onClick={() => alert("log out")} className="flex items-center space-x-1 px-4 py-2 rounded hover:bg-purple-700 transition">
                  <LogOutIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              location.pathname !== '/admin/login' && (
                <Link to="/admin/login" className="flex items-center space-x-1 px-4 py-2 rounded hover:bg-purple-700 transition">
                  <ShieldIcon className="h-5 w-5" />
                  <span>Admin Login</span>
                </Link>
              )
           )}
        </nav>
      </div>
    </header>
  );
};
export default Header;