import React, { PureComponent } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import MainPage from "./Pages/Main";
import LoginPage from "./Pages/Login";
import LecturePage from "./Pages/Lecture";

import "./index.scss";

const App = (props) => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={MainPage} /> //
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/lecture" component={LecturePage} />
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default App;
