import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import App from "./App";
// import Base from "./core/Base";
import { Home } from "./core/Home";
import { Create } from "./core/Create";
import { Update } from "./core/Update";
const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/create" exact component={Create}/>
				<Route path="/update/:id" exact component={Update}/>
			</Switch>
		</BrowserRouter>
	);
};

export default Routes;
