import { STATIC_PATHS } from '../../constants';

import styles from './BundleBox.module.sass';

function BundleBox(props) {
  const defaultPathToImages = `${STATIC_PATHS.IMAGES}/contestLabels/`;

  const renderImage = () => {
    const array = [];
    for (let i = 0; i < props.path.length; i++) {
      array.push(
        <img
          key={i}
          alt={props.path[i].replace(/.png/g, 'Contest')}
          className={styles.imgContainer}
          src={defaultPathToImages + props.path[i]}
        />
      );
    }
    return array;
  };

  const mouseOverHandler = () => {
    const element = document.getElementById(props.header);
    for (let i = 0; i < element.children[0].children.length; i++) {
      element.children[0].children[i].src =
        `${defaultPathToImages}blue_${props.path[i]}`;
    }
  };

  const mouseOutHandler = () => {
    const element = document.getElementById(props.header);
    for (let i = 0; i < element.children[0].children.length; i++) {
      element.children[0].children[i].src = defaultPathToImages + props.path[i];
    }
  };

  const getBackClass = () =>
    props.path.length === 1 ? ' ' : ` ${styles.combinedBundle}`;

  const { setBundle, header, describe } = props;
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
