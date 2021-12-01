import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { TOKEN_KEY, USERNAME } from 'constants.js';
import * as utils from 'utils.js';
import { login } from 'redux/actions/isAuthed';

function Signin() {
	const dispatch = useDispatch();

	const onFinishForm = (credential) => {
		utils
			.signIn(credential)
			.then((token) => {
				localStorage.setItem(TOKEN_KEY, token);
				localStorage.setItem(USERNAME, credential.username);
				dispatch(login());

				message.success('Sign in successfully ');
			})
			.catch((error) => {
				message.error(error.message);
			});
	};

	return (
		<Form name="normal_login" className="signin-form" onFinish={onFinishForm}>
			<Form.Item
				name="username"
				rules={[
					{
						required: true,
						message: 'Please input your Username!'
					}
				]}
			>
				<Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{
						required: true,
						message: 'Please input your Password!'
					}
				]}
			>
				<Input
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="Password"
				/>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" className="signin-form-button">
					Log in
				</Button>
				Or <Link to="/register">register now!</Link>
			</Form.Item>
		</Form>
	);
}

export default Signin;
