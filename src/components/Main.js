import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { useSelector } from 'react-redux';

import Signin from 'components/Signin';
import Register from 'components/Register';
import Home from 'components/Home';

function Main() {
	const isAuthed = useSelector((state) => state.isAuthed);

	const showSignin = () => {
		return isAuthed ? <Redirect to="/home" /> : <Signin />;
	};

	const showHome = () => {
		return isAuthed ? <Home /> : <Redirect to="/signin" />;
	};
	return (
		<div className="main">
			<Switch>
				<Route path="/" exact render={showSignin} />
				<Route path="/signin" render={showSignin} />
				<Route path="/register" component={Register} />
				<Route path="/home" render={showHome} />
			</Switch>
		</div>
	);
}

export default Main;
