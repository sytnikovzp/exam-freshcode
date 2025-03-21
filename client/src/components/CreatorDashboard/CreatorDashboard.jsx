import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import queryString from 'query-string';

import CONSTANTS from '../../constants';

import {
  clearContestsList,
  getContests,
  setNewCreatorFilter,
} from '../../store/slices/contestsSlice';
import { getDataForContest } from '../../store/slices/dataForContestSlice';

import withRouter from '../../hocs/withRouter';
import ContestBox from '../ContestBox/ContestBox';
import ContestsContainer from '../ContestsContainer/ContestsContainer';
import TryAgain from '../TryAgain/TryAgain';

import styles from './CreatorDashboard.module.sass';

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

class CreatorDashboard extends React.Component {
  renderSelectType = () => {
    const array = [];
    const { creatorFilter } = this.props;
    for (const [i, el] of types.entries()) {
      !i ||
        array.push(
          <option key={i - 1} value={el}>
            {el}
          </option>
        );
    }
    return (
      <select
        className={styles.input}
        value={types[creatorFilter.typeIndex]}
        onChange={({ target }) =>
          this.changePredicate({
            name: 'typeIndex',
            value: types.indexOf(target.value),
          })
        }
      >
        {array}
      </select>
    );
  };

  renderIndustryType = () => {
    const array = [];
    const { creatorFilter } = this.props;
    const { industry } = this.props.dataForContest.data;
    array.push(
      <option key={0} value={null}>
        Choose industry
      </option>
    );
    industry.forEach((industry, i) =>
      array.push(
        <option key={i + 1} value={industry}>
          {industry}
        </option>
      )
    );
    return (
      <select
        className={styles.input}
        value={creatorFilter.industry}
        onChange={({ target }) =>
          this.changePredicate({
            name: 'industry',
            value: target.value,
          })
        }
      >
        {array}
      </select>
    );
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.location.search !== this.props.location.search) {
      this.parseUrlForParams(nextProps.location.search);
    }
  }

  componentDidMount() {
    this.props.getDataForContest();
    if (
      this.parseUrlForParams(this.props.location.search) &&
      !this.props.contests.length
    ) {
      this.getContests(this.props.creatorFilter);
    }
  }

  getContests = (filter) => {
    this.props.getContests({
      limit: 8,
      offset: 0,
      ...filter,
    });
  };

  changePredicate = ({ name, value }) => {
    const { creatorFilter } = this.props;
    this.props.newFilter({
      [name]: value === 'Choose industry' ? null : value,
    });
    this.parseParamsToUrl({
      ...creatorFilter,
      ...{ [name]: value === 'Choose industry' ? null : value },
    });
  };

  parseParamsToUrl = (creatorFilter) => {
    const obj = {};
    for (const el of Object.keys(creatorFilter)) {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    }
    this.props.navigate(`/Dashboard?${queryString.stringify(obj)}`);
  };

  parseUrlForParams = (search) => {
    const obj = queryString.parse(search);
    const filter = {
      typeIndex: obj.typeIndex || 1,
      contestId: obj.contestId ? obj.contestId : '',
      industry: obj.industry ? obj.industry : '',
      awardSort: obj.awardSort || 'asc',
      ownEntries:
        typeof obj.ownEntries === 'undefined' ? false : obj.ownEntries,
    };
    if (!isEqual(filter, this.props.creatorFilter)) {
      this.props.newFilter(filter);
      this.props.clearContestsList();
      this.getContests(filter);
      return false;
    }
    return true;
  };

  getPredicateOfRequest = () => {
    const obj = {};
    const { creatorFilter } = this.props;
    for (const el of Object.keys(creatorFilter)) {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    }
    obj.ownEntries = creatorFilter.ownEntries;
    return obj;
  };

  loadMore = (startFrom) => {
    this.props.getContests({
      limit: 8,
      offset: startFrom,
      ...this.getPredicateOfRequest(),
    });
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

  goToExtended = (contestId) => {
    this.props.navigate(`/contest/${contestId}`);
  };

  tryLoadAgain = () => {
    this.props.clearContestsList();
    this.props.getContests({
      limit: 8,
      offset: 0,
      ...this.getPredicateOfRequest(),
    });
  };

  render() {
    const { error, haveMore, creatorFilter } = this.props;
    const { isFetching } = this.props.dataForContest;
    return (
      <div className={styles.mainContainer}>
        <div className={styles.filterContainer}>
          <span className={styles.headerFilter}>Filter Results</span>
          <div className={styles.inputsContainer}>
            <div
              className={classNames(styles.myEntries, {
                [styles.activeMyEntries]: creatorFilter.ownEntries,
              })}
              onClick={() =>
                this.changePredicate({
                  name: 'ownEntries',
                  value: !creatorFilter.ownEntries,
                })
              }
            >
              My Entries
            </div>
            <div className={styles.inputContainer}>
              <span>By contest type</span>
              {this.renderSelectType()}
            </div>
            <div className={styles.inputContainer}>
              <span>By contest ID</span>
              <input
                className={styles.input}
                name='contestId'
                type='text'
                value={creatorFilter.contestId}
                onChange={({ target }) =>
                  this.changePredicate({
                    name: 'contestId',
                    value: target.value,
                  })
                }
              />
            </div>
            {!isFetching && (
              <div className={styles.inputContainer}>
                <span>By industry</span>
                {this.renderIndustryType()}
              </div>
            )}
            <div className={styles.inputContainer}>
              <span>By amount award</span>
              <select
                className={styles.input}
                value={creatorFilter.awardSort}
                onChange={({ target }) =>
                  this.changePredicate({
                    name: 'awardSort',
                    value: target.value,
                  })
                }
              >
                <option value='desc'>Descending</option>
                <option value='asc'>Ascending</option>
              </select>
            </div>
          </div>
        </div>
        {error ? (
          <div className={styles.messageContainer}>
            <TryAgain getData={this.tryLoadAgain} />
          </div>
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
    );
  }
}

const mapStateToProps = (state) => {
  const { contestsList, dataForContest } = state;
  return { ...contestsList, dataForContest };
};

const mapDispatchToProps = (dispatch) => ({
  getContests: (data) =>
    dispatch(getContests({ requestData: data, role: CONSTANTS.CREATOR })),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: (filter) => dispatch(setNewCreatorFilter(filter)),
  getDataForContest: () => dispatch(getDataForContest()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreatorDashboard)
);
