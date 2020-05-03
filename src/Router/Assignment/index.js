import React, {  useEffect } from "react";
import { Route, Switch } from 'react-router-dom';

import AssignmentPage from "@pages/AssignmentList";

const EditorRouter = (props) => {
	return (
		<React.Fragment>
			<Switch>
				<Route exact path="/assignment" component={AssignmentPage}></Route>
				<Route path="/assignment/:id" component={AssignmentPage}></Route>
			</Switch>
		</React.Fragment>
	);
}

export default EditorRouter;