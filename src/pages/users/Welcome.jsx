import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { ThemeContext } from 'styled-components';
import {
  Wrapper,
  Grid,
  Image,
  Text,
  Input,
  Button,
} from '../../components/atoms';

function Welcome(props) {
  console.log(props);
  const { nickname } = props;

  return (
    <Wrapper padding="53px 24px 53px 24px">
      <Text size="20px">
        환영합니다!
        <br />
        흥미진진한 토론이 {nickname}님을 기다리고 있어요 :)
      </Text>
    </Wrapper>
  );
}

Welcome.propTypes = {
  nickname: PropTypes.string,
};

export default Welcome;