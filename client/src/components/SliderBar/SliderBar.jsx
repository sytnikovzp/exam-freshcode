import Flickity from 'react-flickity-component';

import carouselConstants from '../../carouselConstants';

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
      case carouselConstants.MAIN_SLIDER:
        return style.mainCarousel;
      case carouselConstants.EXAMPLE_SLIDER:
        return style.exampleCarousel;
      case carouselConstants.FEEDBACK_SLIDER:
        return style.feedbackCarousel;
    }
  };

  const renderSlides = () => {
    const { carouselType } = props;
    switch (carouselType) {
      case carouselConstants.MAIN_SLIDER: {
        return Object.keys(props.images).map((key, index) => (
          <img
            key={index}
            alt='slide'
            className={style['carousel-cell']}
            src={props.images[key]}
          />
        ));
      }
      case carouselConstants.EXAMPLE_SLIDER: {
        return Object.keys(props.images).map((key, index) => (
          <div key={index} className={style['example-cell']}>
            <img alt='slide' src={props.images[key]} />
            <p>{carouselConstants.EXAMPLE_SLIDER_TEXT[index]}</p>
          </div>
        ));
      }
      case carouselConstants.FEEDBACK_SLIDER: {
        return Object.keys(props.images).map((key, index) => (
          <div key={index} className={style['feedback-cell']}>
            <img alt='slide' src={props.images[key]} />
            <p>{carouselConstants.FEEDBACK_SLIDER_TEXT[index].feedback}</p>
            <span>{carouselConstants.FEEDBACK_SLIDER_TEXT[index].name}</span>
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
