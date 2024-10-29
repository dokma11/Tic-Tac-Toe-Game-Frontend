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
    // const [isPlayersTurn, setPlayersTurn] = useState(false);

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

        const game = await res.json();

        let decoded = { id: -120 };

        if (!token){
            console.log('Token unavailable');
            return toast.error('Application error');
        }

        decoded = jwtDecode(token);

        if (decoded.id === game.xPlayerId) {
            console.log('player je iks')
            player = 'X';
            console.log('player sa printom: ' + player);
        }

        console.log('player je oks');
        player = 'Y';
        return;
    };

    useEffect(() => {
        if (ws) {
            const setupWebSocket = () => {
                ws.onmessage = async (event) => {
                    console.log('Message from server:', event.data);

                    if (event.data.includes('finish') && event.data.includes(publicId)) {
                        console.log('The game is finished');

                        await getGameInfo();

                        console.log('player: ' + player);

                        if (event.data.includes('x')) {
                            if (player === 'X') {
                                console.log('X player won.');
                                toast.success('Congratulations! You have won the match!');
                                navigate('/win/' + publicId);
                            } else {
                                console.log('X player won.');
                                toast.error('Defeat.');
                                navigate('/defeat/' + publicId);
                            }
                        }

                        if (event.data.includes('y')) {
                            if (player === 'Y') {
                                console.log('O player won.');
                                toast.success('Congratulations! You have won the match!');
                                navigate('/win/' + publicId);
                            } else {
                                console.log('O player won.');
                                toast.error('Defeat.');
                                navigate('/defeat/' + publicId);
                            }
                        }

                        handleFieldInput(event.data.toString());
                    }

                    if (event.data.includes('move') && event.data.includes(publicId)) {
                        console.log('A move has been made');
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
        }
    }, [ws, publicId]);

    const handleClick = async (index: number) => {
        if (squares[index]) return;

        await getGameInfo();

        if (player === lastMove) return toast.info('Please wait for your turn');

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
                return newSquares;
            });

            console.log(squares);
        }

        if (data.includes('y')) {
            const messageSplit = data.split(';');
            const index = messageSplit[3];

            setSquares(prevSquares => {
                const newSquares = [...prevSquares];
                newSquares[index] = 'O';
                setLastMove('Y');
                return newSquares;
            });

            console.log(squares);
        }
    }

    return (
            <div className="grid grid-cols-3 gap-10 w-1/3">
                {squares.map((value, index) => (
                    <Field key={index} value={value} onClick={() => handleClick(index)}/>
                ))}
            </div>
    );
}

export default Board;
