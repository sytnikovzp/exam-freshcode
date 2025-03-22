import { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { CHAT_ACTIONS } from '../../../../constants';

import {
  changeShowAddChatToCatalogMenu,
  changeTypeOfChatAdding,
  getCatalogList,
} from '../../../../store/slices/chatSlice';

import AddToCatalog from '../AddToCatalog/AddToCatalog';
import CreateCatalog from '../CreateCatalog/CreateCatalog';

import styles from './CatalogCreation.module.sass';

class CatalogCreation extends Component {
  componentDidMount() {
    this.props.getCatalogList();
  }

  render() {
    const {
      changeTypeOfChatAdding,
      catalogCreationMode,
      changeShowAddChatToCatalogMenu,
      isFetching,
    } = this.props;

    return (
      <>
        {!isFetching && (
          <div className={styles.catalogCreationContainer}>
            <i
              className='far fa-times-circle'
              onClick={() => changeShowAddChatToCatalogMenu()}
            />
            <div className={styles.buttonsContainer}>
              <span
                className={classNames({
                  [styles.active]:
                    catalogCreationMode ===
                    CHAT_ACTIONS.ADD_CHAT_TO_OLD_CATALOG,
                })}
                onClick={() =>
                  changeTypeOfChatAdding(CHAT_ACTIONS.ADD_CHAT_TO_OLD_CATALOG)
                }
              >
                Old
              </span>
              <span
                className={classNames({
                  [styles.active]:
                    catalogCreationMode ===
                    CHAT_ACTIONS.CREATE_NEW_CATALOG_AND_ADD_CHAT,
                })}
                onClick={() =>
                  changeTypeOfChatAdding(
                    CHAT_ACTIONS.CREATE_NEW_CATALOG_AND_ADD_CHAT
                  )
                }
              >
                New
              </span>
            </div>
            {catalogCreationMode ===
            CHAT_ACTIONS.CREATE_NEW_CATALOG_AND_ADD_CHAT ? (
              <CreateCatalog />
            ) : (
              <AddToCatalog />
            )}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  changeTypeOfChatAdding: (data) => dispatch(changeTypeOfChatAdding(data)),
  changeShowAddChatToCatalogMenu: () =>
    dispatch(changeShowAddChatToCatalogMenu()),
  getCatalogList: () => dispatch(getCatalogList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogCreation);
