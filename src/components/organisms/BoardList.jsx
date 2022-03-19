import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Grid, Image, Text } from 'components';

const BoardList = (props) => {
  const { label, boards } = props;

  return (
    <Grid padding="0px 24px 0px 24px" margin="0px 0px 32px 0px">
      <Grid margin="0px 0px 16px 0px">
        <Text bold size="20px">
          {label}
        </Text>
      </Grid>
      {boards.slice(0, 5).map((board, index) => {
        return (
          <BoardWrapper key={index}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image shape="circle" size={32} />
              <div style={{ marginLeft: '8px' }}>
                {board.title} ({board.recommendCount})
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/asset/icons/Agreed.svg" />
                <div style={{ marginLeft: '10px' }}>{board.agreeCount}</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '27px',
                }}
              >
                <img src="/asset/icons/Disagreed.svg" />
                <div style={{ marginLeft: '10px' }}>{board.disagreeCount}</div>
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
};

const BoardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
`;

export default BoardList;