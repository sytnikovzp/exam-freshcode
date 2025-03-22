import { createSlice } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '../../constants';

const initialState = {
  contests: {},
};

const reducers = {
  saveContestToStore: (state, { payload: { type, info } }) => {
    state.contests = {
      ...state.contests,
      ...{ [type]: info },
    };
  },
  clearContestStore: () => initialState,
};

const contestSavingSlice = createSlice({
  name: SLICE_NAMES.CONTEST_SAVING,
  initialState,
  reducers,
});

const { actions, reducer } = contestSavingSlice;

export const { saveContestToStore, clearContestStore } = actions;

export default reducer;
