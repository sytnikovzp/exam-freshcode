import withRouter from '../../hocs/withRouter';

import styles from './BackButton.module.sass';

function BackButton(props) {
  function clickHandler() {
    props.navigate(-1);
  }

  return (
    <div className={styles.buttonContainer} onClick={clickHandler}>
      <span>Back</span>
    </div>
  );
}

export default withRouter(BackButton);
