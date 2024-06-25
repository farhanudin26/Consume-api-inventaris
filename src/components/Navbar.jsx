import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const [userAuth, setUserAuth] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8000/profile', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token')
      }
    })
      .then(res => {
        setUserAuth(res.data.data);
        setIsLogin(true);
      })
      .catch(err => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          navigate('/login');
        }
      });
  }, [navigate]);

  const handleLogout = (event) => {
    event.preventDefault();
    axios.get('http://localhost:8000/logout', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      }
    })
      .then(res => {
        localStorage.removeItem('access_token');
        navigate('/login');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
    
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Inventaris</span>
          </a>
          <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
            {!isLogin && (
              <Link to="/login" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2
                dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Login
              </Link>
            )}
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            {isLogin && userAuth.role === 'admin' && (
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                </li>
                <li>
                  <Link to={'/stuffs'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Stuffs</Link>
                </li>
                <li>
                  <Link to={'/inbound-stuffs'} href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Inbound</Link>
                </li>
                <li>
                  <Link to ={'/lendings'} href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Landing</Link>
                </li>
                <li>
                  <Link to={'/users'}href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Users</Link>
                </li>
                <li className="relative ml-auto">
                  <div onClick={toggleDropdown} className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  {dropdownOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                      <div className="py-1" role="none">
                        <Link to={'/profile'} className="block py-2 px-2 text-sm font-medium text-gray-700 hover:bg-gray-200" role="menuitem" tabIndex="-1" id="menu-item-1">Profile</Link>
                        <a href="#" onClick={handleLogout} className="block py-2 px-2 text-sm font-medium text-gray-700 hover:bg-gray-200" role="menuitem" tabIndex="-1" id="menu-item-2">Logout</a>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            )}
            {isLogin && userAuth.role === 'staff' && (
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                </li>
                <li>
                  <Link to = {'/lendings'} href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Landing</Link>
                </li>
                <li className="relative ml-auto">
                  <div onClick={toggleDropdown} className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer">
                    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  {dropdownOpen && (
                    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                      <div className="py-1" role="none">
                        <Link to={'/profile'} className="block py-2 px-2 text-sm font-medium text-gray-700 hover:bg-gray-200" role="menuitem" tabIndex="-1" id="menu-item-1">Profile</Link>
                        <a href="#" onClick={handleLogout} className="block py-2 px-2 text-sm font-medium text-gray-700 hover:bg-gray-200" role="menuitem" tabIndex="-1" id="menu-item-2">Logout</a>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
