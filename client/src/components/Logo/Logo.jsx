import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { STATIC_PATHS } from '../../constants';

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
  src: `${STATIC_PATHS.IMAGES}/blue-logo.png`,
  alt: 'logo',
};

export default Logo;
