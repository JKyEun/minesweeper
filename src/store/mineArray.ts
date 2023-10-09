import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { EachRect, MineArrayState } from '../types/types';

const initialMineArrayState: MineArrayState = {
  mineArray: [],
};

export const mineArraySlice = createSlice({
  name: 'mineArray',
  initialState: initialMineArrayState,
  reducers: {
    setMineArray: (state, action: PayloadAction<EachRect[][]>) => {
      state.mineArray = action.payload;
    },
  },
});

export const { setMineArray } = mineArraySlice.actions;
