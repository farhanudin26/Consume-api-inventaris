import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Profile() {
    const [profile, setProfile] = useState({});
    const [darkMode, setDarkMode] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/profile', {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                setProfile(res.data.data);
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login'));
                }
            });
    }, [navigate]);

    const handleLogout = (event) => {
        event.preventDefault();
        axios.get('http://localhost:8000/logout', {
            headers: {
                'Authorization': 'bearer ' + localStorage.getItem('access_token'),
            }
        })
            .then(res => {
                localStorage.removeItem('access_token');
                navigate('/login');
            })
            .catch(err => {
                console.log(err);
            });
    }

    function togle() {
        setDarkMode(!darkMode);
    }

    return (
        <>
            <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-white'}`}>
                <Navbar />
                <div className="block m-auto mt-20 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                    <div className="flex flex-col items-center pb-10 pt-10 bg-gray-500 dark:border-gray-500">
                        <h5 className="mb-1 text-xl font-medium text-white">
                            {profile.username}
                        </h5>
                        <span className="text-sm text-white">
                            {profile.email}
                        </span>
                        <div className="flex mt-4 md:mt-6">
                            <Link to="/dashboard" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Dashboard</Link>
                            <a href="#" onClick={handleLogout} className="py-2 px-4 ms-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800">Logout</a>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={togle}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        Dark Mode
                    </button>
                </div>
            </div>
        </>
    );
}
