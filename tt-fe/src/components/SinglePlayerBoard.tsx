import Field from './Field';
import { useEffect, useState } from 'react';
import { useWebSocket } from "./WebSocketProvider.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function SinglePlayerBoard() {
    const { ws } = useWebSocket();
    const { publicId } = useParams();
    const [squares, setSquares] = useState(Array(9).fill(null));
    const navigate = useNavigate();
    const [isPlayersTurn, setPlayersTurn] = useState(true);
    const [isGameOver, setGameOver] = useState(false);

    const getGameInfo = async () => {
        const token = localStorage.getItem("token");
        const res = await fetch('http://localhost:3000/api/games/public-id/' + publicId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (res.status !== 200) {
            toast.error('Unsuccessful game loading attempt: ' + res.statusText);
            return navigate('*');
        }

        return;
    };

    useEffect(() => {
        if (!ws) {
            toast.error('Web socket error!');
            return;
        }

        const setupWebSocket = () => {
            ws.onmessage = async (event) => {
                console.log('Message from server:', event.data);
                handleMessage(event.data.toString(), publicId);
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
    }, [ws, publicId]);

    const handleMessage = (eventData: string, publicId) => {
        if (eventData.includes('finish') && eventData.includes(publicId)) {
            console.log('The game is finished');

            setGameOver(true);
            setPlayersTurn(false);

            handleFieldInput(eventData);
            setTimeout(() => {
                const messageSplit = eventData.split(';');
                handleGameFinish(messageSplit, eventData);
            }, 3000);
        }

        if (eventData.includes('move') && eventData.includes(publicId)) {
            console.log('A move has been made');
            handleFieldInput(eventData);
        }
    }

    const handleClick = async (index: number) => {
        if (squares[index]) return;

        if (isGameOver) return toast.info('The game is over!');

        if (!isPlayersTurn) return toast.info('Please wait for your turn!');

        await getGameInfo();

        const token = localStorage.getItem('token');
        if(ws && token) {
            const message = JSON.stringify(`single-player:${index};${publicId};${token}`);
            console.log('Sending message:', message);
            ws.send(message);
        }

        return;
    };

    const handleFieldInput = (data: string)=>  {
        const messageSplit = data.split(';');
        const index = messageSplit[3];
        const computerIndex = messageSplit[5];

        setSquares(prevSquares => {
            const newSquares = [...prevSquares];
            newSquares[index] = 'X';
            return newSquares;
        });
        setPlayersTurn(false);

        // this is here so the computer won't make a move when the game is over
        if (messageSplit.length === 7 && data.includes('x') && messageSplit[6] === 'false') return;

        // wait for computer's move
        setTimeout(() => {
            setSquares(prevSquares => {
                const newSquares = [...prevSquares];
                newSquares[computerIndex] = 'O';
                return newSquares;
            });
            setPlayersTurn(true);
        }, 2000);
        
        return;
    }

    const handleGameFinish = (messageSplit, eventData) => {
        if (messageSplit.length === 7 && messageSplit[6] === 'true') {
            console.log('The game is a draw.');
            toast.info('Draw!');
            setTimeout(() => {
                return navigate('/draw/' + publicId);
            }, 5000);
        } else if (messageSplit.length === 7 && eventData.includes('x') && messageSplit[6] === 'false') {
            console.log('X player won.');
            toast.info('Congratulations! You have won the match!');
            setTimeout(() => {
                return navigate('/win/' + publicId);
            }, 5000);
        } else {
            console.log('O player won.');
            toast.info('Defeat.');
            setTimeout(() => {
                return navigate('/defeat/' + publicId);
            }, 5000);
        }
    }

    return (
        <>
            <p className={`text-xl font-semibold mb-6 mr-12 ${ isPlayersTurn ? 'text-green-500' : 'text-red-500' }`}>
                { isPlayersTurn ? 'Your turn' : "Computer's turn" }
            </p>
            <div className="grid grid-cols-3 gap-10 w-1/3">
                { squares.map((value, index) => (
                    <Field key={index} value={value} onClick={() => handleClick(index)}/>
                ))}
            </div>
        </>
    );
}

export default SinglePlayerBoard;
