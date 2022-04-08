// import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Reconnecting from '../components/Reconnecting';
import Room from '../components/Room';

import './Lobby.scss';

type SocketRef = React.MutableRefObject<Socket<ServerToClientEvents, ClientToServerEvents> | null>;

const Lobby = () => {
  const [online, setOnline] = useState(false);
  const [lobbyState, setLobbyState] = useState<LobbyData>({
    users: [],
    rooms: [],
  });
  const socketRef: SocketRef = useRef(null);

  const [input, setInput] = useState({
    nick: '',
  });

  const [newRoomForm, setNewRoomForm] = useState({
    name: '',
    password: '',
  });

  const [user, setUser] = useState({
    id: 0,
    nick: '',
  });

  useEffect(() => {
    socketRef.current = io('localhost:8000');
    socketRef.current.on('fetch lobby', (lobbyData: LobbyData) => {
      setLobbyState(lobbyData);
    });

    socketRef.current.on('fetch userdata', (userData: UserData) => {
      setUser(userData);
      setInput((oldValue) => ({ ...oldValue, nick: userData.nick }));
    });

    socketRef.current.on('disconnect', () => {
      setOnline(false);
    });

    socketRef.current?.on('connect', () => {
      setOnline(true);
    });
  }, []);

  const createRoom = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socketRef.current?.emit('create room', newRoomForm.name, newRoomForm.password);
  };

  const joinRoom = (roomId: number, password: string) => {
    socketRef.current?.emit('join room', roomId, password);
  };

  const changeNick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socketRef.current?.emit('change nick', input.nick, (response) => {
      setUser(response);
    });
  };

  return (
    <>
      {online ?
        <div className="lobby">
          <div>
            <p><b>User Data</b></p>
            <p><b>id: </b>{user.id}</p>
            <p><b>username: </b>{user.nick}</p>
          </div>
          <br />
          <form onSubmit={changeNick}>
            <input
              value={input.nick}
              placeholder="Username"
              type="text"
              onChange={(event) => setInput((oldValue) => ({ ...oldValue, nick: event.target.value }))}
            />
            <button type="submit">Change username</button>
          </form>
          <br />
          <form onSubmit={createRoom}>
            <input value={newRoomForm.name} placeholder="Room Name" type="text" onChange={(event) => setNewRoomForm((oldValue) => ({ ...oldValue, name: event.target.value }))} />
            <input value={newRoomForm.password} placeholder="Room Password" type="password" onChange={(event) => setNewRoomForm((oldValue) => ({ ...oldValue, password: event.target.value }))} />
            <button type="submit">Create room</button>
          </form>

          <div className="rooms">
            {lobbyState.rooms?.map((room) => (
              <Room room={room} joinRoom={joinRoom} user={user} key={room.id} />
            ))}
          </div>
        </div> : <Reconnecting />
      }
    </>
  );

};

export default Lobby;
