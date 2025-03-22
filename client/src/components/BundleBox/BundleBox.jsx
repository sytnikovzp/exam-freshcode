import { STATIC_PATHS } from '../../constants';

import styles from './BundleBox.module.sass';

function BundleBox({ describe, header, path, setBundle }) {
  const defaultPathToImages = `${STATIC_PATHS.IMAGES}/contestLabels/`;

  const renderImage = () => {
    const array = [];
    for (let i = 0; i < path.length; i++) {
      array.push(
        <img
          key={i}
          alt={path[i].replace(/.png/g, 'Contest')}
          className={styles.imgContainer}
          src={defaultPathToImages + path[i]}
        />
      );
    }
    return array;
  };

  const mouseOverHandler = () => {
    const element = document.querySelector(`#${header}`);
    for (let i = 0; i < element.children[0].children.length; i++) {
      element.children[0].children[i].src =
        `${defaultPathToImages}blue_${path[i]}`;
    }
  };

  const mouseOutHandler = () => {
    const element = document.querySelector(`#${header}`);
    for (let i = 0; i < element.children[0].children.length; i++) {
      element.children[0].children[i].src = defaultPathToImages + path[i];
    }
  };

  const getBackClass = () => {
    if (path.length === 1) {
      return ' ';
    }
    return ` ${styles.combinedBundle}`;
  };

  return (
    <div
      className={styles.bundleContainer + getBackClass()}
      id={header}
      onClick={() => setBundle(header)}
      onMouseOut={mouseOutHandler}
      onMouseOver={mouseOverHandler}
    >
      <div>{renderImage()}</div>
      <div className={styles.infoContainer}>
        <span className={styles.bundleName}>{header}</span>
        <hr />
        <span className={styles.infoBundle}>{describe}</span>
      </div>
    </div>
  );
}

export default BundleBox;
