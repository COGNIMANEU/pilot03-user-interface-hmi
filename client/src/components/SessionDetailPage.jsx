import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  Spin,
  Steps,
  Dropdown,
  Descriptions,
  Collapse,
} from "antd";
import {
  DownOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import {
  fetchSessionByIdRequest,
  deleteSessionRequest,
  updateStageStatusRequest,
  advanceStageRequest,
} from "../redux/actions/sessionActions";
import {
  getStatusTag,
  getStageTag,
  getCurrentSessionStage,
  getStageIcon,
  getStageStatusMenu,
  getStageName,
} from "./ComponentUtils";
import "./SessionDetailPage.css";
const { Step } = Steps;
const { Panel } = Collapse;
const SessionDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const session = useSelector((state) => state.sessions.currentSession);
  const loading = useSelector((state) => state.sessions.loading);

  useEffect(() => {
    dispatch(fetchSessionByIdRequest(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteSessionRequest(id));
    navigate("/");
  };

  const handleAdvanceStage = () => {
    dispatch(advanceStageRequest(id));
  };

  const handleUpdateStageStatus = (stageIndex, newStatus) => {
    dispatch(updateStageStatusRequest(id, stageIndex, newStatus));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (!session) {
    return <div>Session not found</div>;
  }

  const currentStage = getCurrentSessionStage(session);

  return (
    <div className="session-detail-container">
      <Card
        title="Session Stages"
        extra={
          <Button
            type="primary"
            onClick={handleAdvanceStage}
            icon={<SaveOutlined />}
          >
            Advance Stage
          </Button>
        }
      >
        <Steps current={currentStage}>
          {session.stages.map((stage, index) => (
            <Step
              key={index}
              icon={getStageIcon(stage.stage)}
              description={
                <div>
                  <span>{getStatusTag(stage.status)}</span>
                  <Dropdown
                    overlay={getStageStatusMenu(index, handleUpdateStageStatus)}
                  >
                    <Button type="link" icon={<DownOutlined />} />
                  </Dropdown>
                </div>
              }
              title={
                <Button type="text" onClick={() => navigate(`/sessions/${session._id}/stages/${stage.stage}`)}>{getStageName(stage.stage)}</Button>
              }
              status={
                stage.status === 2
                  ? "finish"
                  : stage.status === 1
                  ? "process"
                  : stage.status === 3
                  ? "error"
                  : "wait"
              }
            />
          ))}
        </Steps>
      </Card>
      <Collapse defaultActiveKey={['1']} style={{marginTop: '10px'}}>
      <Panel header={session.name} key="1" >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{session._id}</Descriptions.Item>
          <Descriptions.Item label="Description">{session.description}</Descriptions.Item>
          <Descriptions.Item label="Status">{getStatusTag(session.status)}</Descriptions.Item>
          <Descriptions.Item label="Stage">
            {getStageTag(getCurrentSessionStage(session).stage)}
          </Descriptions.Item>
          <Descriptions.Item label="Has Build Plan">
            {session.has_build_plan ? "Build plan has been uploaded successfully" : "Not uploaded yet!"}
          </Descriptions.Item>
          <Descriptions.Item label="Has STL Files">
            {session.has_stl_files ? "STL files have been uploaded" : "Not uploaded yet!"}
          </Descriptions.Item>
          <Descriptions.Item label="Created at">{new Date(session.created_at).toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="Started at">
            {session.started_at ? new Date(session.started_at).toLocaleString() : "Not started yet"}
          </Descriptions.Item>
          <Descriptions.Item label="Terminated at">
            {session.terminated_at ? new Date(session.terminated_at).toLocaleString() : "Not terminated"}
          </Descriptions.Item>
          <Descriptions.Item label="Last updated">{new Date(session.last_updated).toLocaleString()}</Descriptions.Item>
          <Descriptions.Item label="Client ID">{session.client_id}</Descriptions.Item>
          <Descriptions.Item label="Workstation ID">{session.workstation_id}</Descriptions.Item>
          <Descriptions.Item label="Created by">{session.created_by}</Descriptions.Item>
          <Descriptions.Item label="Operator">{session.operator}</Descriptions.Item>
        </Descriptions>
        <div>
          <Button
            type="secondary"
            onClick={() => navigate(`/edit-session/${session._id}`)}
            icon={<EditOutlined />}
            style={{ marginRight: '10px' }}
          >
            Edit Session
          </Button>
          <Button danger onClick={handleDelete} icon={<DeleteOutlined />}>
            Delete Session
          </Button>
        </div>
      </Panel>
    </Collapse>
    </div>
  );
};

export default SessionDetailPage;
