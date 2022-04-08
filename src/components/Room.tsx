import { useState } from 'react';
import './Room.scss';

interface RoomProps {
  room: RoomData;
  joinRoom: (roomId: number, password: string) => void;
  user: { id: number, nick: string };
}

const Room = ({ room, joinRoom, user }: RoomProps ) => {
  const [password, setPassword] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const onRoomClick = () => {
    if (room.hasPassword) setOpenModal(true);
    else joinRoom(room.id, password);
  };

  const passwordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    joinRoom(room.id, password);
    setOpenModal(false);
  };

  const startGame = () => {
    console.log('START GAME');
  };

  return (
    <div onClick={onRoomClick} className="room">
      {room.hasPassword ? '🔒' : '🔓'}
      {openModal ?
        <div className="room-modal">
          <form onSubmit={passwordSubmit}>
            <input
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </form>
        </div> : ''}
      {room.name}: <b>{room.users.map((roomUser) => ` ${roomUser.nick}${roomUser.id === room.roomMasterId ? '👑' : ''}`)}</b>
      {room.roomMasterId === user.id ? <button type="button" onClick={startGame}>Start Game</button> : ''}
    </div>
  );
};

export default Room;
