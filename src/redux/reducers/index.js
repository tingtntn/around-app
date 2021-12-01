import { combineReducers } from 'redux';

import isAuthedReducer from 'redux/reducers/isAuthed';

const rootReducer = combineReducers({
	isAuthed: isAuthedReducer
});

export default rootReducer;
