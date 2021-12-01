import React from 'react';
import { message, Row, Col, Button, Card } from 'antd';
import { USERNAME } from 'constants.js';
import * as utils from 'utils.js';

export default function VideoGallery(props) {
	const { videoPosts, setVideoPosts } = props;

	const onDeleteVideo = (deletePost) => {
		if (localStorage.getItem(USERNAME) !== deletePost.user) {
			message.error({
				content: 'You are not authorized to delete this video!'

				// style: {
				// 	marginTop: '200px',
				// 	zIndex: 2002
				// }
			});
			return;
		}

		if (window.confirm(`Are you sure you want to delete this video?`)) {
			utils
				.deletePost(deletePost.id)
				.then(() => {
					message.success('Video deleted successfully!');
					setVideoPosts(
						videoPosts.filter((post) => {
							return post.id !== deletePost.id;
						})
					);
				})
				.catch((error) => {
					message.error(error.message);
				});
		}
	};

	return (
		<Row gutter={32}>
			{videoPosts.map((post) => {
				return (
					<Col span={8} key={post.url}>
						<Card
							size="small"
							title={`${post.user}: ${post.message}`}
							extra={
								<Button type="primary" onClick={(e) => onDeleteVideo(post)}>
									Delete
								</Button>
							}
							bodyStyle={{ padding: '0px' }}
						>
							<video src={post.url} controls={true} className="video-block" />
						</Card>
					</Col>
				);
			})}
		</Row>
	);
}
