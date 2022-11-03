import { useState } from 'react';
import { MonopolyData } from '../../../hooks/useMonopolyData';
import { CustomSocket } from '../../../hooks/useSocket';
import LobbyItem from './LobbyItem';

import './LobbyList.scss';

const LobbyList = ({ socket, data }: { socket: CustomSocket | undefined, data: MonopolyData }) => {
  const { serverData, userData, localData, lobbyData } = data;
  const [input, setInput] = useState({
    changeNickValue: '',
    newLobbyName: '',
    newLobbyPassword: '',
  });

  const createLobby = (event: React.FormEvent<HTMLFormElement>) => {
    if (!socket) return;
    event.preventDefault();
    socket.emit('create lobby', input.newLobbyName, input.newLobbyPassword);
  };

  const changeNick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!socket) return;
    socket.emit('change nick', input.changeNickValue);
  };

  return (
    <div className="lobby-list">
      <div className="lobbies">
        {serverData.lobbies?.map((lobby) => (
          <LobbyItem lobby={lobby} socket={socket} user={userData} key={lobby.id} />
        ))}
      </div>
      <div>
        <p><b>User Data</b></p>
        <p><b>id: </b>{userData.id}</p>
        <p><b>username: </b>{userData.nick}</p>
      </div>
      <br />
      {lobbyData ?
        <>
          <div>
            <p><b>Lobby Data</b></p>
            <p><b>id: </b>{lobbyData.id}</p>
            <p><b>masterId: </b>{lobbyData.masterId}</p>
            <p><b>state: </b>{lobbyData.state}</p>
          </div>
          <br />
        </> : ''
      }
      <form onSubmit={changeNick}>
        <input
          value={input.changeNickValue}
          placeholder="Username"
          type="text"
          onChange={(event) => setInput((oldValue) => ({ ...oldValue, changeNickValue: event.target.value }))}
        />
        <button type="submit">Change username</button>
      </form>
      <br />
      <form onSubmit={createLobby}>
        <input value={input.newLobbyName} placeholder="Lobby Name" type="text" onChange={(event) => setInput((oldValue) => ({ ...oldValue, newLobbyName: event.target.value }))} />
        <input value={input.newLobbyPassword} placeholder="Lobby Password" type="password" onChange={(event) => setInput((oldValue) => ({ ...oldValue, newLobbyPassword: event.target.value }))} />
        <button type="submit">Create lobby</button>
      </form>

    </div>
  );
};

export default LobbyList;
