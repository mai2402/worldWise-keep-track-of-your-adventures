import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext"
import { useEffect } from "react";
/* eslint-disable */


function ProtectedRoute({children}) {
    const {isAuthenticated}=useAuth();
    const navigate= useNavigate();
    useEffect(()=>{
   
        if(!isAuthenticated) navigate("/")

    },[isAuthenticated,navigate])
    return isAuthenticated ?children: null;
}

export


default ProtectedRoute
