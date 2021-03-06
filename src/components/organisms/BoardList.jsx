import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Grid, IconButton, Image, Text } from 'components';
import { useNavigate } from 'react-router-dom';

const BoardList = (props) => {
  const { label, boards, type } = props;
  const navigate = useNavigate();

  const slicedBoards = boards.slice(0, 5);

  return (
    <Grid padding="0px 24px 0px 24px" margin="0px 0px 32px 0px">
      <Grid margin="0px 0px 16px 0px" isFlex>
        <Text bold size="20px">
          {label}
        </Text>
        <IconButton
          src={'/asset/icons/Plus.svg'}
          onClick={() => {
            if (type === 'recent') {
              navigate(`/recent`, { state: label });
            } else {
              navigate(`/hot`, { state: label });
            }
          }}
          medium
        />
      </Grid>
      {slicedBoards.map((board, index) => {
        return (
          <BoardWrapper key={index}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image shape="circle" size={32} src={board.profileImageUrl} />
              <Text
                semiBold
                style={{ marginLeft: '8px' }}
                onClick={() => {
                  navigate('/board/' + board.id);
                }}
              >
                {board.title.length > 12
                  ? board.title.slice(0, 12) + '...'
                  : board.title}
                ({board.commentCount})
              </Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {localStorage.getItem('theme') === 'dark' ? (
                  <img src="/asset/icons/Agreed_white.svg" alt="icon" />
                ) : (
                  <img src="/asset/icons/Agreed.svg" alt="icon" />
                )}

                <Text style={{ marginLeft: '10px' }}>{board.agreeCount}</Text>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '27px',
                }}
              >
                {localStorage.getItem('theme') === 'dark' ? (
                  <img src="/asset/icons/Disagreed_white.svg" alt="icon" />
                ) : (
                  <img src="/asset/icons/Disagreed.svg" alt="icon" />
                )}
                <Text style={{ marginLeft: '10px' }}>
                  {board.disagreeCount}
                </Text>
              </div>
            </div>
          </BoardWrapper>
        );
      })}
    </Grid>
  );
};

BoardList.propTypes = {
  label: PropTypes.string,
  boards: PropTypes.array,
  type: PropTypes.oneOf(['hot', 'recent']),
};

const BoardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
  -webkit-tap-highlight-color: ${({ theme }) => theme.colors.lightGray};
  &:active {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

export default BoardList;
