import React from 'react';

import SpinnerLoader from '../SpinnerLoader/SpinnerLoader';

import styles from './ContestsContainer.module.sass';

class ContestsContainer extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  scrollHandler = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (this.props.haveMore) {
        this.props.loadMore(this.props.children.length);
      }
    }
  };

  render() {
    const { isFetching } = this.props;
    if (!isFetching && this.props.children.length === 0) {
      return <div className={styles.notFound}>Nothing not found</div>;
    }
    return (
      <div>
        {this.props.children}
        {isFetching && (
          <div className={styles.spinnerContainer}>
            <SpinnerLoader />
          </div>
        )}
      </div>
    );
  }
}

export default ContestsContainer;
