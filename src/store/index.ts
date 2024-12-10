import { configureStore } from '@reduxjs/toolkit';
import tracksReducer from './tracksSlice';
import calendarReducer from './calendarSlice';
import trackFormReducer from './trackFormSlice';

export const store = configureStore({
  reducer: {
    tracks: tracksReducer,
    calendar: calendarReducer,
    trackForm: trackFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
