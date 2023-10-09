import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DifficultyState } from '../types/types';
import { setDifficultyInLocalStorage } from '../util/localStorage';

const initialDifficultyState: DifficultyState = {
  difficulty: 'Beginner',
  mineNum: 10,
  width: 8,
  height: 8,
};

export const difficultySlice = createSlice({
  name: 'difficulty',
  initialState: initialDifficultyState,
  reducers: {
    setDifficulty: (state, action: PayloadAction<DifficultyState>) => {
      state.difficulty = action.payload.difficulty;
      state.mineNum = action.payload.mineNum;
      state.width = action.payload.width;
      state.height = action.payload.height;
      setDifficultyInLocalStorage(state);
    },
  },
});

export const { setDifficulty } = difficultySlice.actions;
