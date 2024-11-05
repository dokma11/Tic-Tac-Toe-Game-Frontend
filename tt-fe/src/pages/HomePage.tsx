import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

function HomePage() {
    const navigate: NavigateFunction = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));

        window.addEventListener('storage', handleStorageChange);

        return (): void => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleStorageChange = (): void => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    };

    const startGame = (): void => {
        return navigate('/play');
    };

    const checkProfile = (): void => {
        return navigate('/profile');
    };

    const checkRules = (): void => {
        return navigate('/rules');
    };

    const logIn = (): void => {
        return navigate('/login');
    };

    const signUp = (): void => {
        return navigate('/register');
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="text-center py-8 px-4 sm:px-6 lg:py-16 lg:px-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to <span className="text-indigo-600">Tic Tac Toe Pro</span>!</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Challenge your friends in the classic Tic Tac Toe game! Are you ready to be the champion?
                </p>
                { isLoggedIn ?
                    (<div className="flex justify-center">
                        <button
                            onClick={ startGame }
                            className="px-8 py-3 bg-indigo-600 text-white rounded-md text-lg font-semibold shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition"
                        >
                            Start New Game
                        </button>
                    </div>) :
                    (<></>)
                }
            </div>
            { isLoggedIn ? (
                <>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                             onClick={ startGame }>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Play With Friends</h2>
                            <p className="text-gray-600">
                                Invite your friends to a quick match of Tic Tac Toe and see who is the best!
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                             onClick={ startGame }>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Single Player Mode</h2>
                            <p className="text-gray-600">
                                Practice your Tic Tac Toe skills by playing against a highly-skilled computer.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                             onClick={ checkProfile }>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Profile</h2>
                            <p className="text-gray-600">
                                Check out your profile where you can see the basic information and your score!
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                             onClick={ checkRules }>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Game Rules</h2>
                            <p className="text-gray-600">
                                New to Tic Tac Toe? Learn the rules quickly and start winning!
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl">
                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                             onClick={ logIn }>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Log In</h2>
                            <p className="text-gray-600">
                                Log in to your account so you could start playing against your friends or computer!
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                             onClick={ signUp }>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Sign up</h2>
                            <p className="text-gray-600">
                                Don't have an account already? Create a new one and start showing off your skills!
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition"
                             onClick={ checkRules }>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Game Rules</h2>
                            <p className="text-gray-600">
                                New to Tic Tac Toe? Learn the rules quickly and start winning!
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default HomePage;
