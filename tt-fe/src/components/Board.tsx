import Field from './Field';
import { useEffect, useState } from 'react';
import { useWebSocket } from "./WebSocketProvider.tsx";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Id, toast } from "react-toastify";

function Board() {
    const { ws } = useWebSocket();
    const { publicId } = useParams();
    const [squares, setSquares] = useState(Array(9).fill(null));
    const navigate: NavigateFunction = useNavigate();
    let player: string = '';
    const [lastMove, setLastMove] = useState('Y');
    const [isPlayersTurn, setPlayersTurn] = useState(false);
    const [isGameOver, setGameOver] = useState(false);

    const getGameInfo = async (): Promise<void | Id> => {
        const token: string | null = localStorage.getItem("token");
        if (!token) return toast.error('Authorization Error!');

        const res: Response = await fetch('http://localhost:3000/api/games/public-id/' + publicId, {
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

        const game = await res.json();

        const decoded = { id: jwtDecode(token) };
        if (decoded.id.id === game.xPlayerId) {
            player = 'X';
            return setPlayersTurn(true); // X player has the first move
        }

        return player = 'Y';
    };

    useEffect((): void => {
        if (!ws) {
            toast.error('Web socket error!');
            return;
        }

        const setupWebSocket = async (): Promise<void> => {
            await getGameInfo();
            ws.onmessage = async (event): Promise<void> => {
                console.log('Message from server:', event.data);
                await handleMessage(event.data.toString(), publicId);
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
    }, [ws, publicId]);

    const handleMessage = async (eventData: string, publicId: string): Promise<void> => {
        // handle basic move
        if (eventData.includes('move') && eventData.includes(publicId)) handleFieldInput(eventData.toString());

        // handle game finish
        if (eventData.includes('finish') && eventData.includes(publicId)) {
            console.log('The game is finished');

            await getGameInfo();
            setGameOver(true);

            handleGameFinish(eventData.toString());

            handleFieldInput(eventData.toString());
        }
    }

    const handleClick = async (index: number) => {
        if (squares[index]) return;

        await getGameInfo();

        if (player === lastMove) {
            setPlayersTurn(false);
            return toast.info('Please wait for your turn');
        }

        if (isGameOver) return toast.info('The game is over!');

        const token = localStorage.getItem('token');
        if(ws && token) {
            const message = JSON.stringify(`move:${index};${publicId};${token}`);
            console.log('Sending message:', message);
            ws.send(message);
        }

        return;
    };

    const handleFieldInput = (data: string)=>  {
        const messageSplit = data.split(';');
        const index = messageSplit[3];

        if (data.includes('x')) handleXInput(index);
        if (data.includes('y')) handleYInput(index);
    }

    const handleXInput = (index) => {
        setSquares(prevSquares => {
            const newSquares = [...prevSquares];
            newSquares[index] = 'X';
            setLastMove('X');
            if (player === 'X') {
                setPlayersTurn(false);
            } else {
                setPlayersTurn(true);
            }
            return newSquares;
        });
    }

    const handleYInput = (index) => {
        setSquares(prevSquares => {
            const newSquares = [...prevSquares];
            newSquares[index] = 'O';
            setLastMove('Y');
            if (player !== 'X') {
                setPlayersTurn(false);
            } else {
                setPlayersTurn(true);
            }
            return newSquares;
        });
    }

    const handleGameFinish = (eventData: string) => {
        if (eventData.includes('true')) {
            console.log('The game is a draw.');
            toast.success('Draw!');
            handleFieldInput(eventData.toString());
            return setTimeout(() => {
                navigate('/draw/' + publicId);
            }, 5000);
        }

        if (eventData.includes('x')) handleWin('X'); // X player is the winner
        if (eventData.includes('y')) handleWin('Y'); // Y player is the winner
    }

    const handleWin = (winner: string) => {
        if (player === winner) {
            console.log(winner + ' player won.');
            toast.success('Congratulations! You have won the match!');
            setTimeout(() => {
                navigate('/win/' + publicId);
            }, 5000);
        } else {
            console.log(winner + ' player won.');
            toast.error('Defeat.');
            setTimeout(() => {
                navigate('/defeat/' + publicId);
            }, 5000);
        }
    }

    return (
        <>
            <p className={`text-xl font-semibold mb-6 mr-12 ${isPlayersTurn ? 'text-green-500' : 'text-red-500'}`}>
                {isPlayersTurn ? 'Your turn' : "Opponent's turn"}
            </p>
            <div className="grid grid-cols-3 gap-10 w-1/3">
                {squares.map((value, index) => (
                    <Field key={index} value={value} onClick={() => handleClick(index)}/>
                ))}
            </div>
        </>
    );
}

export default Board;
