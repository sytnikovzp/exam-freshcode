import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  SLIDER_IMAGES,
  SLIDER_TYPES,
  STATIC_PATHS,
  UI_ANIMATION,
} from '../../constants';

import SliderBar from '../../components/SliderBar/SliderBar';
import SpinnerLoader from '../../components/SpinnerLoader/SpinnerLoader';

import styles from './HomePage.module.sass';

function HomePage() {
  const [index, setIndex] = useState(0);
  const [styleName, setStyle] = useState(styles.headline__static);
  const isFetching = useSelector((state) => state.userStore.isFetching);

  useEffect(() => {
    const timeout = setInterval(() => {
      setIndex(
        (prevIndex) => (prevIndex + 1) % UI_ANIMATION.HEADER_TEXT.length
      );
    }, 3000);
    return () => clearInterval(timeout);
  }, []);

  useEffect(() => {
    setStyle(styles.headline__isloading);
    const resetStyle = setTimeout(() => setStyle(styles.headline__static), 500);
    return () => clearTimeout(resetStyle);
  }, [index]);

  return (
    <>
      {isFetching ? (
        <SpinnerLoader />
      ) : (
        <div className={styles.container}>
          <div className={styles.headerBar}>
            <div className={styles.headline}>
              <span>Find the Perfect Name for</span>
              <span className={styleName}>
                {UI_ANIMATION.HEADER_TEXT[index]}
              </span>
            </div>
            <p>
              Launch a naming contest to engage hundreds of naming experts as
              you’re guided through our agency-level naming process. Or, explore
              our hand-picked collection of premium names available for
              immediate purchase
            </p>
            <div className={styles.button}>
              <Link className={styles.button__link} to='/dashboard'>
                DASHBOARD
              </Link>
            </div>
          </div>
          <div className={styles.greyContainer}>
            <SliderBar
              carouselType={SLIDER_TYPES.MAIN}
              images={SLIDER_IMAGES.MAIN}
            />
          </div>
          <div className={styles.container__description}>
            <h2 className={styles.blueUnderline}>Why Squadhelp?</h2>
            <div className={styles.cardContainer}>
              <div className={styles.card}>
                <img
                  alt='globe'
                  src={`${STATIC_PATHS.IMAGES}/more-benifits-world-icon.png`}
                />
                <h3>Largest Naming Community</h3>
                <p>
                  Our unique approach allows you to receive an unmatched breadth
                  of business name ideas from world`s largest community of
                  naming experts. With 75,000+ creatives and 15,000+ successful
                  naming projects, Squadhelp is by far the largest naming
                  platform across the globe .
                </p>
              </div>
              <div className={styles.card}>
                <img
                  alt='desktop'
                  src={`${STATIC_PATHS.IMAGES}/more-benifits-high-quality-icon.png`}
                />
                <h3>High Quality & Collaboration</h3>
                <p>
                  Using an advanced Quality Scoring Algorithm and Machine
                  Learning, we ensure that you receive more ideas from our
                  top-quality creatives, and Gamification best practices ensure
                  two-way communication throughout your contest.
                </p>
              </div>
              <div className={styles.card}>
                <img
                  alt='cards'
                  src={`${STATIC_PATHS.IMAGES}/more-benifits-trademark-icon.png`}
                />
                <h3>Agency-Level Features</h3>
                <p>
                  Squadhelp`s high end Audience Testing service allows you to
                  poll your target demographics to get unbiased feedback on your
                  favorite names. Also receive Trademark support from our team
                  of Licensed Trademark Attorneys, so you can pick your name
                  with confidence.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.greyContainer}>
            <div className={styles.adv}>
              <div className={styles.images}>
                <img
                  alt='forbes'
                  src={`${STATIC_PATHS.IMAGES}/sponsors/Forbes-inactive.png`}
                />
                <img
                  alt='forbes'
                  src={`${STATIC_PATHS.IMAGES}/sponsors/Forbes-active.png`}
                />
              </div>
              <div className={styles.images}>
                <img
                  alt='web'
                  src={`${STATIC_PATHS.IMAGES}/sponsors/the_next_web_inactive.png`}
                />
                <img
                  alt='web'
                  src={`${STATIC_PATHS.IMAGES}/sponsors/the_next_web_active.png`}
                />
              </div>
              <div className={styles.images}>
                <img
                  alt='mashable'
                  src={`${STATIC_PATHS.IMAGES}/sponsors/mashable-inactive.png`}
                />
                <img
                  alt='mashable'
                  src={`${STATIC_PATHS.IMAGES}/sponsors/mashable-active.png`}
                />
              </div>
            </div>
            <div className={styles.stats}>
              <div>
                <p>119,525</p>
                <span>Creatives</span>
              </div>
              <div>
                <p>21,875</p>
                <span>Customers</span>
              </div>
              <div>
                <p>85</p>
                <span>Industries</span>
              </div>
            </div>
          </div>
          <h2>How Do Name Contest Work?</h2>
          <div className={styles.whiteContainer}>
            <div className={styles.stepReverse}>
              <div>
                <h3>Step 1: Launch a Naming Contest</h3>
                <p>
                  <i className='fas fa-check' />
                  <span>
                    Start your project right with our proven Naming Brief
                    template
                  </span>
                </p>
                <p>
                  <i className='fas fa-check' />
                  <span>
                    We’ll walk you through exactly what you need to share about
                    your project in order to get an awesome Name
                  </span>
                </p>
              </div>
              <img
                alt='compressed'
                src={`${STATIC_PATHS.IMAGES}/gif/1-compressed.gif`}
              />
            </div>
          </div>
          <div className={styles.greenContainer}>
            <div className={styles.step}>
              <img
                alt='compressed'
                src={`${STATIC_PATHS.IMAGES}/gif/2-compressed-new.gif`}
              />
              <div className={styles.greenStep}>
                <h3>Step 2: Ideas start pouring in within minutes</h3>
                <p>
                  <i className='fas fa-check' />
                  <span>
                    100s of naming experts start submitting name ideas
                  </span>
                </p>
                <p>
                  <i className='fas fa-check' />
                  <span>Names automatically checked for URL availability</span>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.greyContainer}>
            <div className={styles.stepReverse}>
              <div>
                <h3>Step 3: Rate Entries & Brainstorm with Creatives</h3>
                <p>
                  <i className='fas fa-check' />
                  <span>Provide instant feedback on Names</span>
                </p>
                <p>
                  <i className='fas fa-check' />
                  <span>
                    Send private feedback or public messages to all creatives
                  </span>
                </p>
                <p>
                  <i className='fas fa-check' />
                  <span>
                    The more entries you rate - the submissions get better and
                    better
                  </span>
                </p>
              </div>
              <img
                alt='compressed'
                src={`${STATIC_PATHS.IMAGES}/gif/3-compressed.gif`}
              />
            </div>
          </div>
          <div className={styles.headerBar}>
            <h3>Names For Sale</h3>
            <p className={styles.blueUnderline}>
              Not interested in launching a contest? Purchase a name instantly
              from our hand-picked collection of premium names. Price includes a
              complimentary Trademark Report, a Domain name as well as a Logo
              design
            </p>
          </div>
          <SliderBar
            carouselType={SLIDER_TYPES.EXAMPLE}
            images={SLIDER_IMAGES.EXAMPLE}
          />
          <div className={styles.button}>
            <Link className={styles.button__link} to='/dashboard'>
              DASHBOARD
            </Link>
          </div>
          <div className={styles.blueContainer}>
            <h2 className={styles.whiteUnderline}>What our customers say</h2>
            <SliderBar
              carouselType={SLIDER_TYPES.FEEDBACK}
              images={SLIDER_IMAGES.FEEDBACK}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
