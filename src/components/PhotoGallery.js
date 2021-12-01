import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import Gallery from 'react-grid-gallery';
import { message, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { USERNAME } from 'constants.js';

import * as utils from 'utils.js';

const captionStyle = {
	backgroundColor: 'rgba(0, 0, 0, 0.6)',
	maxHeight: '240px',
	overflow: 'hidden',
	position: 'absolute',
	bottom: '0',
	width: '100%',
	color: 'white',
	padding: '2px',
	fontSize: '90%'
};

const wrapperStyle = {
	display: 'block',
	minHeight: '1px',
	width: '100%',
	border: '1px solid #ddd',
	overflow: 'auto'
};

function PhotoGallery(props) {
	const [ deleteIndex, setDeleteIndex ] = useState(0);
	const { imagePosts, setImagePosts } = props;
	const images = imagePosts.map((image) => {
		return {
			postId: image.id,
			src: image.url,
			username: image.user,
			caption: image.message,
			thumbnail: image.url,
			thumbnailWidth: 300,
			thumbnailHeight: 200,
			customOverlay: (
				<div style={captionStyle}>
					<div>{`${image.user}: ${image.message}`}</div>
				</div>
			)
		};
	});

	const onDeleteImage = () => {
		const deleteImage = images[deleteIndex];
		if (localStorage.getItem(USERNAME) !== deleteImage.username) {
			message.error({
				content: 'You are not authorized to delete this image!'
			});
			return;
		}

		if (window.confirm(`Are you sure you want to delete this image?`)) {
			utils
				.deletePost(deleteImage.postId)
				.then(() => {
					message.success('Image deleted successfully!');
					setImagePosts(
						imagePosts.filter((post) => {
							return post.id !== deleteImage.postId;
						})
					);
				})
				.catch((error) => {
					message.error(error.message);
				});
		}
	};

	const onCurrentImageChange = (index) => {
		setDeleteIndex(index);
	};

	// useEffect(
	// 	() => {
	// 		console.log('hello');
	// 		setImages(props.images);
	// 	},
	// 	[ props.images ]
	// );

	return (
		<React.Fragment>
			{images.length === 0 ? (
				<p>No Data!</p>
			) : (
				<div style={wrapperStyle}>
					<Gallery
						images={images}
						enableImageSelection={false}
						backdropClosesModal={true}
						currentImageWillChange={onCurrentImageChange}
						customControls={[
							<Button
								style={{ marginTop: '10px', marginLeft: '5px' }}
								key="deleteImage"
								type="primary"
								icon={<DeleteOutlined />}
								size="small"
								onClick={onDeleteImage}
							>
								Delete Image
							</Button>
						]}
					/>
				</div>
			)}
		</React.Fragment>
	);
}

// PhotoGallery.propTypes = {
// 	images: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			user: PropTypes.string.isRequired,
// 			message: PropTypes.string.isRequired,
// 			src: PropTypes.string.isRequired,
// 			thumbnail: PropTypes.string.isRequired,
// 			thumbnailWidth: PropTypes.number.isRequired,
// 			thumbnailHeight: PropTypes.number.isRequired
// 		})
// 	).isRequired
// };

export default PhotoGallery;
