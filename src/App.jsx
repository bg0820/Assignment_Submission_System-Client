import React, { PureComponent } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import MainPage from "./Pages/Main";
import RegisterPage from "./Pages/Register";

import "./index.scss";

const App = (props) => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={MainPage} /> //
                    <Route exact path="/register" component={RegisterPage} />
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default App;
