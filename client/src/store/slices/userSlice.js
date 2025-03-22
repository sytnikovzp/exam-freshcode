import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { rejectedReducer } from '../../utils/reduxUtils';
import * as restController from '../../api/rest/restController';
import { controller } from '../../api/ws/socketController';

import { SLICE_NAMES } from '../../constant';

import { changeEditModeOnUserProfile } from './userProfileSlice';

const initialState = {
  isFetching: true,
  error: null,
  data: null,
};

export const getUser = createAsyncThunk(
  `${SLICE_NAMES.USER}/getUser`,
  async (navigate, { rejectWithValue }) => {
    try {
      const { data } = await restController.getUser();
      controller.subscribe(data.id);
      if (navigate) {
        navigate('/', { replace: true });
      }
      return data;
    } catch (err) {
      return rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
        status: err?.response?.status ?? 504,
      });
    }
  }
);

export const updateUser = createAsyncThunk(
  `${SLICE_NAMES.USER}/updateUser`,
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await restController.updateUser(payload);
      dispatch(changeEditModeOnUserProfile(false));
      return data;
    } catch (err) {
      return rejectWithValue({
        data: err?.response?.data ?? 'Gateway Timeout',
        status: err?.response?.status ?? 504,
      });
    }
  }
);

const reducers = {
  clearUserStore: (state) => {
    state.error = null;
    state.data = null;
  },
  clearUserError: (state) => {
    state.error = null;
  },
};

const extraReducers = (builder) => {
  builder.addCase(getUser.pending, (state) => {
    state.isFetching = true;
    state.error = null;
    state.data = null;
  });
  builder.addCase(getUser.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.data = payload;
  });
  builder.addCase(getUser.rejected, rejectedReducer);

  builder.addCase(updateUser.fulfilled, (state, { payload }) => {
    state.data = { ...state.data, ...payload };
    state.error = null;
  });
  builder.addCase(updateUser.rejected, (state, { payload }) => {
    state.error = payload;
  });
};

const userSlice = createSlice({
  name: SLICE_NAMES.USER,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = userSlice;

export const { clearUserStore, clearUserError } = actions;

export default reducer;
