import { createSlice } from '@reduxjs/toolkit';

import { SLICE_NAMES, UI_MODES } from '../../constants';

const initialState = {
  profileViewMode: UI_MODES.USER_INFO,
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
