import React from "react";
import "./App.css";

import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";

// export const AuthContext = React.createContext(null); -> typescript error
export const AuthContext = React.createContext<{
  state: any;
  dispatch: React.Dispatch<any>;
} | null>(null);

interface IAuth {
  isAuthenticated: boolean;
  user: string | null;
  token: string | null;
}

/* 
@desc: 리듀서에서 사용될 초기 상태 객체
@params:
- isAuthenticated: 사용자 인증 여부
- user: 사용자 데이터 
- token: 토큰 데이터
*/
const initialState: IAuth = {
  isAuthenticated: false,
  user: null,
  token: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
      return;
    default:
      return state; // 작업이 전달되지 않으면 초기 상태 객체를 반환
  }
};

function App() {
  // dispatch 상태에 따라 업데이트 된다
  // Dispatch는 상태를 변환하거나 변경하는 조치를 호출, 배포하는데 사용하는 함수
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    // Context.Provider 컴포넌트에서 value객체를 전달합니다.
    <AuthContext.Provider value={{ state, dispatch }}>
      <Header />
      <div className="App">{state.isAuthenticated ? <Home /> : <Login />}</div>
    </AuthContext.Provider>
  );
}

export default App;
