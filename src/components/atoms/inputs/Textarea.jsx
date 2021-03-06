import React, { useRef, useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Textarea = forwardRef(({ fluid, ...props }) => {
  return <CustomTextarea fluid={fluid} {...props} />;
});

Textarea.displayName = 'Textarea';

const CustomTextarea = styled.textarea`
  border: ${(props) => (props.border ? props.border : 'none')};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? backgroundColor : theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => (props.bold ? 600 : 500)};
  line-height: ${(props) => props.lineHeight};
  resize: none;
  width: ${({ fluid }) => (fluid ? '100%' : 'auto')};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  border-radius: ${(props) => props.borderRadius};
  box-sizing: border-box;
  padding: ${(props) => props.padding};

  &::placeholder {
    color: ${({ theme }) => theme.colors.placeholder};
    font-size: ${(props) => props.fontSize};
    line-height: ${(props) => props.lineHeight};
    font-weight: ${(props) => (props.bold ? 600 : 500)};
  }

  &:focus {
    outline: none;
  }
`;

Textarea.defaultProps = {
  // size: 'small',
};

Textarea.propTypes = {
  // size: PropTypes.oneOf(['small', 'medium', 'large']),
  fluid: PropTypes.bool,
};
export default Textarea;
