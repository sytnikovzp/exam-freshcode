import withRouter from '../../hocs/withRouter';

import styles from './Notification.module.sass';

function Notification(props) {
  return (
    <div>
      <br />
      <span>{props.message}</span>
      <br />
      {props.contestId && (
        <span
          className={styles.goToContest}
          onClick={() => props.navigate(`/contest/${props.contestId}`)}
        >
          Go to contest
        </span>
      )}
    </div>
  );
}

export default withRouter(Notification);
