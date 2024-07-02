import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
} from "antd";
import moment from "moment";
import {
  fetchSessionByIdRequest,
  updateSessionRequest,
  updateStageStatusRequest,
} from "../redux/actions/sessionActions";
import StagesSection from "./StagesSession";

const EditSessionPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const session = useSelector((state) => state.sessions.currentSession);
  const loading = useSelector((state) => state.sessions.loading);
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    dispatch(fetchSessionByIdRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (session) {
      setInitialValues({
        name: session.name,
        description: session.description,
        workstation_id: session.workstation_id,
        client_id: session.client_id,
        created_by: session.created_by,
        operator: session.operator,
        has_build_plan: session.has_build_plan,
        has_stl_files: session.has_stl_files,
        created_at: session.created_at ? moment(session.created_at) : null,
        started_at: session.started_at ? moment(session.started_at) : null,
        terminated_at: session.terminated_at
          ? moment(session.terminated_at)
          : null,
        stages: session.stages.map((stage, index) => ({
          stage: index,
          status: stage.status,
        })),
      });
    }
  }, [session]);

  const handleFinish = (values) => {
    const updatedSession = {
      ...values,
    };

    dispatch(updateSessionRequest(id, updatedSession))
  };

  const handleUpdateStageStatus = (stageIndex, newStatus) => {
    dispatch(updateStageStatusRequest(id, stageIndex, newStatus));
  };

  if (loading || !initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <Card title="Edit Session">
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={handleFinish}
        layout="vertical"
      >
        <Card title={"Session Stages"}>
          <StagesSection
            session={session}
            handleUpdateStageStatus={handleUpdateStageStatus}
          />
        </Card>
        <Card title={'Session Detail'} style={{marginTop: '10px'}}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input the session name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the session description!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="workstation_id"
            label="Workstation ID"
            rules={[
              { required: true, message: "Please input the workstation ID!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="client_id"
            label="Client ID"
            rules={[{ required: true, message: "Please input the client ID!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="operator"
            label="Operator"
            rules={[{ required: true, message: "Please input the operator!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="has_build_plan" valuePropName="checked">
            <Checkbox>Has Build Plan</Checkbox>
          </Form.Item>
          <Form.Item name="has_stl_files" valuePropName="checked">
            <Checkbox>Has STL Files</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Session
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </Card>
  );
};

export default EditSessionPage;
