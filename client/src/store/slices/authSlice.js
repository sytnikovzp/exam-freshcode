import { createSlice } from '@reduxjs/toolkit';

import { AUTH_MODES, SLICE_NAMES } from '../../constants';
import {
  decorateAsyncThunk,
  fulfilledReducer,
  pendingReducer,
  rejectedReducer,
} from '../../utils/reduxUtils';
import * as restController from '../../api/rest/restController';

const initialState = {
  isFetching: false,
  error: null,
};

export const checkAuth = decorateAsyncThunk({
  key: `${SLICE_NAMES.AUTH}/checkAuth`,
  thunk: async ({ data: authInfo, navigate, authMode }) => {
    authMode === AUTH_MODES.LOGIN
      ? await restController.loginRequest(authInfo)
      : await restController.registerRequest(authInfo);
    navigate('/', { replace: true });
  },
});

const reducers = {
  clearAuthError: (state) => {
    state.error = null;
  },
  clearAuth: () => initialState,
};

const extraReducers = (builder) => {
  builder.addCase(checkAuth.pending, pendingReducer);
  builder.addCase(checkAuth.fulfilled, fulfilledReducer);
  builder.addCase(checkAuth.rejected, rejectedReducer);
};

const authSlice = createSlice({
  name: `${SLICE_NAMES.AUTH}`,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = authSlice;

export const { clearAuthError, clearAuth } = actions;

export default reducer;
