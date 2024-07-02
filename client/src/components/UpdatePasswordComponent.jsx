import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordRequest } from '../redux/actions/authActions';
import { Form, Input, Button, Alert } from 'antd';

const UpdatePasswordComponent = () => {
  const dispatch = useDispatch();
  const { user, error, success } = useSelector(state => state.auth);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const onFinish = () => {
    dispatch(updatePasswordRequest({ userId: user.userId, oldPassword, newPassword }));
  };

  return (
    <div style={{ width: 300, margin: 'auto', padding: '50px' }}>
      <h2>Update Password</h2>
      <Form onFinish={onFinish}>
        <Form.Item
          name="oldPassword"
          rules={[{ required: true, message: 'Please input your old Password!' }]}
        >
          <Input.Password
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[
            { required: true, message: 'Please input your new Password!' },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
            }
          ]}
        >
          <Input.Password
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Update Password
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message={error} type="error" showIcon />}
      {success && <Alert message="Password updated successfully!" type="success" showIcon />}
    </div>
  );
};

export default UpdatePasswordComponent;