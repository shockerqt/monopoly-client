import { lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Layout } from './routes';

const Lobby = lazy(() => import(/* webpackChunkName: "lobby" */ './routes/Lobby'));
const Monopoly = lazy(() => import(/* webpackChunkName: "monopoly" */ './routes/Monopoly'));

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={
            <Suspense fallback={<>...</>}>
              <Lobby />
            </Suspense>
          } />

          <Route path="monopoly" element={
            <Suspense fallback={<>...</>}>
              <Monopoly />
            </Suspense>
          } />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
