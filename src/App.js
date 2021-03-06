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
import CreateProject from "./page/CreateProject/CreateProject";
import UserManagement from "./page/UserManagement/UserManagement";
import ProjectManagement from "./page/ProjecManagement/ProjectManagement";

export const history = createBrowserHistory();

function App() {
  return (
    <>
      <PopupModal />
      <Message />
      <Loading />
      <Router history={history}>
        <Switch>
          <HomeTemplate path='/board/:projectId' exact Component={Board} />
          <HomeTemplate path='/createProject' exact Component={CreateProject} />
          <UserLoginTemplate path='/register' exact Component={Register} />
          <UserLoginTemplate path='/login' exact Component={Login} />
          <HomeTemplate path='/projectManagement' exact Component={ProjectManagement} />
          <HomeTemplate path='/userManagement' exact Component={UserManagement} />
          {localStorage.getItem('userLogin') === null ?
            <UserLoginTemplate path='' exact Component={Login} /> :
            <HomeTemplate path='' exact Component={ProjectManagement} />}
        </Switch>
      </Router>
    </>
  );
}

export default App;
