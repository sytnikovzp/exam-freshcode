import styles from './NextButton.module.sass';

function NextButton(props) {
  const { submit } = props;

  return (
    <div className={styles.buttonContainer} onClick={submit}>
      <span>Next</span>
    </div>
  );
}

export default NextButton;
