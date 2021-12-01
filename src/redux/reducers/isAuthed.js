// REDUCER

import { SIGNIN, SIGNOUT } from 'redux/constants/isAuthed';
import { TOKEN_KEY } from 'constants.js';

const isAuthedReducer = (state = localStorage.getItem(TOKEN_KEY) ? true : false, action) => {
	switch (action.type) {
		case SIGNIN:
			return true;
		case SIGNOUT:
			return false;
		default:
			return state;
	}
};

export default isAuthedReducer;
