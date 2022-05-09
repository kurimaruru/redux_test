import React from 'react';
import style from "./App.module.css";
import {Route,BrowserRouter,Switch} from "react-router-dom";
import Auth from "./components/Auth";
import MainPage from "./components/MainPage";

const App = () => {
  return (
    <div className={style.app__root}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Auth}></Route>
          <Route exact path="/vehicle" component={MainPage}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
