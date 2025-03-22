import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';

import { CONTEST_TYPES } from './constants';

import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import NotFound from './components/NotFound/NotFound';
import OnlyNotAuthorizedUserRoute from './components/Routes/OnlyNotAuthorizedUserRoute/OnlyNotAuthorizedUserRoute';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';

import ContestCreationPage from './pages/ContestCreationPage/ContestCreationPage';
import ContestPage from './pages/ContestPage/ContestPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import HomePage from './pages/HomePage/HomePage';
import Layout from './pages/Layout/Layout';
import LoginPage from './pages/LoginPage/LoginPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';

import browserHistory from './browserHistory';
import Router from './router';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router history={browserHistory}>
      <ToastContainer
        closeOnClick
        draggable
        hideProgressBar
        pauseOnHover
        pauseOnVisibilityChange
        autoClose={5000}
        newestOnTop={false}
        position='top-center'
        rtl={false}
      />
      <Routes>
        <Route element={<Layout />} path='/'>
          <Route index element={<HomePage />} />

          <Route element={<OnlyNotAuthorizedUserRoute />}>
            <Route element={<LoginPage />} path='/login' />
            <Route element={<RegistrationPage />} path='/registration' />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route element={<PaymentPage />} path='/payment' />
            <Route element={<StartContestPage />} path='/startContest' />
            <Route
              element={
                <ContestCreationPage
                  contestType={CONTEST_TYPES.NAME}
                  title='Company Name'
                />
              }
              path='/startContest/nameContest'
            />
            <Route
              element={
                <ContestCreationPage
                  contestType={CONTEST_TYPES.TAGLINE}
                  title='TAGLINE'
                />
              }
              path='/startContest/taglineContest'
            />
            <Route
              element={
                <ContestCreationPage
                  contestType={CONTEST_TYPES.LOGO}
                  title='LOGO'
                />
              }
              path='/startContest/logoContest'
            />
            <Route element={<DashboardPage />} path='/dashboard' />
            <Route element={<ContestPage />} path='/contest/:id' />
            <Route element={<UserProfilePage />} path='/account' />
          </Route>
          <Route element={<NotFound />} path='*' />
        </Route>
      </Routes>
      <ChatContainer />
    </Router>
  );
}

export default App;
