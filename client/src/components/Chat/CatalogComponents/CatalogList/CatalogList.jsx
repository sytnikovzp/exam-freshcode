import { connect } from 'react-redux';

import {
  changeShowModeCatalog,
  deleteCatalog,
} from '../../../../store/slices/chatSlice';

import Catalog from '../Catalog/Catalog';
import styles from '../CatalogListContainer/CatalogListContainer.module.sass';

function CatalogList(props) {
  const goToCatalog = (event, catalog) => {
    props.changeShowModeCatalog(catalog);
    event.stopPropagation();
  };

  const deleteCatalog = (event, catalogId) => {
    props.deleteCatalog({ catalogId });
    event.stopPropagation();
  };

  const getListCatalog = () => {
    const { catalogList } = props;
    const elementList = [];
    for (const catalog of catalogList) {
      elementList.push(
        <Catalog
          key={catalog._id}
          catalog={catalog}
          deleteCatalog={deleteCatalog}
          goToCatalog={goToCatalog}
        />
      );
    }
    return elementList.length ? (
      elementList
    ) : (
      <span className={styles.notFound}>Not found</span>
    );
  };

  return <div className={styles.listContainer}>{getListCatalog()}</div>;
}

const mapDispatchToProps = (dispatch) => ({
  changeShowModeCatalog: (data) => dispatch(changeShowModeCatalog(data)),
  deleteCatalog: (data) => dispatch(deleteCatalog(data)),
});

export default connect(null, mapDispatchToProps)(CatalogList);
