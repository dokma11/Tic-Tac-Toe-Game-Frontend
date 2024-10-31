import Field from './Field';
import { useEffect, useState } from 'react';
import { useWebSocket } from "./WebSocketProvider.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function Board() {
    const { ws } = useWebSocket();
    const { publicId } = useParams();
    const [squares, setSquares] = useState(Array(9).fill(null));
    const navigate = useNavigate();
    let player = '';
    const [lastMove, setLastMove] = useState('Y');
    const [isPlayersTurn, setPlayersTurn] = useState(false);
    const [isGameOver, setGameOver] = useState(false);

    const getGameInfo = async () => {
        const token = localStorage.getItem("token");
        if (!token) return toast.error('Authorization Error!');

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

        const game = await res.json();

        const decoded = { id: jwtDecode(token) };
        if (decoded.id.id === game.xPlayerId) {
            player = 'X';
            return setPlayersTurn(true); // X player has the first move
        }

        return player = 'Y';
    };

    useEffect(() => {
        if (!ws) {
            toast.error('Web socket error!');
            return;
        }

        const setupWebSocket = async () => {
            await getGameInfo();
            ws.onmessage = async (event) => {
                console.log('Message from server:', event.data);

                // handle basic move
                if (event.data.includes('move') && event.data.includes(publicId)) handleFieldInput(event.data.toString());

                // handle game finish
                if (event.data.includes('finish') && event.data.includes(publicId)) {
                    console.log('The game is finished');

                    await getGameInfo();
                    setGameOver(true);

                    if (event.data.includes('true')) {
                        console.log('The game is a draw.');
                        toast.success('Draw!');
                        handleFieldInput(event.data.toString());
                        return setTimeout(() => {
                            navigate('/draw/' + publicId);
                        }, 5000);
                    }

                    if (event.data.includes('x')) {
                        if (player === 'X') {
                            console.log('X player won.');
                            toast.success('Congratulations! You have won the match!');
                            setTimeout(() => {
                                navigate('/win/' + publicId);
                            }, 5000);
                        } else {
                            console.log('X player won.');
                            toast.error('Defeat.');
                            setTimeout(() => {
                                navigate('/defeat/' + publicId);
                            }, 5000);
                        }
                    }

                    if (event.data.includes('y')) {
                        if (player === 'Y') {
                            console.log('O player won.');
                            toast.success('Congratulations! You have won the match!');
                            setTimeout(() => {
                                navigate('/win/' + publicId);
                            }, 5000);
                        } else {
                            console.log('O player won.');
                            toast.error('Defeat.');
                            setTimeout(() => {
                                navigate('/defeat/' + publicId);
                            }, 5000);
                        }
                    }

                    handleFieldInput(event.data.toString());
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
    }, [ws, publicId]);

    const handleClick = async (index: number) => {
        if (squares[index]) return;

        await getGameInfo();

        if (player === lastMove) return toast.info('Please wait for your turn');

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
        if (data.includes('x')) {
            const messageSplit = data.split(';');
            const index = messageSplit[3];

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

        if (data.includes('y')) {
            const messageSplit = data.split(';');
            const index = messageSplit[3];

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
