import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export type CustomSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

export const useSocket = () => {
  const [socket, setSocket] = useState<CustomSocket>();

  useEffect(() => {
    setSocket(io('186.107.123.125:8000'));
  }, []);

  return socket;
};
