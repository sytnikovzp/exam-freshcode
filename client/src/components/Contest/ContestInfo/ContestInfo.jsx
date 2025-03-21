import CONSTANTS from '../../../constants';

import styles from '../../Brief/Brief.module.sass';

import LogoContestSpecialInfo from './LogoContestSpecialInfo';
import NameContestSpecialInfo from './NameContestSpecialInfo';
import TaglineContestSpecialInfo from './TaglineContestSpecialInfo';

function ContestInfo(props) {
  const { changeEditContest, userId, contestData, role, goChat } = props;
  const {
    typeOfTagline,
    brandStyle,
    typeOfName,
    styleName,
    contestType,
    title,
    focusOfWork,
    targetCustomer,
    industry,
    originalFileName,
    fileName,
    User,
    status,
  } = contestData;
  return (
    <div className={styles.mainContestInfoContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.contestTypeContainer}>
          <div className={styles.dataContainer}>
            <span className={styles.label}>Contest Type</span>
            <span className={styles.data}>{contestType}</span>
          </div>
          {User.id === userId &&
            status !== CONSTANTS.CONTEST_STATUS_FINISHED && (
              <div
                className={styles.editBtn}
                onClick={() => changeEditContest(true)}
              >
                Edit
              </div>
            )}
          {role !== CONSTANTS.CUSTOMER && (
            <i className='fas fa-comments' onClick={goChat} />
          )}
        </div>
        <div className={styles.dataContainer}>
          <span className={styles.label}>Title of the Project</span>
          <span className={styles.data}>{title}</span>
        </div>
        {contestType === CONSTANTS.NAME_CONTEST ? (
          <NameContestSpecialInfo
            styleName={styleName}
            typeOfName={typeOfName}
          />
        ) : contestType === CONSTANTS.TAGLINE_CONTEST ? (
          <TaglineContestSpecialInfo
            nameVenture={contestData.nameVenture}
            typeOfTagline={typeOfTagline}
          />
        ) : (
          <LogoContestSpecialInfo
            brandStyle={brandStyle}
            nameVenture={contestData.nameVenture}
          />
        )}
        <div className={styles.dataContainer}>
          <span className={styles.label}>
            What is your Business/ Brand about?
          </span>
          <span className={styles.data}>{focusOfWork}</span>
        </div>
        <div className={styles.dataContainer}>
          <span className={styles.label}>
            Description target customers of company{' '}
          </span>
          <span className={styles.data}>{targetCustomer}</span>
        </div>
        <div className={styles.dataContainer}>
          <span className={styles.label}>Industry of company</span>
          <span className={styles.data}>{industry}</span>
        </div>
        {originalFileName && (
          <div className={styles.dataContainer}>
            <span className={styles.label}>Additional File</span>
            <a
              className={styles.file}
              download={originalFileName}
              href={`${CONSTANTS.publicURL}${fileName}`}
              rel='noreferrer'
              target='_blank'
            >
              {originalFileName}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContestInfo;
