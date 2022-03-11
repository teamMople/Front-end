import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apis from '../apis/apis';
import { deleteCookie, setCookie } from '../shared/utils/Cookie';

const emailRegExp =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const loginUser = JSON.parse(localStorage.getItem('loginUser'));
const loginUserInitialState = loginUser
  ? { isLogin: true, loginUser }
  : { isLogin: false, loginUser: null };

const isRightEmailType = (email) => {
  if (email.match(emailRegExp) === null) {
    return false;
  }
  return true;
};

export const loginAsync = createAsyncThunk(
  'users/login',
  async (userInfo, thunkAPI) => {
    const { email, password } = userInfo;

    const response = await fetch('http://18.117.124.131/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    let data = await response.json();
    console.log('data', data);
    if (response.data.status === 200) {
      console.log('success');
    }

    // if (isRightEmailType === false) {
    //   window.alert('올바른 이메일 형식이 아닙니다.');
    // } else {
    //   await apis
    //     .login(email, password)
    //     .then((response) => {
    //       if (response.data.status === 'ok') {
    //         setCookie('token', response.data.token, 1);
    //         setCookie('userPassword', password, 1);
    //         const loginUserInfo = {
    //           id: response.data.id,
    //           nickname: response.data.nickname,
    //         };
    //         localStorage.setItem(
    //           'json',
    //           JSON.stringify({
    //             loginUser: loginUserInfo,
    //           }),
    //         );
    //         return { loginUser: loginUserInfo };
    //       }
    //       return response.data;
    //     })
    //     .catch((error) => {
    //       if (error) {
    //         window.alert('잘못된 로그인 요청입니다.');
    //         console.log(error.response.message); // 어떻게 서버에서 에러 메시지 오는지 확인
    //       }
    //       return thunkAPI.rejectWithValue();
    //     });
    // }
  },
);

export const logout = createAsyncThunk('users/logout', async () => {
  await apis
    .logout()
    .then((response) => {
      if (response.data.status === 'ok') {
        deleteCookie('token');
        deleteCookie('userPassword');
        localStorage.removeItem('loginUser');
      }
    })
    .catch((error) => {
      if (error) {
        window.alert('잘못된 로그아웃 요청입니다.');
        console.log(error.response.message); // 어떻게 서버에서 에러 메시지 오는지 확인
      }
    });
});

export const signupAsync = createAsyncThunk(
  'users/signup',
  async (userInfo, thunkAPI) => {
    const { email, profileImageUrl, nickname, password } = userInfo;
    const response = await fetch('http://18.117.124.131/api/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        email,
        profileImageUrl,
        nickname,
        password,
      }),
    });

    let data = await response.json();
    console.log('data', data);
    if (response.data.status === 200) {
      console.log('success');
    }

    // .then((response) => {
    //   return response.data.status === 'ok' && response.data;
    // })
    // .catch((error) => {
    //   if (error) {
    //     window.alert('잘못된 회원 가입 요청입니다.');
    //     console.log(error.response.data.message); // 어떻게 서버에서 에러 메시지 오는지 확인
    //   }
    //   return thunkAPI.rejectWithValue();
    // });
  },
);

export const editMyInfo = createAsyncThunk(
  'users/editUserInfo',
  async ({ email, name, nickname, password }, thunkAPI) => {
    if (email === '' || name === '' || nickname === '' || password === '') {
      window.alert('모든 항목들을 기입해주세요');
    } else if (isRightEmailType === false) {
      window.alert('올바른 이메일 형식이 아닙니다.');
    } else {
      await apis
        .editMyInfo(email, name, nickname, password)
        .then((response) => {
          return response.data.status === 'ok' && response.data;
        })
        .catch((error) => {
          if (error) {
            window.alert('잘못된 회원 수정 요청입니다.');
            console.log(error.response.data.message); // 어떻게 서버에서 에러 메시지 오는지 확인
          }
          return thunkAPI.rejectWithValue();
        });
    }
  },
);

export const findMyPassword = createAsyncThunk(
  'users/findMyPassword',
  async ({ email }, thunkAPI) => {
    if (email && isRightEmailType(email)) {
      await apis
        .findMyPassword(email)
        .then((response) => {
          return response.data.status === 'ok' && response.data;
        })
        .catch((error) => {
          if (error) {
            window.alert('잘못된 비밀번호 찾기 요청입니다.');
            console.log(error.response.data.message); // 어떻게 서버에서 에러 메시지 오는지 확인
          }
          return thunkAPI.rejectWithValue();
        });
    } else {
      window.alert('올바른 이메일 형식이 아닙니다.');
    }
  },
);

export const userSlice = createSlice({
  name: 'users',
  initialState: loginUserInitialState,
  reducers: {},
  extraReducers: {
    [loginAsync.pending]: (state, action) => {
      state.isLogin = false;
    },
    [loginAsync.fulfilled]: (state, { payload }) => {
      state.isLogin = true;
      return { ...state, payload };
    },
    [loginAsync.rejected]: (state, action) => {
      state.isLogin = false;
    },
    [signupAsync.pending]: (state, action) => {
      state.isLogin = false;
    },
    [signupAsync.fulfilled]: (state, { payload }) => {
      state.isLogin = false;
      return { ...state, payload };
    },
    [signupAsync.rejected]: (state, action) => {
      state.isLogin = false;
    },
  },
});

export const selectUserState = (state) => state.users;
export default userSlice.reducer;
