import { FOOTER_ITEMS } from '../../constants';

import styles from './Footer.module.sass';

function Footer() {
  const topFooterItemsRender = (item) => (
    <div key={item.title}>
      <h4>{item.title}</h4>
      {item.items.map((i) => (
        <a key={i} href='#'>
          {i}
        </a>
      ))}
    </div>
  );

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerTop}>
        <div>{FOOTER_ITEMS.map(topFooterItemsRender)}</div>
      </div>
    </div>
  );
}

export default Footer;
