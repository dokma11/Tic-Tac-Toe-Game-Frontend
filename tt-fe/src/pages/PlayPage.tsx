import { NavigateFunction, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Id, toast } from "react-toastify";

function PlayPage() {
    const navigate: NavigateFunction = useNavigate();
    const [showCreateGameForm, setShowCreateGameForm] = useState(false);
    const [showJoinGameForm, setShowJoinGameForm] = useState(false);
    const [publicId, setPublicId] = useState("");
    const [gameType, setGameType] = useState("Single player");

    const handleGoBackOption = (): void => {
        navigate('/');
    }

    const submitCreateForm = async (e): Promise<void | Id> => {
        e.preventDefault();

        const typeToSend = {
            type: gameType === 'Single player' ? 1 : 2
        };

        const token: string | null = localStorage.getItem("token");
        if (!token) return toast.error('Authentication Error!');

        const res: Response = await fetch('http://localhost:3000/api/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(typeToSend),
        });

        if (res.status !== 200) return toast.error('Unsuccessful new game creation attempt: ' + res.statusText);

        // ovde dobijam public id koji mogu da prikazem korisniku kako bi ga prekopirao i prosledio ostalima
        const result = await res.json();
        toast.success('Game created successfully!');

        // multiplayer
        if (typeToSend.type === 2) return navigate('/lobby/' + result.publicId);

        // single player
        if (typeToSend.type === 1) return navigate('/sp-board/' + result.publicId);
    }

    const submitJoinGameForm = async (e): Promise <void | Id> => {
        e.preventDefault();

        console.log('publicId: ', publicId);

        if (publicId === "") return toast.error('Invalid Public Id provided');

        const token: string | null = localStorage.getItem("token");
        const res: Response = await fetch('http://localhost:3000/api/games/join/' + publicId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if(res.status !== 200) return toast.error('Unsuccessful join attempt: ' + res.statusText);

        toast.success('Game joined successfully!');
        return navigate('/board/' + publicId);
    }

    return (
        <>
            <div className='container m-auto max-w-2xl py-24 '>
                <form>
                    <h2 className='text-3xl text-center font-semibold mb-6'>Choose how you want to play</h2>
                    <button type="button"
                            className={ showCreateGameForm ? "flex w-1/2 text-center justify-center rounded-md bg-gray-400 ml-auto mr-auto px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" :
                                "flex w-1/2 text-center justify-center rounded-md bg-indigo-600 ml-auto mr-auto px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" }
                            onClick={ showCreateGameForm ?
                                (): void => setShowCreateGameForm(false) :
                                (): void => setShowCreateGameForm(true)}>
                        { showCreateGameForm ? 'Back' : 'Create a new game'}
                    </button>

                    { showCreateGameForm ? (
                        <>
                            <div className='container m-auto max-w-2xl py-10 pb-9 '>
                                <h2 className='text-3xl text-center font-semibold mb-6'>Create a new game</h2>
                                    <div className="sm:col-span-3 justify-content-center">
                                        <label htmlFor="gameType"
                                               className="flex text-center justify-center text-sm font-bold  leading-6 text-gray-900">Choose your game type
                                        </label>
                                        <div className="flex w-full text-center justify-center mt-2 mb-6">
                                            <select id="gameType"
                                                    name="gameType"
                                                    value={ gameType }
                                                    onChange={(e): void => setGameType(e.target.value)}
                                                    autoComplete="gameType-name"
                                                    className="block w-full pl-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option>Single player</option>
                                                <option>Multiplayer</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="button"
                                            className="flex w-1/3 text-center justify-center rounded-md bg-black ml-auto mr-auto py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={ submitCreateForm }>
                                        Create
                                    </button>
                            </div>
                        </>
                    ) : (
                        <>
                        </>
                    )}

                    <button type="button"
                            className={ showJoinGameForm ? "flex w-1/2 text-center justify-center rounded-md bg-gray-400 ml-auto mr-auto mt-6 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" :
                                "flex w-1/2 text-center justify-center rounded-md bg-indigo-600 ml-auto mr-auto mt-6 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                            onClick={ showJoinGameForm ?
                                (): void => setShowJoinGameForm(false) :
                                (): void => setShowJoinGameForm(true)}>
                        { showJoinGameForm ? 'Back' : 'Join an already existing game'}
                    </button>

                    { showJoinGameForm ? (
                        <>
                            <div className='container m-auto max-w-2xl py-10 pb-9 '>
                                    <h2 className='text-3xl text-center font-semibold mb-6'>Join an already existing game</h2>
                                    <div className="sm:col-span-3 text-center justify-content-center">
                                        <div className='mb-4'>
                                            <label className='block text-center text-gray-700 font-bold mb-2'>
                                                Enter the game id
                                            </label>
                                            <input
                                                type='text'
                                                id='publicId'
                                                name='publicId'
                                                className='border rounded w-1/2 py-2 pl-2.5 mb-2'
                                                placeholder='eg. 123456789'
                                                required
                                                value={ publicId }
                                                onChange={(e): void => setPublicId(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button type="button"
                                            className="flex w-1/3 text-center justify-center rounded-md bg-black ml-auto mr-auto py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={ submitJoinGameForm }>
                                        Join
                                    </button>
                            </div>
                        </>
                    ) : (
                        <>
                        </>
                    )}

                    <button type="submit"
                            className="flex w-1/2 text-center justify-center rounded-md bg-indigo-600 px-3 py-1 ml-auto mr-auto mt-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={ handleGoBackOption }>
                        Back to home page
                    </button>
                </form>
            </div>
        </>
    );
}

export default PlayPage;
