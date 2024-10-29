import { useState } from "react";
import { toast } from "react-toastify";
import Field from "../components/Field.tsx";

function GameHistoryPage() {
    const [publicId, setPublicId] = useState("");
    const [shouldShowMoves, setShouldShowMoves] = useState(false);
    const [squares, setSquares] = useState(Array(9).fill(null));
    let game;
    const [winner, setWinner] = useState({
        firstName: '',
        lastName: '',
        email: '',
        wins: 0,
        losses: 0,
        draws: 0,
        totalPlayed: 0
    });

    const submitFindHistoryForm = async (e) => {
        e.preventDefault();

        if (publicId === "" || publicId.length != 9) return toast.error('Invalid Public Id provided');

        const res = await fetch('http://localhost:3000/api/games/history/' + publicId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(res.status !== 200) return toast.error('Unsuccessful history retrieval: ' + res.statusText);

        game = await res.json();
        game.moves.forEach((move) => {
           const index = convertArrayToIndex(move.xCoordinate, move.yCoordinate);
            setSquares(prevSquares => {
                const newSquares = [...prevSquares];
                if (move.userId === game!.xPlayerId) {
                    newSquares[index] = 'X';
                } else {
                    newSquares[index] = 'Y';
                }
                return newSquares;
            });
        });

        const token = localStorage.getItem("token");
        if (!token) return toast.error('There is no token');

        const userResult = await fetch('http://localhost:3000/api/users/id/' + game!.winnerId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (userResult.status !== 200) return toast.error('Unsuccessful winner retrieval: ' + userResult.statusText);

        setWinner(await userResult.json());

        toast.success('Game history successfully retrieved!');
        return setShouldShowMoves(true);
    }

    const goBack = () => {
        setShouldShowMoves(false);
    }

    const handleClick = (index) => {
        // nista
    }

    const convertArrayToIndex = (x: number, y: number) => {
        if (x === 0 && y === 0) return 0;
        if (x === 1 && y === 0) return 1;
        if (x === 2 && y === 0) return 2;
        if (x === 0 && y === 1) return 3;
        if (x === 1 && y === 1) return 4;
        if (x === 2 && y === 1) return 5;
        if (x === 0 && y === 2) return 6;
        if (x === 1 && y === 2) return 7;
        if (x === 2 && y === 2) return 8;
        return null;
    }

    return (<>
        { shouldShowMoves ? (
            <div className='container m-auto max-w-2xl py-10 pb-9 '>
                <div>
                    <p>Winner: { winner.firstName } { winner.lastName } </p>
                </div>
                <div className='justify-items-center mt-12'>
                    <div className="grid grid-cols-3 gap-10 w-1/2">
                        { squares.map((value, index) => (
                            <Field key={index} value={value} onClick={() => handleClick(index)}/>
                        ))}
                    </div>
                </div>
                <button type="button"
                        className="flex w-1/3 justify-center rounded-md bg-black mt-10 ml-56 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={ goBack }>
                    Go back
                </button>
            </div>

        ) : (
            <div className='container m-auto max-w-2xl py-10 pb-9 '>
                <h2 className='text-3xl text-center font-semibold mb-6'>Find game's history</h2>
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
                        onClick={ submitFindHistoryForm }>
                    Join
                </button>
            </div> ) }
    </>);
}

export default GameHistoryPage;
