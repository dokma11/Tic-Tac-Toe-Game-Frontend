import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { Id, toast } from "react-toastify";
import { useEffect } from "react";
import { useWebSocket } from '../components/WebSocketProvider';

function LobbyPage() {
    const { publicId } = useParams();
    const navigate: NavigateFunction = useNavigate();
    const { ws } = useWebSocket();

    const gameExists = async (): Promise<void> => {
        const res: Response = await fetch('http://localhost:3000/api/games/public-id/' + publicId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (res.status !== 200) {
            toast.error('Unsuccessful join attempt: ' + res.statusText);
            return navigate('*');
        }

    };
    gameExists();

    const copyToClipboard = (): void => {
        if (publicId) {
            navigator.clipboard.writeText(publicId)
                .then((): void => {
                    toast.success("Public id successfully copied!");
                })
                .catch((): void => {
                    toast.error("Failed to copy the public id.");
                });
        }
    };

    const abandonGame = async ():  Promise<void | Id> => {
        const token: string | null = localStorage.getItem("token");
        if (!token) return toast.error('Authentication error');

        const res: Response = await fetch('http://localhost:3000/api/games/cancel/' + publicId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (res.status !== 200) return toast.error('Unsuccessful game cancellation attempt: ' + res.statusText);

        toast.success('Game cancelled successfully!');
        return navigate('/');
    }

    useEffect(() => {
        if (!ws) {
            toast.error('Web socket error!');
            return;
        }

        const setupWebSocket = (): void => {
            ws.onmessage = (event): void => {
                console.log('Message from server:', event.data);

                if (event.data.includes('join') && event.data.includes(publicId)) {
                    console.log('Another player has joined.');
                    navigate('/board/' + publicId);
                }
            };

            ws.onopen = (): void => {
                ws.send(JSON.stringify('Hello Server from the lobby!'));
            }
        };

        if (ws.readyState === WebSocket.OPEN) {
            setupWebSocket();
        } else {
            ws.onopen = (): void => {
                console.log('WebSocket connection is open now.');
                setupWebSocket();
            };
        }
    }, [ws, publicId, navigate]);

    return (
        <section className='text-center flex flex-col justify-center items-center h-96'>
            <h1 className='text-6xl font-bold mb-4'>Lobby</h1>
            <p className='text-xl mb-5 mt-6'>Waiting for other player to join your game... <br></br> You can invite your friends by sending them the public id!</p>
            <div className='flex ml-auto mr-auto items-center space-x-4 mt-6 w-1/2'>
                <p className='text-xl mb-5 ml-16'>Game public id: </p>
                <p className='text-xl mb-5 rounded w-1/2 h-fit bg-gray-200'>{ publicId }</p>
                <button
                    onClick={ copyToClipboard }
                    className='text-white bg-indigo-600 hover:bg-green-800 rounded-md px-3 py-2 -mt-6'
                >
                    Copy
                </button>
            </div>
            <button
                onClick={ abandonGame }
                type='button'
                className='text-white bg-red-500 hover:bg-indigo-900 rounded-md px-3 py-2 mt-6'
            >
                Abandon game
            </button>
        </section>
    );
}

export default LobbyPage;
