import React, { forwardRef, useState } from 'react';
import { Form, Upload, Input, Modal } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

export const PostForm = forwardRef((props, ref) => {
	const [ isModalVisible, setIsModalVisible ] = useState(false);
	const [ modalImage, setModalImage ] = useState('');
	const [ modalTitle, setModalTitle ] = useState('');

	const formItemLayout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 14 }
	};

	const normFile = (e) => {
		console.log(0 && 10);

		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	};

	const getBase64 = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};

	const onPreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		setModalImage(file.url || file.preview);
		setIsModalVisible(true);
		setModalTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const onDropFile = (e) => {
		console.log('Dropped files', e.dataTransfer.files);
	};

	return (
		<Form name="validate_other" {...formItemLayout} ref={ref}>
			<Form.Item
				hasFeedback
				name="description"
				label="Message"
				rules={[
					{
						required: true,
						message: 'Please input your message'
					}
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item label="Dragger">
				<Form.Item
					name="uploadPost"
					valuePropName="fileList"
					getValueFromEvent={normFile}
					noStyle
					rules={[
						{
							required: true,
							message: 'Please select an image/video!'
						}
					]}
				>
					<Dragger
						name="files"
						beforeUpload={() => false}
						listType="picture"
						// maxCount={1}
						onDrop={onDropFile}
						onPreview={onPreview}
					>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">Click or drag file to this area to upload</p>
					</Dragger>
				</Form.Item>
			</Form.Item>
			<Modal visible={isModalVisible} title={modalTitle} footer={null} onCancel={handleCancel} width={700}>
				<img alt={modalTitle} style={{ width: '100%' }} src={modalImage} />
			</Modal>
		</Form>
	);
});
