import { Link, useLocation } from 'react-router-dom';

import { STATIC_PATHS } from '../../../constants';

import Logo from '../../Logo/Logo';

import styles from './AuthHeader.module.sass';

function AuthHeader() {
  const { pathname } = useLocation();

  const isLoginPage = pathname === '/login';

  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.headerAuthPage}>
          <Logo alt='logo' src={`${STATIC_PATHS.IMAGES}/logo.png`} />
          <div className={styles.linkAuthContainer}>
            <Link
              style={{ textDecoration: 'none' }}
              to={isLoginPage ? '/registration' : '/login'}
            >
              <span>{isLoginPage ? 'Signup' : 'Login'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthHeader;
