import React, { useState } from 'react';
import { Input, Radio } from 'antd';

import { SEARCH_KEY } from 'constants.js';

const { Search } = Input;

function SearchBar(props) {
	const [ searchType, setSearchType ] = useState(SEARCH_KEY.all);
	const [ searchText, setSearchText ] = useState();
	const { setSearchOptions } = props;

	const onChangeSearchType = (e) => {
		setSearchType(e.target.value);

		if (e.target.value === SEARCH_KEY.all) {
			setSearchOptions({ type: searchType, keyword: '' });
		}
	};

	const onSearchPosts = (keyword) => {
		setSearchText(keyword);

		if (keyword === '') {
			return;
		}

		setSearchOptions({ type: searchType, keyword: keyword });
	};

	// const onChangeSearchText = (e) => {
	// 	setSearchText(e.target.value);
	// };

	return (
		<div className="search-bar">
			<Search
				placeholder="input search text"
				enterButton={'Search'}
				size="large"
				onSearch={onSearchPosts}
				// onChange={onChangeSearchText}

				disabled={searchType === SEARCH_KEY.all}
				// value={searchText}
			/>

			{searchType !== SEARCH_KEY.all && searchText === '' ? (
				<p style={{ color: 'red', marginBottom: '0px' }}>Please input your search keyword!</p>
			) : null}

			<Radio.Group
				onChange={onChangeSearchType}
				value={searchType}
				className="search-type-group"
				style={{ marginTop: '10px' }}
			>
				<Radio value={SEARCH_KEY.all}>All</Radio>
				<Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
				<Radio value={SEARCH_KEY.user}>User</Radio>
			</Radio.Group>
		</div>
	);
}

export default SearchBar;
