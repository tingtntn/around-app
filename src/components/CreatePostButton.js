// import React, { Component } from 'react';
import React, { useState, useRef } from 'react';
import { Modal, Button, message } from 'antd';

import { PostForm } from 'components/PostForm';
import * as utils from 'utils.js';

function CreatePostButton(props) {
	const [ isVisible, setIsVisible ] = useState(false);
	const [ isLoadingModal, setIsLoadingModal ] = useState(false);
	const formRef = useRef();
	const { showPost } = props;

	const showModal = () => {
		setIsVisible(true);
	};

	const onCancelModal = () => {
		setIsVisible(false);
	};

	const onCreatePost = () => {
		setIsLoadingModal(true);

		formRef.current
			.validateFields()
			.then((form) => {
				const { description, uploadPost } = form;
				const { type, originFileObj } = uploadPost[0];

				const postType = type.match(/^(image|video)/g)[0];

				if (postType) {
					let formData = new FormData();
					formData.append('message', description);
					formData.append('media_file', originFileObj);

					utils
						.uploadPost(formData)
						.then(() => {
							message.success('The image/video is uploaded!');
							formRef.current.resetFields();
							onCancelModal();
							showPost(postType);
						})
						.catch((error) => {
							message.error(error, message);
						});
				}
			})
			.catch((error) => {
				console.log('Something is wrong!');
			})
			.finally(() => {
				setIsLoadingModal(false);
			});
	};

	return (
		<div>
			<Button type="primary" onClick={showModal}>
				Create New Post
			</Button>
			<Modal
				title="Create New Post"
				visible={isVisible}
				onOk={onCreatePost}
				okText="Create"
				confirmLoading={isLoadingModal}
				onCancel={onCancelModal}
			>
				<PostForm ref={formRef} />
			</Modal>
		</div>
	);
}

export default CreatePostButton;
