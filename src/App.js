import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import Message from "./component/message/Message";
import PopupModal from "./component/popupModal/PopupModal";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import HomeTemplate from "./template/HomeTemplate";
import UserLoginTemplate from "./template/UserLoginTemplate";

export const history = createBrowserHistory();
function App() {
  return (
    <>
      {/* <PopupModal /> */}
      {/* <Message /> */}
      <Router history={history}>
        <Switch>
          <HomeTemplate path='/home' exact Component={Home} />
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
