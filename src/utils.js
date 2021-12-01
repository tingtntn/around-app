import axios from 'axios';
import { SEARCH_KEY, BASE_URL, TOKEN_KEY } from 'constants.js';

export const fetchPosts = async (searchOptions) => {
	const { type, keyword } = searchOptions;
	let url = '';

	if (type === SEARCH_KEY.all) {
		url = `${BASE_URL}/search`;
	} else if (type === SEARCH_KEY.user) {
		url = `${BASE_URL}/search?user=${keyword}`;
	} else {
		url = `${BASE_URL}/search?keywords=${keyword}`;
	}

	const options = {
		method: 'GET',
		url: url,
		headers: {
			Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
		}
	};

	return axios(options)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw Error('Fail to fetch posts!');
		});
};

export const uploadPost = async (formData) => {
	const options = {
		method: 'POST',
		url: `${BASE_URL}/upload`,
		headers: {
			Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
		},
		data: formData
	};

	try {
		const response = await axios(options);
		console.log(response.status);
	} catch (error) {
		throw Error('Fail to upload the image/video!');
	}
};

export const deletePost = async (id) => {
	const options = {
		method: 'DELETE',
		url: `${BASE_URL}/post/${id}`,
		headers: {
			Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
		}
	};

	return axios(options)
		.then((response) => {
			console.log(response.status);
		})
		.catch((error) => {
			throw Error('Fail to delete the post!');
		});
};

export const register = async (credential) => {
	const { username, password } = credential;
	const options = {
		method: 'POST',
		url: `${BASE_URL}/signup`,
		data: {
			username: username,
			password: password
		},
		headers: { 'content-type': 'application/json' }
	};

	return axios(options)
		.then((response) => {
			console.log(response.status);
		})
		.catch((error) => {
			throw Error('Fail to register!');
		});
};

export const signIn = async (credential) => {
	const { username, password } = credential;
	const options = {
		method: 'POST',
		url: `${BASE_URL}/signin`,
		data: {
			username: username,
			password: password
		},
		headers: { 'Content-Type': 'application/json' }
	};
	return axios(options)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw Error('Fail to sign in');
		});
};
