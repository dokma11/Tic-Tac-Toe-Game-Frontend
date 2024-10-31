import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoggedIn(!!localStorage.getItem('token'));

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleStorageChange = () => {
        setIsLoggedIn(!!localStorage.getItem('token'));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        return window.location.reload();
    }

    const linkClass = ({ isActive }) =>
        isActive
            ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
            : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

    return (
        <nav className='bg-indigo-700 border-b border-indigo-500'>
            <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
                <div className='flex h-20 items-center justify-between'>
                    <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
                        <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>
                            <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                                Tic Tac Toe Pro
                            </span>
                        </NavLink>
                        <div className='md:ml-auto'>
                            <div className='flex space-x-2'>
                                <NavLink to='/' className={linkClass}>
                                    Home
                                </NavLink>

                                {isLoggedIn ? (
                                    <>
                                        <NavLink to='/play' className={linkClass}>
                                            Play
                                        </NavLink>
                                        <NavLink to='/profile' className={linkClass}>
                                            Profile
                                        </NavLink>
                                        <NavLink to='/game-history' className={linkClass}>
                                            Game history
                                        </NavLink>
                                        <NavLink to='/logout' onClick={handleLogout}  className={linkClass}>
                                            Log out
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink to='/login' className={linkClass}>
                                            Log in
                                        </NavLink>
                                        <NavLink to='/register' className={linkClass}>
                                            Sign up
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
