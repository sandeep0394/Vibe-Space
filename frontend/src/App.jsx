import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/login/LoginPage";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import NotificationPage from "./pages/notification/NotificationPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

import useNotification from "./hooks/useNotification.js";

import socket from "./socket.js"; // ✅ Import socket
import BattlePage from "./pages/Battles/BattlePage.jsx";

function App() {
    const [showModal, setShowModal] = useState(false);

    const { data: authUser, isLoading } = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if (data.error) return null;
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
                return data;
            } catch (error) {
                throw new Error(error);
            }
        },
        retry: false,
    });

    useNotification("Don't forget to check today's tasks!", {
        body: "Click here to continue where you left off.",
        icon: "/images/logo.png",
    });

    useEffect(() => {
        if (authUser) {
            const lastVisit = localStorage.getItem('lastVisitDate');
            const today = new Date().toDateString();
            if (lastVisit !== today) {
                setShowModal(true);
                localStorage.setItem('lastVisitDate', today);
            }
        }
    }, [authUser]);

    // ✅ Socket Connection Handling
    useEffect(() => {
        socket.on("connect", () => {
            console.log("✅ Connected to WebSocket server");
        });

        socket.on("disconnect", () => {
            console.log("❌ Disconnected from WebSocket server");
        });

        return () => {
            socket.disconnect(); // Cleanup on unmount
        };
    }, []);

    if (isLoading) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <LoadingSpinner size='lg' />
            </div>
        );
    }

    return (
        <div className='flex max-w-6xl mx-auto'>
            {authUser && <Sidebar />}

            <Routes>
                <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
                <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
                <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
                <Route path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to='/login' />} />
                <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
                <Route path="/tbattle" element={<BattlePage />} />
            </Routes>

            {authUser && <RightPanel />}



            <Toaster />
        </div>
    );
}

export default App;
