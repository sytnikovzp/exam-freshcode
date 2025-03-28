import styles from './ProgressBar.module.sass';

function ProgressBar({ currentStep }) {
  const renderBar = (count) => {
    let classOuter = styles.outerNotActive;
    let classInner = styles.innerNotActive;
    let classProgress = '';
    if (count === currentStep) {
      classOuter = styles.outerActive;
      classInner = styles.innerActive;
      classProgress = styles.progressContainer;
    }
    if (count < currentStep) {
      classOuter = styles.outerComplete;
      classInner = styles.innerComplete;
    }
    return (
      <div key={count} className={classProgress}>
        <div className={styles.progressBarContainer}>
          <div className={classOuter}>
            <div className={classInner} />
          </div>
          {count !== 3 && <div className={styles.lineBar} />}
        </div>
      </div>
    );
  };

  const renderProgress = () => {
    const array = [];
    for (let i = 1; i <= 3; i++) {
      array.push(renderBar(i));
    }
    return array;
  };

  return <div className={styles.progressBarContainer}>{renderProgress()}</div>;
}
export default ProgressBar;
