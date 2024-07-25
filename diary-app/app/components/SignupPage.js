'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Space, notification, Typography, Alert } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import cookies from 'js-cookie';
import styles from '../page.module.css';

const SignupPage = ({ onSignupSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const router = useRouter();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setAlert(<Alert message="Error" description="Passwords do not match!" type="error" showIcon />);
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        cookies.set('token', data.token, { expires: 1 });
        setAlert(<Alert message="Success" description="Signup successful! Redirecting to login page..." type="success" showIcon />);
        setTimeout(() => {
          onSignupSuccess();
          router.push('/login'); // Redirect to the login page
        }, 2000);
      } else {
        setAlert(<Alert message="Error" description={data.message} type="error" showIcon />);
      }
    } catch (error) {
      setAlert(<Alert message="Error" description="An unexpected error occurred. Please try again." type="error" showIcon />);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/LoginPage'); // Redirect to the login page
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Signup</h1>
        {alert}
        <Form onFinish={handleSignup}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Form.Item label={<Typography.Text style={{ color: 'white' }}>Username</Typography.Text>} required>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username' />
            </Form.Item>
            <Form.Item label={<Typography.Text style={{ color: 'white' }}>Email</Typography.Text>} required>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
            </Form.Item>
            <Form.Item label={<Typography.Text style={{ color: 'white' }}>Password</Typography.Text>} required>
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Input password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item label={<Typography.Text style={{ color: 'white' }}>Confirm Password</Typography.Text>} required>
              <Input.Password
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Space>
        </Form>
        <div className={styles.signupContainer}>
          <Typography.Text>Already have an account?</Typography.Text>
          <Button type="link" onClick={handleLoginRedirect}>
            Login
          </Button>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image
          className={styles.logo}
          src="/journalpng.svg"
          alt="Journal Logo"
          width={600}
          height={270}
          priority
        />
        <Typography.Text className={styles.welcomeText}>Welcome to your journal, start writing!</Typography.Text>
      </div>
    </div>
  );
};

export default SignupPage;
