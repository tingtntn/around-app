import React from 'react';
import { Form, Input, Button, message } from 'antd';

import * as utils from 'utils.js';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 }
	}
};

const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 16,
			offset: 0
		},
		sm: {
			span: 16,
			offset: 8
		}
	}
};

function Register(props) {
	const [ form ] = Form.useForm();
	const { history } = props;

	const onFinishForm = (credential) => {
		utils
			.register(credential)
			.then(() => {
				message.success('Register successfully!');
				history.push('/signin');
			})
			.catch((error) => {
				message.error(error.message);
			});
	};

	return (
		<Form {...formItemLayout} form={form} name="register" onFinish={onFinishForm} className="register">
			<Form.Item
				name="username"
				label="Username"
				rules={[
					{
						required: true,
						message: 'Please input your Username!'
					}
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="password"
				label="Password"
				rules={[
					{
						required: true,
						message: 'Please input your password!'
					}
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="confirm"
				label="Confirm Password"
				dependencies={[ 'password' ]}
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Please confirm your password!'
					},
					({ getFieldValue }) => ({
						validator(rule, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject('The two passwords that you entered do not match!');
						}
					})
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item {...tailFormItemLayout}>
				<Button type="primary" htmlType="submit" className="register-btn">
					Register
				</Button>
			</Form.Item>
		</Form>
	);
}

export default Register;
