import React, { useState, useEffect, useRef } from 'react';
import { Tabs, message, Spin } from 'antd';

import SearchBar from 'components/SearchBar';
import PhotoGallery from 'components/PhotoGallery';
import { SEARCH_KEY } from 'constants.js';
import CreatePostButton from 'components/CreatePostButton';
import * as utils from 'utils.js';
import VideoGallery from './VideoGallery';

const { TabPane } = Tabs;

function Home() {
	const [ imagePosts, setImagePosts ] = useState([]);
	const [ videoPosts, setVideoPosts ] = useState([]);
	const [ activeTab, setActiveTab ] = useState('image');
	const [ isLoadingPosts, setIsLoadingPosts ] = useState(true);
	const previousPosts = useRef({ imagePosts: imagePosts, videoPosts: videoPosts });
	const [ searchOptions, setSearchOptions ] = useState({ type: SEARCH_KEY.all, keyword: '' });

	const showPost = (type) => {
		setActiveTab(type);
		setTimeout(() => {
			fetchPosts({ type: SEARCH_KEY.all, keyword: '' });
		}, 2000);
	};

	const operations = <CreatePostButton showPost={showPost} />;

	useEffect(
		() => {
			fetchPosts();
		},
		// eslint-disable-next-line
		[ searchOptions ]
	);

	useEffect(
		() => {
			if (previousPosts.current.imagePosts !== imagePosts && previousPosts.current.videoPosts !== videoPosts) {
				setIsLoadingPosts(false);
				previousPosts.current = { imagePosts: imagePosts, videoPosts: videoPosts };
			}
		},
		[ imagePosts, videoPosts ]
	);

	const fetchPosts = () => {
		setIsLoadingPosts(true);

		utils
			.fetchPosts(searchOptions)
			.then((posts) => {
				if (posts === null) {
					setImagePosts([]);
					setVideoPosts([]);
					return;
				}

				setImagePosts(
					posts.filter((post) => {
						return post.type === 'image';
					})
				);
				setVideoPosts(
					posts.filter((post) => {
						return post.type === 'video';
					})
				);
			})
			.catch((error) => {
				message.error(error.message);
				setIsLoadingPosts(false);
			});
		// .finally(() => {
		// 	setIsLoadingPosts(false);
		// });
	};

	const renderImagePosts = () => {
		if (imagePosts.length === 0) {
			return <p>No Data!</p>;
		}

		return <PhotoGallery imagePosts={imagePosts} setImagePosts={setImagePosts} />;
	};

	const renderVideoPosts = () => {
		if (videoPosts.length === 0) {
			return <p>No Data!</p>;
		}

		return <VideoGallery videoPosts={videoPosts} setVideoPosts={setVideoPosts} />;
	};

	return (
		<div className="home">
			<SearchBar fetchPosts={fetchPosts} setSearchOptions={setSearchOptions} />
			<div className="display">
				<Tabs
					onChange={(key) => setActiveTab(key)}
					defaultActiveKey="image"
					activeKey={activeTab}
					tabBarExtraContent={operations}
				>
					<TabPane tab="Images" key="image">
						{isLoadingPosts ? (
							<div>
								<Spin size="large" className="spin" />
							</div>
						) : (
							renderImagePosts()
						)}
					</TabPane>
					<TabPane tab="Videos" key="video">
						{isLoadingPosts ? (
							<div>
								<Spin size="large" className="spin" />
							</div>
						) : (
							renderVideoPosts()
						)}
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
}

export default Home;
