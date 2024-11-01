import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface GameCardProps {
    publicId?: string;
    createdAt?: string;
    startedAt?: string;
    finishedAt?: string;
    xPlayer;
    yPlayer;
    winnerId?: string;
    loserId?: string;
}

function GameCard({ publicId, createdAt, startedAt, finishedAt, xPlayer, yPlayer, winnerId }: GameCardProps) {
    const [winner, setWinner] = useState();
    const [loser, setLoser] = useState();
    const [creationTime, setCreationTime] = useState();
    const [startTime, setStartTime] = useState();
    const [finishTime, setFinishTime] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
        setCreationTime(formatTimeAndDates(createdAt?.toString()));
        setStartTime(formatTimeAndDates(startedAt?.toString()));
        setFinishTime(formatTimeAndDates(finishedAt?.toString()));
    }, []);

    const getUsers = () => {
        const token = localStorage.getItem("token");
        if (!token) return toast.error('Authentication error');

        //if none od these are equal, the game is a draw (winner and loser are predefined to this)
        if (winnerId === xPlayer.id) {
            setWinner(xPlayer);
            setLoser(yPlayer);
        } else if (winnerId === yPlayer.id) {
            setWinner(yPlayer);
            setLoser(xPlayer);
        }
    }

    const formatTimeAndDates = (dateString: string): string => {
        const date = new Date(dateString);
        date.setHours(date.getHours());
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    const seeTheFullGameButtonClicked = () => {
        return navigate('/game-history', {
            state: {
                showMoves: true,
                gamePublicId: publicId,
            }
        });
    }

    return (
        <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2 text-center">Game Details</h2>
            <div className="flex max-w-3xl mx-auto my-4 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
                <div className="flex-1 pr-6 border-r border-gray-200">
                    <div className="mb-2">
                        <p className="font-semibold">Public ID:</p>
                        <p className="text-gray-700">{ publicId }</p>
                    </div>

                    <div className="mb-2">
                        <p className="font-semibold">Created At:</p>
                        <p className="text-gray-700">{ creationTime || 'N/A' }</p>
                    </div>

                    <div className="mb-2">
                        <p className="font-semibold">Started At:</p>
                        <p className="text-gray-700">{ startTime || 'Not started' }</p>
                    </div>

                    <div className="mb-2">
                        <p className="font-semibold">Finished At:</p>
                        <p className="text-gray-700">{ finishTime || 'In progress' }</p>
                    </div>
                </div>

                <div className="flex-1 pl-6">
                    <div className="mb-2">
                        <p className="font-semibold">X Player:</p>
                        <p className="text-gray-700">{ xPlayer.firstName + ' ' + xPlayer.lastName || 'Pending' }</p>
                    </div>

                    <div className="mb-2">
                        <p className="font-semibold">Y Player:</p>
                        <p className="text-gray-700">{ yPlayer.firstName + ' ' + yPlayer.lastName || 'Pending' }</p>
                    </div>

                    {winner && loser ? <>
                        <div className="mb-2">
                            <p className="font-semibold">Winner:</p>
                            <p className="text-green-600">{ winner.firstName + ' ' + winner.lastName || 'There is no winner since the game is a draw' }</p>
                        </div>

                        <div>
                            <p className="font-semibold">Loser:</p>
                            <p className="text-red-600">{ loser.firstName + ' ' + loser.lastName || 'There is no loser since the game is a draw' }</p>
                        </div>
                    </> : <>
                        <p>The game ended in a draw</p>
                    </>}
                </div>
            </div>
            <div>
                <button type="submit"
                        onClick={ seeTheFullGameButtonClicked }
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    See the full game
                </button>
            </div>
        </div>
    );
}

export default GameCard;
