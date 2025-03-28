import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../../../store/slices/userSlice';

import SpinnerLoader from '../../SpinnerLoader/SpinnerLoader';

function OnlyNotAuthorizedUserRoute() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isFetching } = useSelector((state) => state.userStore);

  useEffect(() => {
    dispatch(getUser(navigate));
  }, [dispatch, navigate]);

  if (isFetching) {
    return <SpinnerLoader />;
  }

  return data ? navigate('/') : <Outlet />;
}

export default OnlyNotAuthorizedUserRoute;
