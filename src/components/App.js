import React from 'react';
import TopBar from 'components/TopBar';
import Main from 'components/Main';

import 'styles/App.css';

// window.onbeforeunload = function(event) {
// 	localStorage.removeItem(TOKEN_KEY);
// 	localStorage.removeItem(USERNAME);
// };

function App() {
	return (
		<div className="App">
			<TopBar />
			<Main />
		</div>
	);
}

export default App;
