import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SpinnerLoader from '../../SpinnerLoader/SpinnerLoader';

function PrivateRoute() {
  const { data, isFetching } = useSelector((state) => state.userStore);

  if (isFetching) {
    return <SpinnerLoader />;
  }

  return data ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoute;
