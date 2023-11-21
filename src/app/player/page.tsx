'use client';

import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';
import PlayerComponent from './components/player';

export default function Player() {
  return (
    <ReduxProvider store={store}>
      <PlayerComponent />
    </ReduxProvider>
  );
}
