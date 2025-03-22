import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

import { USER_ROLES } from '../../constants';

import { updateBundle } from '../../store/slices/bundleSlice';

import BundleBox from '../../components/BundleBox/BundleBox';
import ProgressBar from '../../components/ProgressBar/ProgressBar';

import styles from './StartContestPage.module.sass';

function StartContestPage(props) {
  const navigate = useNavigate();

  if (props.userStore.data.role !== USER_ROLES.CUSTOMER) {
    navigate('/', { replace: true });
  }

  const setBundle = (bundleStr) => {
    const array = bundleStr.toLowerCase().split('+');
    const bundleList = {};
    bundleList.first = array[0];
    for (let i = 0; i < array.length; i++) {
      bundleList[array[i]] = i === array.length - 1 ? 'payment' : array[i + 1];
    }
    props.choseBundle(bundleList);
    navigate(`/startContest/${bundleList.first}Contest`);
  };

  return (
    <div>
      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>START A CONTEST</h2>
          <span>
            Launching a contest on Squadhelp is very simple. Select the type of
            contest you would like to launch from the list below. Provide a
            detailed brief and select a pricing package. Begin receiving
            submissions instantly!
          </span>
        </div>
        <ProgressBar currentStep={1} />
      </div>
      <div className={styles.baseBundleContainer}>
        <div className={styles.infoBaseBundles}>
          <span className={styles.headerInfo}>
            Our Most Popular
            <span>Categories</span>
          </span>
          <span className={styles.info}>
            Pick from our most popular categories, launch a contest and begin
            receiving submissions right away
          </span>
          <hr />
        </div>
        <div className={styles.baseBundles}>
          <BundleBox
            describe='Get up and running with the perfect name.'
            header='Name'
            path={['Name.png']}
            setBundle={setBundle}
          />
          <BundleBox
            describe='Kickstart your venture with a unique, memorable logo.'
            header='Logo'
            path={['Logo.png']}
            setBundle={setBundle}
          />
          <BundleBox
            describe='Connect deeply with your target audience with an on-target tagline.'
            header='Tagline'
            path={['Tagline.png']}
            setBundle={setBundle}
          />
        </div>
      </div>
      <div className={styles.combinedBundles}>
        <div className={styles.infoCombinedBundles}>
          <span className={styles.headerInfo}>
            Save With Our Bundle Packages
          </span>
          <span className={styles.info}>
            Launch multiple contests and pay a discounted bundle price
          </span>
          <hr />
        </div>
        <div className={styles.baseBundles}>
          <BundleBox
            describe='Get the essentials needed to establish your brand together and save.'
            header='Name+Logo'
            path={['Name.png', 'Logo.png']}
            setBundle={setBundle}
          />
          <BundleBox
            describe='Communicate your vision with the perfect Name/Tagline combo.'
            header='Name+Tagline'
            path={['Name.png', 'Tagline.png']}
            setBundle={setBundle}
          />
          <BundleBox
            describe='Description for Logo + Tagline will come here.'
            header='Tagline+Logo'
            path={['Logo.png', 'Tagline.png']}
            setBundle={setBundle}
          />
          <BundleBox
            describe='Establish your entire brand identity and save with this bundle.'
            header='Name+Tagline+Logo'
            path={['Name.png', 'Logo.png', 'Tagline.png']}
            setBundle={setBundle}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { bundleStore, userStore } = state;
  return { bundleStore, userStore };
};

const mapDispatchToProps = (dispatch) => ({
  choseBundle: (bundle) => dispatch(updateBundle(bundle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartContestPage);
