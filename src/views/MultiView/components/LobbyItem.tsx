import { useState } from 'react';
import { CustomSocket } from '../../../hooks/useSocket';

import './LobbyItem.scss';

interface LobbyItemProps {
  lobby: PublicLobbyData;
  socket: CustomSocket | undefined;
  user: { id: number, nick: string };
}

const LobbyItem = ({ lobby, socket, user }: LobbyItemProps ) => {
  const [password, setPassword] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const joinLobby = (lobbyId: number, password: string) => {
    if (!socket) return;
    socket.emit('join lobby', lobbyId, password);
  };

  const onLobbyClick = () => {
    if (lobby.hasPassword) setOpenModal(true);
    else joinLobby(lobby.id, password);
  };

  const passwordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    joinLobby(lobby.id, password);
    setOpenModal(false);
  };

  const startGame = () => {
    console.log('START GAME');
    if (!socket) return;
    socket.emit('start game');
  };

  return (
    <div onClick={onLobbyClick} className="lobby-item">
      {lobby.hasPassword ? '🔒' : '🔓'}
      {openModal ?
        <div className="lobby-modal">
          <form onSubmit={passwordSubmit}>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </form>
        </div> : ''}
      {lobby.name}: <b>{lobby.users.map((lobbyUser) => ` ${lobbyUser.nick}${lobbyUser.id === lobby.masterId ? '👑' : ''}`)}</b>
      {lobby.masterId === user.id ? <button type="button" onClick={startGame}>Start Game</button> : ''}
      {lobby.state === 'ingame' ? <i>running</i> : ''}
    </div>
  );
};

export default LobbyItem;
