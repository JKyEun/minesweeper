import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { difficultySlice } from './difficulty';
import { mineArraySlice } from './mineArray';

const store = configureStore({
  reducer: {
    difficulty: difficultySlice.reducer,
    mineArray: mineArraySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
