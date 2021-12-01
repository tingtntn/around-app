// ACTION

import { SIGNIN, SIGNOUT } from 'redux/constants/isAuthed';

export const login = () => {
	return {
		type: SIGNIN
	};
};

export const logout = () => {
	return {
		type: SIGNOUT
	};
};
