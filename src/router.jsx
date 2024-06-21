import { createBrowserRouter } from "react-router-dom";
import App from './App'
import Login from './pages/Login'
import Profile from "./pages/Profile";
import Stuff from "./pages/Stuff";
import StuffTrash from "./pages/StuffTrash";
import Users from "./pages/Users";
import UsersTrash from "./pages/UsersTrash";
import Lending from "./pages/Lending"
import Inbound from "./pages/Inbound";

export const router = createBrowserRouter([
    {path: '/', element: <App />},
    {path: '/login', element: <Login />},
    {path: '/profile', element: <Profile />},
    {path: '/stuffs', element: <Stuff />},
    {path: '/stuffs/trash', element: <StuffTrash />},
    {path: '/users', element: <Users />},
    {path: '/users/trash', element: <UsersTrash />},
    {path: '/lendings', element: <Lending />},
    {path: '/inbound-stuffs', element: <Inbound />},



])

