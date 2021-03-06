import React, { useContext, useEffect } from 'react';

import styled, { ThemeContext } from 'styled-components';
import {
  Wrapper,
  Grid,
  BasicModal,
  PageLoading,
  Text,
  Button,
  EventCarousel,
} from 'components';
import {
  CardCarousel,
  CategoryCarousel,
  BoardList,
} from '../components/organisms';
import {
  clearBoardList,
  getBoardListAsync,
  selectedBoardList,
} from 'modules/boards';
import {
  clearLiveBoardList,
  getLiveBoardListAsync,
  selectedLiveBoardList,
} from 'modules/liveBoards';
import { useDispatch, useSelector } from 'react-redux';
import { selectModalOpen, setModalOpen } from 'modules/modal';
import { useNavigate } from 'react-router-dom';
import {
  getBoardHotListAsync,
  clearBoardHotList,
  selectedBoardHotList,
} from 'modules/boardsHot';

const Home = () => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: basicBoards, status: basicBoardsStatus } =
    useSelector(selectedBoardList);
  const { data: liveBoards, status: liveBoardsStatus } = useSelector(
    selectedLiveBoardList,
  );
  const { data: boardsHot, status: boardsHotStatus } =
    useSelector(selectedBoardHotList);
  const modalState = useSelector(selectModalOpen);

  useEffect(() => {
    dispatch(getBoardListAsync({ size: 20, page: 0 }));
    return () => {
      dispatch(clearBoardList());
    };
  }, []);
  useEffect(() => {
    dispatch(getBoardHotListAsync({ size: 5, page: 0 }));
    return () => {
      dispatch(clearBoardHotList());
    };
  }, []);

  useEffect(() => {
    dispatch(getLiveBoardListAsync(50));
    return () => {
      dispatch(clearLiveBoardList());
    };
  }, [modalState.open]);

  if (
    basicBoardsStatus === 'loading' ||
    liveBoardsStatus === 'loading' ||
    boardsHotStatus === 'loading'
  ) {
    return (
      <Wrapper backgroundColor={themeContext.colors.white}>
        <PageLoading />
      </Wrapper>
    );
  } else if (
    basicBoardsStatus === 'failed' ||
    liveBoardsStatus === 'failed' ||
    boardsHotStatus === 'failed'
  ) {
    return (
      <Wrapper backgroundColor={themeContext.colors.white}>
        <BackDrop />
        <ErrorPageWrapper>
          <Text>????????? ????????? ?????????????????????.</Text>
          <Text>?????? ????????? ????????????!</Text>
          <Button
            secondary
            onClick={() => navigate('/login', { replace: true })}
          >
            ????????? ???????????? ??????
          </Button>
        </ErrorPageWrapper>
      </Wrapper>
    );
  } else {
    return (
      <>
        {/* ????????? ?????? ?????? ::start:: */}
        <BasicModal
          open={modalState.open}
          onClose={() => {
            dispatch(setModalOpen({ open: false }));
          }}
          onConfirm={() => {
            dispatch(setModalOpen({ open: false }));
          }}
        >
          {modalState.type === 'close'
            ? '????????? ???????????? ?????????????????????'
            : modalState.type === 'leave'
            ? '???????????? ???????????????'
            : ''}
        </BasicModal>
        {/* ????????? ?????? ?????? ::end:: */}
        <Wrapper backgroundColor={themeContext.colors.backgroundGray}>
          <Grid padding="45px 0px 30px 0px">
            <CardCarousel
              label="????????? HOT ?????????"
              type="live"
              boards={liveBoards}
            />
            <BoardList label="HOT ?????????" boards={boardsHot} type={'hot'} />
            <EventCarousel />
            <BoardList
              label="?????? ?????????"
              boards={basicBoards}
              type={'recent'}
            />
            <CardCarousel
              label="?????? ?????? ?????? ?????????"
              type="basic"
              boards={basicBoards}
            />
            {/*<CardCarousel
              label="?????? Pick ?????????"
              type="basic"
              boards={basicBoards}
            />*/}
            <CategoryCarousel label="???????????? ????????????" />
          </Grid>
        </Wrapper>
      </>
    );
  }
};

const ErrorPageWrapper = styled.div`
  position: fixed;
  z-index: 21;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  row-gap: 8px;
  > button {
    margin-top: 16px;
  }
`;
const BackDrop = styled.div`
  position: fixed;
  height: 100%;
  z-index: 20;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 0.3s ease;
  opacity: 0.7;
`;

export default Home;
