import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchTracks } from './store/tracksSlice';
import { Header } from './components/Header';
import { Table } from './components/Table';
import { TrackModal } from './components/TrackModal';
import { Loader } from './components/Loader';
import styles from './App.module.css';
import { store } from './store';

const AppContent = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.tracks.status);

  useEffect(() => {
    dispatch(fetchTracks());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Header />

      {status === 'loading' ? <Loader /> : (
        <main>
          <Table />
          <TrackModal />
        </main>
      )}
    </div>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;
