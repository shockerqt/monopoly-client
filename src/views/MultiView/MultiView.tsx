import { MonopolyData } from '../../hooks/useMonopolyData';
import { CustomSocket } from '../../hooks/useSocket';
import { Views } from '../../routes/Monopoly';
import LobbyList from './components/LobbyList';

import './MultiView.scss';

interface MultiViewProps {
  socket: CustomSocket | undefined;
  data: MonopolyData;
  setView: React.Dispatch<React.SetStateAction<Views>>
}

const MultiView = ({ setView, socket, data }: MultiViewProps) => {
  return (
    <div className="multi-view">
      <header>
        <button onClick={() => setView('main')}>Back</button>
      </header>
      <LobbyList socket={socket} data={data} />
    </div>
  );
};

export default MultiView;
