import { createContext, useContext, useState, useEffect, ReactNode, Context } from 'react';

interface WebSocketContextType {
    ws: WebSocket | null;
}

const WebSocketContext: Context<WebSocketContextType|null> = createContext<WebSocketContextType | null>(null);

export const useWebSocket = (): WebSocketContextType => {
    const context: WebSocketContextType | null = useContext(WebSocketContext);
    if (!context) throw new Error('useWebSocket must be used within a WebSocketProvider');
    return context;
};

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
    const [ws, setWs] = useState<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000');

        socket.onopen = (): void => {
            console.log('Connected to WebSocket server');
            const userSocketId: number = Math.floor(100000000 + Math.random() * 900000000);
            console.log('User socket id: ' + userSocketId.toString());
            socket.send(userSocketId.toString());
        };

        socket.onclose = (): void => {
            console.log('WebSocket connection closed');
        };
        setWs(socket);

        return (): void => {
            socket.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ ws }}>
            { children }
        </WebSocketContext.Provider>
    );
};
