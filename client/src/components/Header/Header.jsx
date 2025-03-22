import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CONSTANTS from '../../constants';

import { clearUserStore, getUser } from '../../store/slices/userSlice';

import withRouter from '../../hocs/withRouter';

import styles from './Header.module.sass';

class Header extends React.Component {
  componentDidMount() {
    if (!this.props.data) {
      this.props.getUser();
    }
  }

  logOut = () => {
    localStorage.clear();
    this.props.clearUserStore();
    this.props.navigate('/login', { replace: true });
  };

  startContests = () => {
    this.props.navigate('/startContest');
  };

  renderLoginButtons = () => {
    if (this.props.data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              alt='user'
              src={
                this.props.data.avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${this.props.data.avatar}`
              }
            />
            <span>{`Hi, ${this.props.data.displayName}`}</span>
            <img
              alt='menu'
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/menu-down.png`}
            />
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
                <span onClick={this.logOut}>Logout</span>
              </li>
            </ul>
          </div>
          <img
            alt='email'
            className={styles.emailIcon}
            src={`${CONSTANTS.STATIC_IMAGES_PATH}/email.png`}
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

  render() {
    if (this.props.isFetching) {
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
            <img
              alt='phone'
              src={`${CONSTANTS.STATIC_IMAGES_PATH}/phone.png`}
            />
            <span>(877)&nbsp;355-3585</span>
          </div>
          <div className={styles.userButtonsContainer}>
            {this.renderLoginButtons()}
          </div>
        </div>
        <div className={styles.navContainer}>
          <img
            alt='blue_logo'
            className={styles.logo}
            src={`${CONSTANTS.STATIC_IMAGES_PATH}/blue-logo.png`}
          />
          <div className={styles.leftNav}>
            <div className={styles.nav}>
              <ul>
                <li>
                  <span>NAME IDEAS</span>
                  <img
                    alt='menu'
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}/menu-down.png`}
                  />
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
                  <img
                    alt='menu'
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}/menu-down.png`}
                  />
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
                  <img
                    alt='menu'
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}/menu-down.png`}
                  />
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
                  <img
                    alt='menu'
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}/menu-down.png`}
                  />
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
                  <img
                    alt='menu'
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}/menu-down.png`}
                  />
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
            {this.props.data && this.props.data.role !== CONSTANTS.CREATOR && (
              <div
                className={styles.startContestBtn}
                onClick={this.startContests}
              >
                START CONTEST
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
  clearUserStore: () => dispatch(clearUserStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
