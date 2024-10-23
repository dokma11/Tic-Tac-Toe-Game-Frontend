import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function PlayPage() {
    const navigate = useNavigate();
    const [showCreateGameForm, setShowCreateGameForm] = useState(false);
    const [showJoinGameForm, setShowJoinGameForm] = useState(false);
    const [publicId, setPublicId] = useState("");
    const [gameType, setGameType] = useState("Single player");

    const handleGoBackOption = () => {
        navigate('/');
    }

    const submitCreateForm = async (e) => {
        e.preventDefault();

        let typeToSend = {
            type: -1
        }

        if (gameType === 'Single player') {
            typeToSend.type = 1;
        } else{
            typeToSend.type = 2;
        }

        const token = localStorage.getItem("token");
        const res = await fetch('http://localhost:3000/api/games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(typeToSend),
        });

        if(res.status !== 200) return toast.error('Unsuccessful new game creation attempt: ' + res.statusText);

        // ovde dobijam public id koji mogu da prikazem korisniku kako bi ga prekopirao i prosledio ostalima
        const result = await res.json();
        toast.success('Game created successfully!');
        return navigate('/lobby/' + result.publicId);
    }


    const submitJoinGameForm = async (e) => {
        e.preventDefault();

        // TODO: ovde moram da posaljem public id te partije koju zelim da join

        // mozda samo odraditi neku proveru da li je dobar taj id tj da li je unet

        const token = localStorage.getItem("token");
        const res = await fetch('http://localhost:3000/api/games/join/' + publicId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if(res.status !== 200) return toast.error('Unsuccessful join attempt: ' + res.statusText);
        toast.success('Game joined successfully!');
        return navigate('/');
    }

    return (
        <>
            <div className='container m-auto max-w-2xl py-24 '>
                <form>
                    <h2 className='text-3xl text-center font-semibold mb-6'>Choose how you want to play</h2>
                    <button type="button"
                            className={showCreateGameForm ? "flex w-1/2 justify-center rounded-md bg-gray-400 ml-40 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" : "flex w-1/2 justify-center rounded-md bg-indigo-600 ml-40 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                            onClick={ showCreateGameForm ?
                                () => setShowCreateGameForm(false) :
                                () => setShowCreateGameForm(true)}>
                        { showCreateGameForm ? 'Back' : 'Create a new game'}
                    </button>

                    {showCreateGameForm ? (
                        <>
                            <div className='container m-auto max-w-2xl py-10 pb-9 '>
                                <h2 className='text-3xl text-center font-semibold mb-6'>Create a new game</h2>
                                    <div className="sm:col-span-3 justify-content-center">
                                        <label htmlFor="gameType"
                                               className="flex justify-center text-sm font-bold pr-40 leading-6 text-gray-900">Choose your game
                                            type</label>
                                        <div className="flex w-full justify-center mt-2 mb-6">
                                            <select id="gameType"
                                                    name="gameType"
                                                    value={gameType}
                                                    onChange={(e) => setGameType(e.target.value)}
                                                    autoComplete="gameType-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                                <option>Single player</option>
                                                <option>Multiplayer</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="button"
                                            className="flex w-1/3 justify-center rounded-md bg-black ml-56 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={submitCreateForm}>
                                        Create
                                    </button>
                            </div>
                        </>
                    ) : (
                        <>
                        </>
                    )}

                    <button type="button"
                            className={showJoinGameForm ? "flex w-1/2 justify-center rounded-md bg-gray-400 ml-40 mt-6 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" :
                                "flex w-1/2 justify-center rounded-md bg-indigo-600 ml-40 mt-6 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"}
                            onClick={ showJoinGameForm ?
                                () => setShowJoinGameForm(false) :
                                () => setShowJoinGameForm(true)}>
                        { showJoinGameForm ? 'Back' : 'Join an already existing game'}
                    </button>

                    {showJoinGameForm ? (
                        <>
                            <div className='container m-auto max-w-2xl py-10 pb-9 '>
                                    <h2 className='text-3xl text-center font-semibold mb-6'>Join an already existing game</h2>
                                    <div className="sm:col-span-3 justify-content-center">
                                        <div className='mb-4'>
                                            <label className='block text-gray-700 font-bold mb-2 ml-40'>
                                                Enter the game id
                                            </label>
                                            <input
                                                type='number'
                                                id='publicId'
                                                name='publicId'
                                                className='border rounded w-1/2 py-2 px-3 mb-2 ml-40'
                                                placeholder='eg. 123456789'
                                                required
                                                value={publicId}
                                                onChange={(e) => setPublicId(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button type="button"
                                            className="flex w-1/3 justify-center rounded-md bg-black ml-56 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={submitJoinGameForm}>
                                        Join
                                    </button>
                            </div>
                        </>
                    ) : (
                        <>
                        </>
                    )}

                    <button type="submit"
                            className="flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1 ml-40 mt-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleGoBackOption}>
                        Back to home page
                    </button>
                </form>
            </div>
        </>
    );
}

export default PlayPage;
