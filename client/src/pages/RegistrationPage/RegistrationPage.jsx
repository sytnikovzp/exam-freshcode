import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

import styles from './RegistrationPage.module.sass';

function RegistrationPage() {
  return (
    <div className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
        <RegistrationForm />
      </div>
    </div>
  );
}

export default RegistrationPage;
