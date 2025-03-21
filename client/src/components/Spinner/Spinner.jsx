import { ClipLoader } from 'react-spinners';

// import { css } from '@emotion/core';
import styles from './Spinner.module.sass';

/* const override = css`
  border-color: #46568a;
`; */

function SpinnerLoader() {
  return (
    <div className={styles.loaderContainer}>
      <ClipLoader
        loading
        color='#46568a'
        size={50}
        sizeUnit='px'
        // css={override}
      />
    </div>
  );
}

export default SpinnerLoader;
