import { useEffect, useState } from 'react';
import { CustomSocket } from './useSocket';

export interface MonopolyData {
  serverData: ServerData;
  userData: UserData;
  localData: LocalData;
  lobbyData: LobbyData | undefined;
}

export const useMonopolyData = (socket: CustomSocket | undefined): MonopolyData => {
  const [localData, setLocalData] = useState<LocalData>({
    online: false,
  });

  const [userData, setUserData] = useState<UserData>({
    id: 0,
    nick: '',
  });

  const [lobbyData, setLobbyData] = useState<LobbyData>();

  const [serverData, setServerData] = useState<ServerData>({
    users: [],
    lobbies: [],
  });

  useEffect(() => {
    if (socket) {
      socket.on('disconnect', () => {
        setLocalData((oldData) => ({ ...oldData, online: false }));
      });

      socket.on('connect', () => {
        setLocalData((oldData) => ({ ...oldData, online: true }));
      });

      socket.on('fetch server', (serverData) => {
        setServerData(serverData);
      });

      socket.on('fetch user', (userData) => {
        setUserData(userData);
      });

      socket.on('fetch lobby', (lobbyData) => {
        setLobbyData(lobbyData);
        console.log('LOBBY DATA', lobbyData);
      });
    }
  }, [socket]);

  return { serverData, userData, localData, lobbyData };
};
