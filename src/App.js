import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import AuthPage from "./pages/AuthPage";
import PostList from "./pages/PostList";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/*" element={<h3>존재하지 않는 페이지</h3>} />
          <Route path="/" element={<PostList />} />
          <Route path="/signin" element={<AuthPage pageName="로그인" />} />
          <Route path="/signup" element={<AuthPage pageName="회원가입" />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
