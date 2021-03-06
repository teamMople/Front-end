import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Check = ({ checked, onClick }) => {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <Filler
        checked={checked}
        d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
      />
      <Outer
        checked={checked}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.78846 12.25C3.78846 7.57682 7.57682 3.78846 12.25 3.78846C16.9232 3.78846 20.7115 7.57682 20.7115 12.25C20.7115 16.9232 16.9232 20.7115 12.25 20.7115C7.57682 20.7115 3.78846 16.9232 3.78846 12.25ZM12.25 2.25C6.72715 2.25 2.25 6.72715 2.25 12.25C2.25 17.7728 6.72715 22.25 12.25 22.25C17.7728 22.25 22.25 17.7728 22.25 12.25C22.25 6.72715 17.7728 2.25 12.25 2.25ZM17.9093 9.72951C18.2166 9.43617 18.228 8.94925 17.9346 8.64194C17.6413 8.33464 17.1544 8.32331 16.8471 8.61665L10.0339 15.1201C9.9348 15.2147 9.77888 15.2147 9.67979 15.1201L7.65293 13.1854C7.34563 12.8921 6.85871 12.9034 6.56537 13.2107C6.27203 13.518 6.28335 14.0049 6.59066 14.2983L8.61752 16.233C9.31111 16.8951 10.4026 16.8951 11.0962 16.233L17.9093 9.72951Z"
        fill="#6E6BF0"
      />
      <Inner
        checked={checked}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.2925 8.23214C17.5785 8.53177 17.5675 9.00651 17.2679 9.29252L10.625 15.6334C9.94876 16.2789 8.88458 16.2789 8.20834 15.6334L6.23214 13.7471C5.93252 13.4611 5.92148 12.9863 6.20748 12.6867C6.49349 12.3871 6.96823 12.376 7.26786 12.662L9.24405 14.5484C9.34066 14.6406 9.49268 14.6406 9.58929 14.5484L16.2321 8.20748C16.5318 7.92148 17.0065 7.93252 17.2925 8.23214Z"
        fill="#6E6BF0"
      />
    </Svg>
  );
};

Check.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func,
};

const Svg = styled.svg``;
const Filler = styled.path`
  fill: ${(props) => (props.checked ? '#6e6bf0' : 'transparent')};
  transition: 0.5s;
`;
const Outer = styled.path`
  fill: #6e6bf0;
`;
const Inner = styled.path`
  fill: ${(props) => (props.checked ? '#fff' : '#6e6bf0')};
  transition: 0.5s;
`;

export default Check;
