import { useNavigate } from 'react-router-dom';

import styles from './Notification.module.sass';

function Notification({ contestId, message }) {
  const navigate = useNavigate();

  return (
    <div>
      <br />
      <span>{message}</span>
      <br />
      {contestId && (
        <span
          className={styles.goToContest}
          onClick={() => navigate(`/contest/${contestId}`)}
        >
          Go to contest
        </span>
      )}
    </div>
  );
}

export default Notification;
