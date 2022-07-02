import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import Home from "./page/Home/Home";
import HomeTemplate from "./template/HomeTemplate";

const history = createBrowserHistory();
function App() {
  return (
    <>
      <Router history={history}>
        <Switch>
          <HomeTemplate path='/home' exact Component={Home} />

          <HomeTemplate path='' exact Component={Home} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
