import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WebSocketContextType {
    ws: WebSocket | null;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
};

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000');

        const token = localStorage.getItem("token");

        if (token) {
            socket.onopen = () => {
                console.log('Connected to WebSocket server');

                const userSocketId = Math.floor(100000000 + Math.random() * 900000000);
                console.log('User socket id: ' + userSocketId.toString());

                socket.send(userSocketId.toString());
            };

            socket.onclose = () => {
                console.log('WebSocket connection closed');
            };
            setWs(socket);
        }

        return () => {
            socket.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ ws }}>
            {children}
        </WebSocketContext.Provider>
    );
};
