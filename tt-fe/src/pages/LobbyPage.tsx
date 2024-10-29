import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useWebSocket } from '../components/WebSocketProvider';

function LobbyPage() {
    const { publicId } = useParams();
    const navigate = useNavigate();
    const { ws } = useWebSocket();

    const gameExists = async () => {
        const res = await fetch('http://localhost:3000/api/games/public-id/' + publicId, {
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

    const copyToClipboard = () => {
        if (publicId) {
            navigator.clipboard.writeText(publicId)
                .then(() => {
                    toast.success("Public id successfully copied!");
                })
                .catch(() => {
                    toast.error("Failed to copy the public id.");
                });
        }
    };

    const abandonGame = async () => {
        const token = localStorage.getItem("token");
        if (!token) return toast.error('Authentication error');

        const res = await fetch('http://localhost:3000/api/games/cancel/' + publicId, {
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

        const setupWebSocket = () => {
            ws.onmessage = (event) => {
                console.log('Message from server:', event.data);

                if (event.data.includes('join') && event.data.includes(publicId)) {
                    console.log('Another player has joined.');
                    navigate('/board/' + publicId);
                }
            };

            ws.onopen = () => {
                ws.send(JSON.stringify('Hello Server from the lobby!'));
            }
        };

        if (ws.readyState === WebSocket.OPEN) {
            setupWebSocket();
        } else {
            ws.onopen = () => {
                console.log('WebSocket connection is open now.');
                setupWebSocket();
            };
        }
    }, [ws, publicId, navigate]);

    return (
        <section className='text-center flex flex-col justify-center items-center h-96'>
            <h1 className='text-6xl font-bold mb-4'>Lobby</h1>
            <p className='text-xl mb-5 mt-6'>Waiting for other player to join your game... <br></br> You can invite your friends by sending them the public id!</p>
            <div className='flex items-center space-x-4 mt-6 w-1/4'>
                <p className='text-xl mb-5'>Game public id: </p>
                <p className='text-xl mb-5 rounded w-1/3 h-fit bg-gray-200'>{publicId}</p>
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
