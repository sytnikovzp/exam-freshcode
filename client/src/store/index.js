import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

import { initSocket } from '../api/ws/socketController';

import authReducer from './slices/authSlice';
import bundleReducer from './slices/bundleSlice';
import chatReducer from './slices/chatSlice';
import contestByIdReducer from './slices/contestByIdSlice';
import contestCreationReducer from './slices/contestCreationSlice';
import contestsReducer from './slices/contestsSlice';
import contestUpdationReducer from './slices/contestUpdationSlice';
import dataForContestReducer from './slices/dataForContestSlice';
import paymentReducer from './slices/paymentSlice';
import userProfileReducer from './slices/userProfileSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    userStore: userReducer,
    getDataForContest: dataForContestReducer,
    payment: paymentReducer,
    contestsList: contestsReducer,
    contestCreationStore: contestCreationReducer,
    bundleStore: bundleReducer,
    contestByIdStore: contestByIdReducer,
    contestUpdationStore: contestUpdationReducer,
    chatStore: chatReducer,
    userProfile: userProfileReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

initSocket(store);

export default store;
