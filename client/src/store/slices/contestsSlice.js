import { createSlice } from '@reduxjs/toolkit';

import { CONTEST_STATUS, SLICE_NAMES, USER_ROLES } from '../../constants';
import { decorateAsyncThunk, pendingReducer } from '../../utils/reduxUtils';
import * as restController from '../../api/rest/restController';

const initialState = {
  isFetching: true,
  error: null,
  contests: [],
  customerFilter: CONTEST_STATUS.ACTIVE,
  creatorFilter: {
    typeIndex: 1,
    contestId: '',
    industry: '',
    awardSort: 'asc',
    ownEntries: false,
  },
  haveMore: true,
};

export const getContests = decorateAsyncThunk({
  key: `${SLICE_NAMES.CONTESTS}/getContests`,
  thunk: async ({ requestData, role }) => {
    const { data } =
      role === USER_ROLES.CUSTOMER
        ? await restController.getCustomersContests(requestData)
        : await restController.getActiveContests(requestData);
    return data;
  },
});

const reducers = {
  clearContestsList: (state) => {
    state.error = null;
    state.contests = [];
  },
  setNewCustomerFilter: (state, { payload }) => ({
    ...initialState,
    isFetching: false,
    customerFilter: payload,
  }),
  setNewCreatorFilter: (state, { payload }) => ({
    ...initialState,
    isFetching: false,
    creatorFilter: { ...state.creatorFilter, ...payload },
  }),
};

const extraReducers = (builder) => {
  builder.addCase(getContests.pending, pendingReducer);
  builder.addCase(getContests.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.contests = [...state.contests, ...payload.contests];
    state.haveMore = payload.haveMore;
  });
  builder.addCase(getContests.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
    state.contests = [];
  });
};

const contestsSlice = createSlice({
  name: SLICE_NAMES.CONTESTS,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestsSlice;

export const { clearContestsList, setNewCustomerFilter, setNewCreatorFilter } =
  actions;

export default reducer;
