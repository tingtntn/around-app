import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';

import logo from 'assets/images/logo.svg';
import { TOKEN_KEY, USERNAME } from 'constants.js';
import { logout } from 'redux/actions/isAuthed';

function TopBar() {
	const isAuthed = useSelector((state) => state.isAuthed);
	const dispatch = useDispatch();

	const onSignOut = () => {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(USERNAME);
		dispatch(logout());
	};

	return (
		<header className="app-header">
			<img src={logo} className="app-logo" alt="logo" />
			<span className="app-title">Around Web</span>
			{isAuthed ? <LogoutOutlined className="signout" onClick={onSignOut} /> : null}
		</header>
	);
}

export default TopBar;
