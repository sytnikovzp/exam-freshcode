import Flickity from 'react-flickity-component';

import { SLIDER_TEXTS, SLIDER_TYPES } from '../../constants';

import style from './SliderBar.module.sass';

import './flickity.css';

function SliderBar(props) {
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
    const { carouselType } = props;
    switch (carouselType) {
      case SLIDER_TYPES.MAIN:
        return style.mainCarousel;
      case SLIDER_TYPES.EXAMPLE:
        return style.exampleCarousel;
      case SLIDER_TYPES.FEEDBACK:
        return style.feedbackCarousel;
    }
  };

  const renderSlides = () => {
    const { carouselType } = props;
    switch (carouselType) {
      case SLIDER_TYPES.MAIN: {
        return Object.keys(props.images).map((key, index) => (
          <img
            key={index}
            alt='slide'
            className={style['carousel-cell']}
            src={props.images[key]}
          />
        ));
      }
      case SLIDER_TYPES.EXAMPLE: {
        return Object.keys(props.images).map((key, index) => (
          <div key={index} className={style['example-cell']}>
            <img alt='slide' src={props.images[key]} />
            <p>{SLIDER_TEXTS.EXAMPLE[index]}</p>
          </div>
        ));
      }
      case SLIDER_TYPES.FEEDBACK: {
        return Object.keys(props.images).map((key, index) => (
          <div key={index} className={style['feedback-cell']}>
            <img alt='slide' src={props.images[key]} />
            <p>{SLIDER_TEXTS.FEEDBACK[index].feedback}</p>
            <span>{SLIDER_TEXTS.FEEDBACK[index].name}</span>
          </div>
        ));
      }
    }
  };
  return (
    <Flickity className={getStyleName()} elementType='div' options={options}>
      {renderSlides()}
    </Flickity>
  );
}

export default SliderBar;
