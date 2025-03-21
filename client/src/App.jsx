import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom';

import CONSTANTS from './constants';

import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import NotFound from './components/NotFound/NotFound';
import OnlyNotAuthorizedUserRoute from './components/Routes/OnlyNotAuthorizedUserRoute/OnlyNotAuthorizedUserRoute';
import PrivateRoute from './components/Routes/PrivateRoute/PrivateRoute';

import ContestCreationPage from './pages/ContestCreation/ContestCreationPage';
import ContestPage from './pages/ContestPage/ContestPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Layout from './pages/Layout/Layout';
import LoginPage from './pages/LoginPage/LoginPage';
import Payment from './pages/Payment/Payment';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import StartContestPage from './pages/StartContestPage/StartContestPage';
import UserProfile from './pages/UserProfile/UserProfile';

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
          <Route index element={<Home />} />

          <Route element={<OnlyNotAuthorizedUserRoute />}>
            <Route element={<LoginPage />} path='/login' />
            <Route element={<RegistrationPage />} path='/registration' />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route element={<Payment />} path='/payment' />
            <Route element={<StartContestPage />} path='/startContest' />
            <Route
              element={
                <ContestCreationPage
                  contestType={CONSTANTS.NAME_CONTEST}
                  title='Company Name'
                />
              }
              path='/startContest/nameContest'
            />
            <Route
              element={
                <ContestCreationPage
                  contestType={CONSTANTS.TAGLINE_CONTEST}
                  title='TAGLINE'
                />
              }
              path='/startContest/taglineContest'
            />
            <Route
              element={
                <ContestCreationPage
                  contestType={CONSTANTS.LOGO_CONTEST}
                  title='LOGO'
                />
              }
              path='/startContest/logoContest'
            />
            <Route element={<Dashboard />} path='/dashboard' />
            <Route element={<ContestPage />} path='/contest/:id' />
            <Route element={<UserProfile />} path='/account' />
          </Route>
          <Route element={<NotFound />} path='*' />
        </Route>
      </Routes>
      <ChatContainer />
    </Router>
  );
}

export default App;
