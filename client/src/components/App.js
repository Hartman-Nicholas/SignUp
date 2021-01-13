import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import * as actions from "../components/store/actions";
import history from "../history";
import Landing from "./Landing";
import UserInfo from "./UserInfo";
import ReqLogin from "./ReqLogin";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.fetchUser());
  }, [dispatch]);

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/UserInfo" exact component={UserInfo} />
        <Route path="/ReqLogin" exact component={ReqLogin} />
      </Switch>
    </Router>
  );
};

export default App;
