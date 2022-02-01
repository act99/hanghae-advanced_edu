import { Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import AuthPage from "./pages/AuthPage";
import PostList from "./pages/PostList";
import Profile from "./pages/Profile";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./app/store";
function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <NavBar />
        <Route path="/" exact component={PostList} />
        <Route path="/signin" exact component={AuthPage} />
        <Route path="/signup" exact component={AuthPage} />
        <Route path="/profile" exact component={Profile} />
      </ConnectedRouter>
    </>
  );
}

export default App;
