import { Form, Input, Button, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createSessionRequest } from '../redux/actions/sessionActions';
import { useNavigate } from 'react-router-dom';
import './NewSessionForm.css';

const { TextArea } = Input;
const { Option } = Select;

const NewSessionForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.sessions);
  const { user } = useSelector((state) => state.auth);

  const onFinish = (values) => {
    // Path `stage` is required., created_by: Path `created_by` is required., status: Path `status` is required.
    values.stage = 0;
    values.created_by = user.userId;
    values.status = 0;
    dispatch(createSessionRequest(values));
    navigate('/');
  };

  return (
    <div className="new-session-form">
      <h2>New Printing Session</h2>
      <p>Create a new printing session</p>
      <Form
        name="new_session"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input the session name!' }]}
        >
          <Input placeholder="session name" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
        >
          <TextArea placeholder="Description of the session" />
        </Form.Item>
        <Form.Item
          name="workstation_id"
          label="Select work station (Optional)"
        >
          <Select placeholder="Workstation 01">
            <Option value="workstation1">Workstation 01</Option>
            <Option value="workstation2">Workstation 02</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="client_id"
          label="Select client (Optional)"
        >
          <Select placeholder="Montimage">
            <Option value="montimage">Montimage</Option>
            <Option value="client2">Client 02</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
        </Form.Item>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </Form>
    </div>
  );
};

export default NewSessionForm;