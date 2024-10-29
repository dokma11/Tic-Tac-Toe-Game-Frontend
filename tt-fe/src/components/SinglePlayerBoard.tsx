import Field from './Field';
import { useEffect, useState } from 'react';
import { useWebSocket } from "./WebSocketProvider.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

function SinglePlayerBoard() {
    const { ws } = useWebSocket();
    const { publicId } = useParams();
    const [squares, setSquares] = useState(Array(9).fill(null));
    const navigate = useNavigate();
    let player = '';
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

                        handleFieldInput(event.data.toString());

                        setTimeout(() => {
                            if (event.data.includes('x')) {
                                console.log('X player won.');
                                toast.info('Congratulations! You have won the match!');
                                setTimeout(() => {
                                    navigate('/win/' + publicId);
                                }, 5000);
                            } else {
                                console.log('O player won.');
                                toast.info('Defeat.');
                                setTimeout(() => {
                                    navigate('/defeat/' + publicId);
                                }, 5000);
                            }
                        }, 3000);
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

        const token = localStorage.getItem('token');
        if(ws && token) {
            const message = JSON.stringify(`single-player:${index};${publicId};${token}`);
            console.log('Sending message:', message);
            ws.send(message);
        }

        return;
    };

    // samo umesto toast notifikacija treba staviti da bude recimo neka labela koja se manja
    const handleFieldInput = (data: string)=>  {
        const messageSplit = data.split(';');
        const index = messageSplit[3];
        const computerIndex = messageSplit[5];

        setSquares(prevSquares => {
            const newSquares = [...prevSquares];
            newSquares[index] = 'X';
            return newSquares;
        });

        toast.info('cekaj komp');
        // wait for computer's move
        setTimeout(() => {
            setSquares(prevSquares => {
                const newSquares = [...prevSquares];
                newSquares[computerIndex] = 'O';
                return newSquares;
            });
            toast.info('tvoj potez');
        }, 2000);
    }

    return (
        <div className="grid grid-cols-3 gap-10 w-1/3">
            {squares.map((value, index) => (
                <Field key={index} value={value} onClick={() => handleClick(index)}/>
            ))}
        </div>
    );
}

export default SinglePlayerBoard;
