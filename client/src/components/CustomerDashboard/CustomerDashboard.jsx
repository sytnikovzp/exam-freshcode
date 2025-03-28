import { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { CONTEST_STATUS, USER_ROLES } from '../../constants';

import {
  clearContestsList,
  getContests,
  setNewCustomerFilter,
} from '../../store/slices/contestsSlice';

import ContestBox from '../ContestBox/ContestBox';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import TryAgain from '../TryAgain/TryAgain';

import styles from './CustomerDashboard.module.sass';

class CustomerDashboard extends Component {
  loadMore = (startFrom) => {
    this.props.getContests({
      limit: 8,
      offset: startFrom,
      contestStatus: this.props.customerFilter,
    });
  };

  componentDidMount() {
    this.getContests();
  }

  getContests = () => {
    this.props.getContests({
      limit: 8,
      contestStatus: this.props.customerFilter,
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.customerFilter !== prevProps.customerFilter) {
      this.getContests();
    }
  }

  goToExtended = (contest_id) => {
    this.props.navigate(`/contest/${contest_id}`);
  };

  setContestList = () => {
    const array = [];
    const { contests } = this.props;
    for (let i = 0; i < contests.length; i++) {
      array.push(
        <ContestBox
          key={contests[i].id}
          data={contests[i]}
          goToExtended={this.goToExtended}
        />
      );
    }
    return array;
  };

  componentWillUnmount() {
    this.props.clearContestsList();
  }

  tryToGetContest = () => {
    this.props.clearContestsList();
    this.getContests();
  };

  render() {
    const { error, haveMore } = this.props;
    const { customerFilter } = this.props;
    return (
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <div
            className={classNames({
              [styles.activeFilter]: CONTEST_STATUS.ACTIVE === customerFilter,
              [styles.filter]: CONTEST_STATUS.ACTIVE !== customerFilter,
            })}
            onClick={() => this.props.newFilter(CONTEST_STATUS.ACTIVE)}
          >
            Active Contests
          </div>
          <div
            className={classNames({
              [styles.activeFilter]: CONTEST_STATUS.FINISHED === customerFilter,
              [styles.filter]: CONTEST_STATUS.FINISHED !== customerFilter,
            })}
            onClick={() => this.props.newFilter(CONTEST_STATUS.FINISHED)}
          >
            Completed contests
          </div>
          <div
            className={classNames({
              [styles.activeFilter]: CONTEST_STATUS.PENDING === customerFilter,
              [styles.filter]: CONTEST_STATUS.PENDING !== customerFilter,
            })}
            onClick={() => this.props.newFilter(CONTEST_STATUS.PENDING)}
          >
            Inactive contests
          </div>
        </div>
        <div className={styles.contestsContainer}>
          {error ? (
            <TryAgain getData={this.tryToGetContest()} />
          ) : (
            <ContestsContainer
              haveMore={haveMore}
              isFetching={this.props.isFetching}
              loadMore={this.loadMore}
              navigate={this.props.navigate}
            >
              {this.setContestList()}
            </ContestsContainer>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.contestsList;

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) =>
    dispatch(getContests({ requestData: data, role: USER_ROLES.CUSTOMER })),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: (filter) => dispatch(setNewCustomerFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
