import { createSlice } from '@reduxjs/toolkit';

import CONSTANTS from '../../constants';

import { SLICE_NAMES } from '../../constant';

const initialState = {
  profileViewMode: CONSTANTS.USER_INFO_MODE,
  isEdit: false,
};

const reducers = {
  changeProfileViewMode: (state, { payload }) => {
    state.profileViewMode = payload;
  },
  changeEditModeOnUserProfile: (state, { payload }) => {
    state.isEdit = payload;
  },
};

const userProfileSlice = createSlice({
  name: SLICE_NAMES.USER_PROFILE,
  initialState,
  reducers,
});

const { actions, reducer } = userProfileSlice;

export const { changeProfileViewMode, changeEditModeOnUserProfile } = actions;

export default reducer;
