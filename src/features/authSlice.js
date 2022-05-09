//createAsyncThunkは非同期関数を作成するため
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//Rest Apiにアクセスするため
import axios from "axios";

//Apiのパス DjangoApi
const apiUrl = "http://localhost:8000/";

//ユーザー名とパスワードを渡してトークンを取得、createAsyncThunkは非同期関数
export const fetchAsyncLogin = createAsyncThunk("login/post", async (auth) => {
  const res = await axios.post(`${apiUrl}api/auth/`, auth, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
});

//新規ユーザー作成
export const fetchAsyncRegister = createAsyncThunk(
  "register/post",
  async (auth) => {
    const res = await axios.post(`${apiUrl}api/create/`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

export const fetchAsyncGetProfile = createAsyncThunk(
  "profile/get",
  async () => {
    //トークン認証が通っているユーザーのみアクセス可能なエンドポイント
    const res = await axios.get(`${apiUrl}api/profile/`, {
      headers: {
        Authorization: `token ${localStorage.token}`,
      },
    });
    return res.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    profile: {
      id: 0,
      username: "",
    },
  },
  reducers: {},
  //ログイン成功時、ローカルストレージにトークンを格納
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      //action.payloadにApiのReturn res.dataが入ってくる。
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(fetchAsyncGetProfile.fulfilled, (state, action) => {
      return {
        ...state,
        //ログインユーザーのIDとパスワード
        profile: action.payload,
      };
    });
  },
});

//ReactコンポーネントからReduxの状態を参照するための関数
export const selectProfile = (state) => state.auth.profile;

export default authSlice.reducer;
