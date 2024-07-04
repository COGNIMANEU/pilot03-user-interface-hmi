import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Card,
  Button,
  Select,
  List,
  Space,
  Spin,
  Pagination,
  Typography,
  Row,
  Col,
} from "antd";
import {ApiOutlined} from '@ant-design/icons';
import { updateAlertStatusRequest } from "../redux/actions/alertActions";
import { getAlertTag, getStageName, getStatusTag } from "./ComponentUtils";
import dayjs from "dayjs";
const { Option } = Select;
const { Title } = Typography;

const SessionStageDetail = () => {
  const dispatch = useDispatch();
  const { sessionId, stage } = useParams();
  console.log(sessionId, stage);
  const sessions = useSelector((state) => state.sessions.sessions);
  const alerts = useSelector((state) => state.alerts.alerts);

  const session = sessions.find((s) => s._id === sessionId);
  const stageAlerts = alerts.filter(
    (alert) =>
      alert.session_id === sessionId && alert.stage === parseInt(stage, 10)
  );

  const [stageStatus, setStageStatus] = useState(0);
  const [filterType, setFilterType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertsPerPage] = useState(10);

  useEffect(() => {
    if (session) {
      setStageStatus(session.stages[stage]?.status || 0);
    }
  }, [session, stage]);

  // const handleStageStatusChange = value => {
  //   setStageStatus(value);
  //   // Implement the action to change the stage status in your backend.
  // };

  const handleResolveAlert = (id) => {
    dispatch(updateAlertStatusRequest(id, 1)); // 1 corresponds to "resolved"
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredAlerts = stageAlerts.filter((alert) => {
    return filterType === null || filterType === 3 || alert.type === filterType;
  });

  const indexOfLastAlert = currentPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = filteredAlerts.slice(
    indexOfFirstAlert,
    indexOfLastAlert
  );

  if (!session) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Title level={2}>
        {`${getStageName(stageStatus)}`} {getStatusTag(stageStatus)}
      </Title>
      <Row justify="center" style={{ marginTop: 50, marginBottom: 50 }}>
        <Col>
          <Button
            type="primary"
            size="large"
            onClick={() => window.open('https://external-service.com', '_blank')}
          >
            <ApiOutlined /> Open {getStageName(stage)} service
          </Button>
        </Col>
      </Row>

      <Card title={`Alerts (${currentAlerts.length})`} style={{ marginTop: 20 }}>
        <Space style={{ marginBottom: 20 }}>
          <Select
            placeholder="Filter by Type"
            onChange={setFilterType}
            style={{ width: 200 }}
          >
            <Option value={3}>All</Option>
            <Option value={0}>Info</Option>
            <Option value={1}>Warning</Option>
            <Option value={2}>Critical</Option>
          </Select>
        </Space>
        <List
          itemLayout="horizontal"
          dataSource={currentAlerts}
          renderItem={(alert) => (
            <List.Item
              actions={[
                alert.status === 0 && (
                  <Button
                    type="primary"
                    onClick={() => handleResolveAlert(alert._id)}
                  >
                    Resolve
                  </Button>
                ),
              ]}
            >
              <List.Item.Meta
                title={
                  <span>
                    {getAlertTag(alert.type)}
                    {alert.title}
                  </span>
                }
                description={`${alert.description} - ${dayjs(
                  alert.created_at
                ).fromNow()}`}
              />
            </List.Item>
          )}
        />
        <Pagination
          current={currentPage}
          total={filteredAlerts.length}
          pageSize={alertsPerPage}
          onChange={handlePageChange}
          style={{ marginTop: 20 }}
        />
      </Card>
    </div>
  );
};

export default SessionStageDetail;
