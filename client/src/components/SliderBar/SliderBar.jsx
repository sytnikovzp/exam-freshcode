import Flickity from 'react-flickity-component';

import { SLIDER_TEXTS, SLIDER_TYPES } from '../../constants';

import style from './SliderBar.module.sass';

import './flickity.css';

function SliderBar({ images, carouselType }) {
  const options = {
    draggable: true,
    wrapAround: true,
    pageDots: false,
    prevNextButtons: true,
    autoPlay: true,
    groupCells: true,
    lazyLoad: true,
  };

  const getStyleName = () => {
    switch (carouselType) {
      case SLIDER_TYPES.MAIN:
        return style.mainCarousel;
      case SLIDER_TYPES.EXAMPLE:
        return style.exampleCarousel;
      case SLIDER_TYPES.FEEDBACK:
        return style.feedbackCarousel;
      default:
        return null;
    }
  };

  const renderSlides = () => {
    switch (carouselType) {
      case SLIDER_TYPES.MAIN: {
        return Object.keys(images).map((key, index) => (
          <img
            key={index}
            alt='slide'
            className={style['carousel-cell']}
            src={images[key]}
          />
        ));
      }
      case SLIDER_TYPES.EXAMPLE: {
        return Object.keys(images).map((key, index) => (
          <div key={index} className={style['example-cell']}>
            <img alt='slide' src={images[key]} />
            <p>{SLIDER_TEXTS.EXAMPLE[index]}</p>
          </div>
        ));
      }
      case SLIDER_TYPES.FEEDBACK: {
        return Object.keys(images).map((key, index) => (
          <div key={index} className={style['feedback-cell']}>
            <img alt='slide' src={images[key]} />
            <p>{SLIDER_TEXTS.FEEDBACK[index].feedback}</p>
            <span>{SLIDER_TEXTS.FEEDBACK[index].name}</span>
          </div>
        ));
      }
      default:
        return null;
    }
  };
  return (
    <Flickity className={getStyleName()} elementType='div' options={options}>
      {renderSlides()}
    </Flickity>
  );
}

export default SliderBar;
