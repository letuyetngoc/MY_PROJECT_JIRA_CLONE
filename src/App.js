import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import Message from "./component/message/Message";
import PopupModal from "./component/popupModal/PopupModal";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import HomeTemplate from "./template/HomeTemplate";
import UserLoginTemplate from "./template/UserLoginTemplate";
import Loading from "./component/loading/Loading"
import Board from "./page/Board/Board";
import ProjectSetting from "./page/ProjectSetting/ProjectSetting";
export const history = createBrowserHistory();
function App() {
  return (
    <>
      {/* <PopupModal /> */}
      <Message />
      <Loading />
      <Router history={history}>
        <Switch>
          <HomeTemplate path='/board' exact Component={Board} />
          <HomeTemplate path='/settings' exact Component={ProjectSetting} />
          <UserLoginTemplate path='/register' exact Component={Register} />
          <UserLoginTemplate path='/login' exact Component={Login} />
          <UserLoginTemplate path='' exact Component={Login} />
          {/* <HomeTemplate path='' exact Component={Home} /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
