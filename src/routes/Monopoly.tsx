import { lazy, Suspense, useEffect, useState } from 'react';
import Reconnecting from '../components/Reconnecting';
import { useMonopolyData } from '../hooks/useMonopolyData';
import { useSocket } from '../hooks/useSocket';

export type Views = 'main' | 'multi' | 'lobby' | 'game';

const MainView = lazy(() => import(/* webpackChunkName: "mainView" */ '../views/MainView/MainView'));
const MultiView = lazy(() => import(/* webpackChunkName: "mainView" */ '../views/MultiView/MultiView'));
const GameView = lazy(() => import(/* webpackChunkName: "game" */ '../views/GameView/GameView'));


const Monopoly = () => {
  const socket = useSocket();
  const data = useMonopolyData(socket);
  const [view, setView] = useState<Views>('main');

  useEffect(() => {
    if (!data.lobbyData && view !== 'main') setView('multi');
    if (data.lobbyData?.state === 'creating') setView('lobby');
    if (data.lobbyData?.state === 'ingame') setView('game');
  }, [data.lobbyData]);

  return (
    <>
      {
        data.localData.online ?
          <>
            {view === 'main' &&
              <Suspense fallback={<>...</>}>
                <MainView setView={setView} />
              </Suspense>}
            {view === 'multi' &&
              <Suspense fallback={<>...</>}>
                <MultiView setView={setView} socket={socket} data={data} />
              </Suspense>}
            {view === 'game' &&
              <Suspense fallback={<>...</>}>
                <GameView socket={socket} data={data} />
              </Suspense>}
          </> : <Reconnecting />
      }
    </>
  );
};

export default Monopoly;
