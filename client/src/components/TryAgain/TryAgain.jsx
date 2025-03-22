import styles from './TryAgain.module.sass';

function TryAgain({ getData }) {
  return (
    <div className={styles.container}>
      <span onClick={() => getData()}>Server Error. Try again</span>
      <i className='fas fa-redo' onClick={() => getData()} />
    </div>
  );
}

export default TryAgain;
