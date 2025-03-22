import { createSlice } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '../../constants';

const initialState = {
  bundle: null,
};

const reducers = {
  updateBundle: (state, { payload }) => {
    state.bundle = payload;
  },
};

const bundleSlice = createSlice({
  name: `${SLICE_NAMES.BUNDLE}`,
  initialState,
  reducers,
});

const { actions, reducer } = bundleSlice;

export const { updateBundle } = actions;

export default reducer;
