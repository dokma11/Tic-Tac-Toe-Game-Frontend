import { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        wins: 0,
        losses: 0,
        draws: 0,
        totalPlayed: 0
    });

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        const token = localStorage.getItem("token");

        if (!token) return toast.error('Authentication error');

        const res = await fetch('http://localhost:3000/api/users/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (res.status !== 200) {
            toast.error('Unsuccessful join attempt: ' + res.statusText);
            return navigate('*');
        }

        setUser(await res.json());
    };

    return (
        <div className="container mx-auto max-w-lg py-12">
            <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>

            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Name:</label>
                    <p>{ user.firstName } { user.lastName }</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Email:</label>
                    <p>{ user.email }</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Wins:</label>
                    <p>{ user.wins }</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Losses:</label>
                    <p>{ user.losses }</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Draws:</label>
                    <p>{ user.draws }</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Total Games Played:</label>
                    <p>{ user.totalPlayed }</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Overall Win Rate:</label>
                    <p>{ ((user.wins) / user.totalPlayed * 100).toFixed(2) }%</p>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
