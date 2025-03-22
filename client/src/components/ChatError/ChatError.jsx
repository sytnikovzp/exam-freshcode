import styles from './ChatError.module.sass';

function ChatError({ getData }) {
  return (
    <div className={styles.errorContainer} onClick={() => getData()}>
      <div className={styles.container}>
        <span>Server Error</span>
        <i className='fas fa-redo' />
      </div>
    </div>
  );
}

export default ChatError;
