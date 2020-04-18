import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register";
import Login from "./containers/Login";
import UserProfile from "./containers/UserProfile";
import NewCocktail from "./containers/New Cocktail";
import Cocktails from "./containers/Cocktails";

const ProtectedRoute = ({isAllowed, ...props}) => (
  isAllowed ? <Route {...props}/> : <Redirect to="/login"/>
);

const Routes = () => {
  const user = useSelector(state => state.users.user);

  return (
    <Switch>
      <Route path="/" exact component={Cocktails} />
      <Route path="/new" exact component={NewCocktail} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/profile" exact component={UserProfile} />
    </Switch>
  );
};

export default Routes;