import Field from './Field';
import { useEffect, useState } from 'react';
import { useWebSocket } from "./WebSocketProvider.tsx";
import { useParams } from "react-router-dom";

function Board() {
    const { ws } = useWebSocket();
    const { publicId } = useParams(); // nadam se da moze ovako da preuzme samo sa BoardPage...

    useEffect(() => {
        if (ws) {
            const setupWebSocket = () => {
                ws.onmessage = (event) => {
                    console.log('Message from server:', event.data);

                    if (event.data.includes('move') && event.data.includes(publicId)) {
                        console.log('A move has been made');

                        if (event.data.toString().includes('x')) {
                            const messageSplit = event.data.split(';');
                            const index = messageSplit[3];

                            const newSquares = squares.slice();
                            newSquares[index] = 'X';
                            setSquares(newSquares);

                            console.log(newSquares);
                        }

                        if (event.data.includes('y')) {
                            const messageSplit = event.data.split(';');
                            const index = messageSplit[3];

                            const newSquares = squares.slice();
                            newSquares[index] = 'O';
                            setSquares(newSquares);
                        }
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

    const [squares, setSquares] = useState(Array(9).fill(null));

    const handleClick = async (index: number) => {
        if (squares[index]) return;

        const token = localStorage.getItem('token');
        if(ws && token) {
            const message = JSON.stringify(`move:${index};${publicId};${token}`);
            console.log('Sending message:', message);
            ws.send(message);
        }

        return;
    };

    return (
        <div className="grid grid-cols-3 gap-10 w-1/3">
            {squares.map((value, index) => (
                <Field key={index} value={value} onClick={() => handleClick(index)} />
            ))}
        </div>
    );
}

export default Board;
