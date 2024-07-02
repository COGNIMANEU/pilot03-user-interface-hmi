import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUserRequest } from '../redux/actions/userActions';
import { Form, Input, Button, Select, Alert } from 'antd';

const { Option } = Select;

const CreateUserComponent = () => {
  const dispatch = useDispatch();
  const { error, success } = useSelector(state => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(1);

  const onFinish = () => {
    dispatch(createUserRequest({ email, password, role }));
  };

  return (
    <div style={{ width: 300, margin: 'auto', padding: '50px' }}>
      <h2>Create New User</h2>
      <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your Password!' },
            {
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
            }
          ]}
        >
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item name="role" rules={[{ required: true, message: 'Please select a role!' }]}>
          <Select placeholder="Select a role" value={role} onChange={(value) => setRole(value)}>
            <Option value={0}>Admin</Option>
            <Option value={1}>Operator</Option>
            <Option value={2}>Service</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Create User
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message={error} type="error" showIcon />}
      {success && <Alert message="User created successfully!" type="success" showIcon />}
    </div>
  );
};

export default CreateUserComponent;