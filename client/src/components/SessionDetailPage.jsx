import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, Row, Col, Spin, Steps,  Dropdown  } from 'antd';
import { DownOutlined, EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { fetchSessionByIdRequest, deleteSessionRequest, updateStageStatusRequest, advanceStageRequest } from '../redux/actions/sessionActions';
import { getStatusTag, getStageTag, getCurrentSessionStage, getStageIcon, getStageStatusMenu } from './ComponentUtils';
import './SessionDetailPage.css';
const {Step} = Steps;
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
    navigate('/');
  };

  const handleAdvanceStage = () => {
    dispatch(advanceStageRequest(id));
  };

  const handleUpdateStageStatus = (stageIndex, newStatus) => {
    dispatch(updateStageStatusRequest(id, stageIndex, newStatus));
  };

  if (loading) {
    return <div className="loading-container"><Spin size="large" /></div>;
  }

  if (!session) {
    return <div>Session not found</div>;
  }

  const currentStage = getCurrentSessionStage(session);
  console.log('currentStage: ', currentStage)
  return (
    <div className="session-detail-container">
      <Card title={session.name} bordered={false} style={{ width: '100%' }}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <p><strong>ID:</strong> {session._id}</p>
            <p><strong>Description:</strong> {session.description}</p>
            <p><strong>Status:</strong> {getStatusTag(session.status)}</p>
            <p><strong>Stage:</strong> {getStageTag(getCurrentSessionStage(session).stage)}</p>
            <p><strong>Has Build Plan:</strong> {session.has_build_plan ? 'Build plan has been uploaded successfully' : 'Not uploaded yet!'}</p>
            <p><strong>Has STL Files:</strong> {session.has_stl_files ? 'STL files have been uploaded' : 'Not uploaded yet!'}</p>
            <p><strong>Created at:</strong> {new Date(session.created_at).toLocaleString()}</p>
            <p><strong>Started at:</strong> {session.started_at ? new Date(session.started_at).toLocaleString() : 'Not started yet'}</p>
            <p><strong>Terminated at:</strong> {session.terminated_at ? new Date(session.terminated_at).toLocaleString() : 'Not terminated'}</p>
            <p><strong>Last updated:</strong> {new Date(session.last_updated).toLocaleString()}</p>
          </Col>
          <Col span={12}>
            <p><strong>Client ID:</strong> {session.client_id}</p>
            <p><strong>Workstation ID:</strong> {session.workstation_id}</p>
            <p><strong>Created by:</strong> {session.created_by}</p>
            <p><strong>Operator:</strong> {session.operator}</p>
          </Col>
        </Row>
        <Row gutter={[16, 16]} justify="center">
        <Col>
        <div className="session-stages">
        <h3>Stages</h3>
        <Steps current={currentStage} direction='vertical'>
          {session.stages.map((stage, index) => (
            <Step
              key={index}
              description={(
                <div>
                  <span>{getStatusTag(stage.status)}</span>
                  <Dropdown overlay={getStageStatusMenu(index, handleUpdateStageStatus)}>
                    <Button type="link" icon={<DownOutlined />} />
                  </Dropdown>
                </div>
              )}
              title={<span> {getStageIcon(stage.stage)} {getStageTag(stage.stage)}</span>}
              status={stage.status === 2 ? 'finish' : stage.status === 1 ? 'process' : stage.status === 3 ? 'error' : 'wait'}
            />
          ))}
        </Steps>
      </div>
      <div className="stage-buttons">
        <Button type="primary" onClick={handleAdvanceStage} icon={<SaveOutlined />} >Advance Stage</Button>
      </div>
      </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col>
            <Button type="secondary" onClick={() => navigate(`/edit-session/${session._id}`)} icon={<EditOutlined />}>
              Edit Session
            </Button>
          </Col>
          <Col>
            <Button danger onClick={handleDelete} icon={<DeleteOutlined />} >
              Delete Session
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SessionDetailPage;