import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { USER_ROLES } from '../../constants';

import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';

function DashboardPage() {
  const navigate = useNavigate();
  const params = useParams();

  const { role } = useSelector((state) => state.userStore.data);
  return role === USER_ROLES.CUSTOMER ? (
    <CustomerDashboard navigate={navigate} params={params} />
  ) : (
    <CreatorDashboard navigate={navigate} params={params} />
  );
}

export default DashboardPage;
