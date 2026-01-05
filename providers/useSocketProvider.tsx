import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode
} from 'react';
import { io, Socket } from 'socket.io-client';


const SOCKET_URL = `${process.env.EXPO_PUBLIC_BACKEND_API}`; 

interface SocketContextProps {
  socket: Socket | null;
  isConnected: boolean;
  openConnection: () => void;
  closeConnection: () => void; // Útil para deslogar
}

const SocketContext = createContext({} as SocketContextProps);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const openConnection = useCallback(() => {
    // Evita criar duplicatas se já estiver conectado ou conectando
    if (socket?.connected) return;

    const newSocket = io(SOCKET_URL, {
      autoConnect: true,
      transports: ['websocket'], // Importante para React Native
    });

    // 1. O evento correto no CLIENTE é 'connect', não 'connection'
    newSocket.on('connect', () => {
      console.log('[App] Conectado ao servidor com ID:', newSocket.id);
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('[App] Desconectado do servidor');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.log('[App] Erro de conexão:', error);
    });

    setSocket(newSocket);
  }, [socket]);

  const closeConnection = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
    }
  }, [socket]);

  // Cleanup: Garante que desconecta se o componente Provider desmontar (fechar o app/logout)
  useEffect(() => {
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, openConnection, closeConnection }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketProvider = () => useContext(SocketContext);