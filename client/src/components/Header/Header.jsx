import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { API_CONFIG, STATIC_PATHS, USER_ROLES } from '../../constants';

import { clearUserStore, getUser } from '../../store/slices/userSlice';

import styles from './Header.module.sass';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isFetching } = useSelector((state) => state.userStore);

  useEffect(() => {
    if (!data) {
      dispatch(getUser());
    }
  }, [data, dispatch]);

  const logout = () => {
    localStorage.clear();
    dispatch(clearUserStore());
    navigate('/login', { replace: true });
  };

  const startContests = () => {
    navigate('/startContest');
  };

  const renderLoginButtons = () => {
    if (data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              alt='user'
              src={
                data.avatar === 'anon.png'
                  ? STATIC_PATHS.ANONYM_IMAGE
                  : `${API_CONFIG.PUBLIC_URL}/${data.avatar}`
              }
            />
            <span>{`Hi, ${data.displayName}`}</span>
            <img alt='menu' src={`${STATIC_PATHS.IMAGES}/menu-down.png`} />
            <ul>
              <li>
                <Link style={{ textDecoration: 'none' }} to='/dashboard'>
                  <span>View Dashboard</span>
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: 'none' }} to='/account'>
                  <span>My Account</span>
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: 'none' }} to='#'>
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: 'none' }} to='#'>
                  <span>Affiliate Dashboard</span>
                </Link>
              </li>
              <li>
                <span onClick={logout}>Logout</span>
              </li>
            </ul>
          </div>
          <img
            alt='email'
            className={styles.emailIcon}
            src={`${STATIC_PATHS.IMAGES}/email.png`}
          />
        </>
      );
    }
    return (
      <>
        <Link style={{ textDecoration: 'none' }} to='/login'>
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link style={{ textDecoration: 'none' }} to='/registration'>
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    );
  };

  if (isFetching) {
    return null;
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.fixedHeader}>
        <span className={styles.info}>
          Squadhelp recognized as one of the Most Innovative Companies by Inc
          Magazine.
        </span>
        <a href='#'>Read Announcement</a>
      </div>
      <div className={styles.loginSignnUpHeaders}>
        <div className={styles.numberContainer}>
          <img alt='phone' src={`${STATIC_PATHS.IMAGES}/phone.png`} />
          <span>(877)&nbsp;355-3585</span>
        </div>
        <div className={styles.userButtonsContainer}>
          {renderLoginButtons()}
        </div>
      </div>
      <div className={styles.navContainer}>
        <img
          alt='blue_logo'
          className={styles.logo}
          src={`${STATIC_PATHS.IMAGES}/blue-logo.png`}
        />
        <div className={styles.leftNav}>
          <div className={styles.nav}>
            <ul>
              <li>
                <span>NAME IDEAS</span>
                <img alt='menu' src={`${STATIC_PATHS.IMAGES}/menu-down.png`} />
                <ul>
                  <li>
                    <a href='#'>Beauty</a>
                  </li>
                  <li>
                    <a href='#'>Consulting</a>
                  </li>
                  <li>
                    <a href='#'>E-Commerce</a>
                  </li>
                  <li>
                    <a href='#'>Fashion & Clothing</a>
                  </li>
                  <li>
                    <a href='#'>Finance</a>
                  </li>
                  <li>
                    <a href='#'>Real Estate</a>
                  </li>
                  <li>
                    <a href='#'>Tech</a>
                  </li>
                  <li className={styles.last}>
                    <a href='#'>More Categories</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>CONTESTS</span>
                <img alt='menu' src={`${STATIC_PATHS.IMAGES}/menu-down.png`} />
                <ul>
                  <li>
                    <a href='#'>HOW IT WORKS</a>
                  </li>
                  <li>
                    <a href='#'>PRICING</a>
                  </li>
                  <li>
                    <a href='#'>AGENCY SERVICE</a>
                  </li>
                  <li>
                    <a href='#'>ACTIVE CONTESTS</a>
                  </li>
                  <li>
                    <a href='#'>WINNERS</a>
                  </li>
                  <li>
                    <a href='#'>LEADERBOARD</a>
                  </li>
                  <li className={styles.last}>
                    <a href='#'>BECOME A CREATIVE</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Our Work</span>
                <img alt='menu' src={`${STATIC_PATHS.IMAGES}/menu-down.png`} />
                <ul>
                  <li>
                    <a href='#'>NAMES</a>
                  </li>
                  <li>
                    <a href='#'>TAGLINES</a>
                  </li>
                  <li>
                    <a href='#'>LOGOS</a>
                  </li>
                  <li className={styles.last}>
                    <a href='#'>TESTIMONIALS</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Names For Sale</span>
                <img alt='menu' src={`${STATIC_PATHS.IMAGES}/menu-down.png`} />
                <ul>
                  <li>
                    <a href='#'>POPULAR NAMES</a>
                  </li>
                  <li>
                    <a href='#'>SHORT NAMES</a>
                  </li>
                  <li>
                    <a href='#'>INTRIGUING NAMES</a>
                  </li>
                  <li>
                    <a href='#'>NAMES BY CATEGORY</a>
                  </li>
                  <li>
                    <a href='#'>VISUAL NAME SEARCH</a>
                  </li>
                  <li className={styles.last}>
                    <a href='#'>SELL YOUR DOMAINS</a>
                  </li>
                </ul>
              </li>
              <li>
                <span>Blog</span>
                <img alt='menu' src={`${STATIC_PATHS.IMAGES}/menu-down.png`} />
                <ul>
                  <li>
                    <a href='#'>ULTIMATE NAMING GUIDE</a>
                  </li>
                  <li>
                    <a href='#'>POETIC DEVICES IN BUSINESS NAMING</a>
                  </li>
                  <li>
                    <a href='#'>CROWDED BAR THEORY</a>
                  </li>
                  <li className={styles.last}>
                    <a href='#'>ALL ARTICLES</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          {data && data.role !== USER_ROLES.CREATOR && (
            <div className={styles.startContestBtn} onClick={startContests}>
              START CONTEST
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
