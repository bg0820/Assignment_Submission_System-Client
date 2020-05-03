import React, {  useEffect } from "react";
import { Route, Switch } from 'react-router-dom';

import EditorPage from '@pages/Editor';

const EditorRouter = (props) => {
	return (
		<React.Fragment>
			<Switch>
				<Route exact path="/editor" component={EditorPage}></Route>
				<Route path="/editor/:id" component={EditorPage}></Route>
			</Switch>
		</React.Fragment>
	);
}

export default EditorRouter;