import styles from './NextButton.module.sass';

function NextButton({ submit }) {
  return (
    <div className={styles.buttonContainer} onClick={submit}>
      <span>Next</span>
    </div>
  );
}

export default NextButton;
