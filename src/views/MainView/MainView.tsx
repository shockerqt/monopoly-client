import { Views } from '../../routes/Monopoly';
import './MainView.scss';

const MainView = ({ setView }: { setView: React.Dispatch<React.SetStateAction<Views>>}) => {
  return (
    <div className="main-view">
      <div className="main-buttons">
        <button onClick={() => setView('multi')}><span>Multi</span></button>
      </div>
    </div>
  );
};

export default MainView;
