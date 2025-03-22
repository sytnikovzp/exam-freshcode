import { createSlice } from '@reduxjs/toolkit';

import CONSTANTS from '../../constants';
import {
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
} from '../../utils/reduxUtils';
import * as restController from '../../api/rest/restController';

import { SLICE_NAMES } from '../../constant';

import { clearContestStore } from './contestCreationSlice';
import { changeProfileViewMode } from './userProfileSlice';
import { updateUser } from './userSlice';

const initialState = {
  isFetching: false,
  error: null,
  focusOnElement: 'number',
};

export const pay = decorateAsyncThunk({
  key: `${SLICE_NAMES.PAYMENT}/pay`,
  thunk: async ({ data, navigate }, { dispatch }) => {
    await restController.payMent(data);
    navigate('/dashboard', { replace: true });
    dispatch(clearContestStore());
  },
});

export const cashOut = decorateAsyncThunk({
  key: `${SLICE_NAMES.PAYMENT}/cashOut`,
  thunk: async (payload, { dispatch }) => {
    const { data } = await restController.cashOut(payload);
    dispatch(updateUser.fulfilled(data));
    dispatch(changeProfileViewMode(CONSTANTS.USER_INFO_MODE));
  },
});

const reducers = {
  changeFocusOnCard: (state, { payload }) => {
    state.focusOnElement = payload;
  },
  clearPaymentStore: () => initialState,
};

const extraReducers = (builder) => {
  builder.addCase(pay.pending, pendingReducer);
  builder.addCase(pay.fulfilled, () => initialState);
  builder.addCase(pay.rejected, rejectedReducer);

  builder.addCase(cashOut.pending, pendingReducer);
  builder.addCase(cashOut.fulfilled, () => initialState);
  builder.addCase(cashOut.rejected, rejectedReducer);
};

const paymentSlice = createSlice({
  name: SLICE_NAMES.PAYMENT,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = paymentSlice;

export const { changeFocusOnCard, clearPaymentStore } = actions;

export default reducer;
