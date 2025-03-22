import { createSlice } from '@reduxjs/toolkit';

import {
  decorateAsyncThunk,
  fulfilledReducer,
  pendingReducer,
  rejectedReducer,
} from '../../utils/reduxUtils';
import * as restController from '../../api/rest/restController';

import { SLICE_NAMES } from '../../constant';

import { updateStoreAfterUpdateContest } from './contestByIdSlice';

const initialState = {
  isFetching: true,
  error: null,
};

export const updateContest = decorateAsyncThunk({
  key: SLICE_NAMES.CONTEST_UPDATION,
  thunk: async (payload, { dispatch }) => {
    const { data } = await restController.updateContest(payload);
    dispatch(updateStoreAfterUpdateContest(data));
  },
});

const reducers = {
  clearContestUpdationStore: () => initialState,
};

const extraReducers = (builder) => {
  builder.addCase(updateContest.pending, pendingReducer);
  builder.addCase(updateContest.fulfilled, fulfilledReducer);
  builder.addCase(updateContest.rejected, rejectedReducer);
};

const contestUpdationSlice = createSlice({
  name: SLICE_NAMES.CONTEST_UPDATION,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestUpdationSlice;

export const { clearContestUpdationStore } = actions;

export default reducer;
