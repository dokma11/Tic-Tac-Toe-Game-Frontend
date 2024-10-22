import { NavLink } from 'react-router-dom';

function Navbar() {
    return (<>
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
                                <NavLink to='/' >
                                    Sign up
                                </NavLink>
                                <NavLink to='/' >
                                    Log in
                                </NavLink>
                                <NavLink to='/' >
                                    Create a game
                                </NavLink>
                                <NavLink to='/' >
                                    Join a game
                                </NavLink>
                                <NavLink to='/' >
                                    Profile
                                </NavLink>
                                <NavLink to='/' >
                                    Logout
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>);
}

export default Navbar;