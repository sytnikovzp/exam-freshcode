import { ClipLoader } from 'react-spinners';

import styles from './SpinnerLoader.module.sass';

function SpinnerLoader() {
  return (
    <div className={styles.loaderContainer}>
      <ClipLoader loading color='#46568a' size={50} />
    </div>
  );
}

export default SpinnerLoader;
