import React from 'react';

import PropTypes from 'prop-types';

import {Container, Logo} from './styles';
import logo from '~/assets/logo.png';

export default function Header({style}) {
  return (
    <Container styles={style}>
      <Logo source={logo} />
    </Container>
  );
}

Header.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Header.defaultProps = {
  style: {},
};
