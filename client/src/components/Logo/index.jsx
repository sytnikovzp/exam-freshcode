import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import CONSTANTS from '../../constants.js';

function Logo({ to, ...props }) {
  return (
    <Link to={to}>
      <img {...props} />
    </Link>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
};

Logo.defaultProps = {
  to: '/',
  src: `${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`,
  alt: 'logo',
};

export default Logo;
