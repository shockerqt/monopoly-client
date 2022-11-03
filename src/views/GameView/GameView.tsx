import { MonopolyData } from '../../hooks/useMonopolyData';
import { CustomSocket } from '../../hooks/useSocket';

const GameView = ({ socket, data }: { socket: CustomSocket | undefined, data: MonopolyData }) => {
  const { serverData, userData, localData, lobbyData } = data;

  return (
    <div>
      XD
    </div>
  );
};

export default GameView;
