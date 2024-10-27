import { useState } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
    const navigate = useNavigate();
    // ovo je za sada mock - vratiti se kasnije
    const [user, setUser] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@example.com',
        scoreX: 10,
        scoreO: 8,
        totalGames: 25
    });

    const getProfile = async () => {
        const token = localStorage.getItem("token");

        if (!token) return toast.error('There is no token');

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

        const user = await res.json();
        setUser(user);
    };
    getProfile();

    return (
        <div className="container mx-auto max-w-lg py-12">
            <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>

            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Name:</label>
                    <p>{user.firstName} {user.lastName}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Email:</label>
                    <p>{user.email}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Wins as X player:</label>
                    <p>{user.scoreX}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Wins as O player:</label>
                    <p>{user.scoreO}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Total Games Played:</label>
                    <p>{user.totalGames}</p>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Overall Win Rate:</label>
                    <p>{((user.scoreX + user.scoreO) / user.totalGames * 100).toFixed(2)}%</p>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
