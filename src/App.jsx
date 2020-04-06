import React, { PureComponent } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import MainPage from "./Pages/Main";

import "./index.scss";

const App = (props) => {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={MainPage} /> //
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default App;
