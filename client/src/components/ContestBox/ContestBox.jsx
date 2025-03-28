import moment from 'moment';

import { CONTEST_TYPES, STATIC_PATHS } from '../../constants';

import styles from './ContestBox.module.sass';

function ContestBox(props) {
  const getTimeStr = () => {
    const diff = moment.duration(moment().diff(moment(props.data.createdAt)));
    let str = '';
    if (diff._data.days !== 0) {
      str = `${diff._data.days}d `;
    }
    if (diff._data.hours !== 0) {
      str += `${diff._data.hours}h`;
    }
    if (str.length === 0) {
      str = 'less than one hour';
    }
    return str;
  };

  const getPreferenceContest = () => {
    const { data } = props;
    if (data.contestType === CONTEST_TYPES.NAME) {
      return data.typeOfName;
    }
    if (data.contestType === CONTEST_TYPES.LOGO) {
      return data.brandStyle;
    }
    return data.typeOfTagline;
  };

  const ucFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const { id, title, contestType, prize, count } = props.data;
  return (
    <div
      className={styles.contestBoxContainer}
      onClick={() => props.goToExtended(id)}
    >
      <div className={styles.mainContestInfo}>
        <div className={styles.titleAndIdContainer}>
          <span className={styles.title}>{title}</span>
          <span className={styles.id}>{`(#${id})`}</span>
        </div>
        <div className={styles.contestType}>
          <span>{`${ucFirstLetter(
            contestType
          )} / ${getPreferenceContest()}`}</span>
        </div>
        <div className={styles.contestType}>
          <span>
            This is an Invitation Only Contest and is only open to those
            Creatives who have achieved a Tier A status.
          </span>
        </div>
        <div className={styles.prizeContainer}>
          <div className={styles.guaranteedContainer}>
            <div>
              <img alt='check' src={`${STATIC_PATHS.IMAGES}/smallCheck.png`} />
            </div>
            <span>Guaranteed prize</span>
          </div>
          <div className={styles.prize}>
            <img alt='diamond' src={`${STATIC_PATHS.IMAGES}/diamond.png`} />
            <span>{`$${prize}`}</span>
          </div>
        </div>
      </div>
      <div className={styles.entryAndTimeContainer}>
        <div className={styles.entriesContainer}>
          <div className={styles.entriesCounter}>
            <img alt='logo' src={`${STATIC_PATHS.IMAGES}/entrieImage.png`} />
            <span>{count}</span>
          </div>
          <span>Entries</span>
        </div>
        <div className={styles.timeContainer}>
          <span className={styles.timeContest}>{getTimeStr()}</span>
          <span>Going</span>
        </div>
      </div>
    </div>
  );
}

export default ContestBox;
