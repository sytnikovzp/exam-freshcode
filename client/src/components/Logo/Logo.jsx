import { Link } from 'react-router-dom';

import { STATIC_PATHS } from '../../constants';

function Logo({
  alt = 'logo',
  to = '/',
  src = `${STATIC_PATHS.IMAGES}/blue-logo.png`,
  className,
}) {
  return (
    <Link to={to}>
      <img alt={alt} className={className} src={src} />
    </Link>
  );
}

export default Logo;
