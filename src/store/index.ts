import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { DifficultyState } from '../types/types';
import { setDifficultyInLocalStorage } from '../util/localStorage';

const initialDifficultyState: DifficultyState = {
  difficulty: 'Beginner',
  mineNum: 10,
  width: 8,
  height: 8,
};

const answerSlice = createSlice({
  name: 'difficulty',
  initialState: initialDifficultyState,
  reducers: {
    setDifficulty: (
      state,
      action: PayloadAction<{ difficulty: string; mineNum: number; width: number; height: number }>
    ) => {
      state.difficulty = action.payload.difficulty;
      state.mineNum = action.payload.mineNum;
      state.width = action.payload.width;
      state.height = action.payload.height;
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
