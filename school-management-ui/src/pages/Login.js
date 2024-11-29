import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '~/redux/actions/authActions';
import urls from '~/common/configs/urls';
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState();
    const onFinish = (loginData) => {
        setError('');
        dispatch(login(loginData))
            .then(() => {
                navigate(urls.home);
            })
            .catch((error) => {
                if (error.message.includes('Network error')) {
                    navigate(urls.networkErr);
                } else {
                    setError(error.data.error_message);
                }
            });
    };

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    return (
        <div>
            <Form
                name="login"
                initialValues={{
                    remember: true,
                }}
                style={{
                    maxWidth: 360,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                    initialValue={formData.email}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email..." />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                    initialValue={formData.password}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password..." />
                </Form.Item>
                <Form.Item>
                    <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a href="">Forgot password</a>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Log in
                    </Button>
                    or <a href="">Register now!</a>
                </Form.Item>
            </Form>
            {error && <h1>{error}</h1>}
        </div>
    );
}
export default Login;
