import { useNavigate } from 'react-router-dom';

import styles from './BackButton.module.sass';

function BackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.buttonContainer} onClick={goBack}>
      <span>Back</span>
    </div>
  );
}

export default BackButton;
