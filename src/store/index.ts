import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { DifficultyState } from '../types/types';
import { setDifficultyInLocalStorage } from '../util/localStorage';

const initialDifficultyState: DifficultyState = {
  difficulty: 'Beginner',
  mineNum: 10,
};

const answerSlice = createSlice({
  name: 'difficulty',
  initialState: initialDifficultyState,
  reducers: {
    setDifficulty: (state, action: PayloadAction<{ difficulty: string; mineNum: number }>) => {
      state.difficulty = action.payload.difficulty;
      state.mineNum = action.payload.mineNum;
      setDifficultyInLocalStorage(state);
    },
  },
});

const store = configureStore({
  reducer: {
    difficulty: answerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const { setDifficulty } = answerSlice.actions;
export default store;
