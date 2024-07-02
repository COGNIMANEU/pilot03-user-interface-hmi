import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Select, Spin, Card, Switch } from 'antd';
import { fetchSessionByIdRequest, updateSessionRequest } from '../redux/actions/sessionActions';
import { getStatusTag, getStageTag } from './ComponentUtils';
import './EditSessionPage.css';
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

const EditSessionPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSelector((state) => state.sessions.currentSession);
  const loading = useSelector((state) => state.sessions.loading);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchSessionByIdRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (session) {
      form.setFieldsValue({
        name: session.name,
        description: session.description,
        status: session.status,
        stage: session.stage,
        has_build_plan: session.has_build_plan,
        has_stl_files: session.has_stl_files,
        client_id: session.client_id,
        workstation_id: session.workstation_id,
        created_by: session.created_by,
        operator: session.operator,
        created_at: session.created_at ? moment(session.created_at) : null,
        started_at: session.started_at ? moment(session.started_at) : null,
        terminated_at: session.terminated_at ? moment(session.terminated_at) : null,
      });
    }
  }, [session, form]);

  const onFinish = (values) => {
    const updatedSession = {
      ...values,
      created_at: values.created_at ? values.created_at.toISOString() : null,
      started_at: values.started_at ? values.started_at.toISOString() : null,
      terminated_at: values.terminated_at ? values.terminated_at.toISOString() : null,
    };
    dispatch(updateSessionRequest(id, updatedSession));
    navigate(`/session/${id}`);
  };

  if (loading) {
    return <div className="loading-container"><Spin size="large" /></div>;
  }

  if (!session) {
    return <div>Session not found</div>;
  }

  return (
    <div className="edit-session-container">
      <Card title="Edit Session" bordered={false} style={{ width: '100%' }}>
        <Form
          form={form}
          name="editSession"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Session Name"
            rules={[{ required: true, message: 'Please input the session name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select>
              <Option value={0}>{getStatusTag(0)}</Option>
              <Option value={1}>{getStatusTag(1)}</Option>
              <Option value={2}>{getStatusTag(2)}</Option>
              <Option value={3}>{getStatusTag(3)}</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="stage"
            label="Stage"
            rules={[{ required: true, message: 'Please select the stage!' }]}
          >
            <Select>
              <Option value={0}>{getStageTag(0)}</Option>
              <Option value={1}>{getStageTag(1)}</Option>
              <Option value={2}>{getStageTag(2)}</Option>
              <Option value={3}>{getStageTag(3)}</Option>
              <Option value={4}>{getStageTag(4)}</Option>
              <Option value={5}>{getStageTag(5)}</Option>
              <Option value={6}>{getStageTag(6)}</Option>
              <Option value={7}>{getStageTag(7)}</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="has_build_plan"
            label="Has Build Plan"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="has_stl_files"
            label="Has STL Files"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name="client_id"
            label="Client ID"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="workstation_id"
            label="Workstation ID"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="created_by"
            label="Created by"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="operator"
            label="Operator"
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button style={{ marginLeft: '10px' }} onClick={() => navigate(`/session/${id}`)}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditSessionPage;