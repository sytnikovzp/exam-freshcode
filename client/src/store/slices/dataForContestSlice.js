import { createSlice } from '@reduxjs/toolkit';

import { SLICE_NAMES } from '../../constants';
import { decorateAsyncThunk, rejectedReducer } from '../../utils/reduxUtils';
import * as restController from '../../api/rest/restController';

const initialState = {
  isFetching: true,
  data: null,
  error: null,
};

export const getDataForContest = decorateAsyncThunk({
  key: `${SLICE_NAMES.DATA_FOR_CONTEST}/getDataForContest`,
  thunk: async (payload) => {
    const { data } = await restController.dataForContest(payload);
    return data;
  },
});

const extraReducers = (builder) => {
  builder.addCase(getDataForContest.pending, (state) => {
    state.isFetching = true;
    state.data = null;
    state.error = null;
  });
  builder.addCase(getDataForContest.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.data = payload;
  });
  builder.addCase(getDataForContest.rejected, rejectedReducer);
};

const dataForContestSlice = createSlice({
  name: `${SLICE_NAMES.DATA_FOR_CONTEST}`,
  initialState,
  reducers: {},
  extraReducers,
});

const { reducer } = dataForContestSlice;

export default reducer;
