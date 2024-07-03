import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAlertsRequest,
  updateAlertStatusRequest,
  fetchUnresolvedCountRequest,
} from "../redux/actions/alertActions";
import {
  List,
  Button,
  Pagination,
  Spin,
  Alert,
  Select,
  Space,
  Badge,
  Row,
  Col,
  Modal,
} from "antd";
import { BellOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
import { getAlertTag, getStageTag } from "./ComponentUtils";
import "./AlertComponent.css"; // Import the CSS file

dayjs.extend(relativeTime);

const { Option } = Select;

const AlertComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessions = useSelector((state) => state.sessions.sessions);
  const { alerts, loading, error, totalPages, currentPage, unresolvedCount } =
    useSelector((state) => state.alerts);

  const [filterType, setFilterType] = useState(null);
  const [filterSession, setFilterSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState([]);

  useEffect(() => {
    dispatch(fetchAlertsRequest(1, 10)); // Fetch first page with 10 alerts per page
    dispatch(fetchUnresolvedCountRequest()); // Fetch unresolved count
  }, [dispatch]);

  const handleResolve = (id) => {
    dispatch(updateAlertStatusRequest(id, 1)); // 1 corresponds to "resolved"
  };

  const handlePageChange = (page) => {
    dispatch(fetchAlertsRequest(page, 10));
  };

  const handleFilterChange = (value) => {
    setFilterType(value);
  };

  const handleFilterSessionChange = (value) => {
    setFilterSession(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleExpand = (key) => {
    setExpandedKeys(
      expandedKeys.includes(key)
        ? expandedKeys.filter((k) => k !== key)
        : [...expandedKeys, key]
    );
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesType =
      filterType === null || filterType === 3 || alert.type === filterType;
    const matchesSession =
      filterSession === null || alert.session_id === filterSession;

    return matchesType && matchesSession && alert.status === 0; // Only show unresolved alerts
  });

  return (
    <div>
      <Badge count={unresolvedCount}>
        <Button
          type="primary"
          shape="circle"
          icon={<BellOutlined />}
          onClick={showModal}
        />
      </Badge>
      <Modal
        title={`Alerts (${unresolvedCount})`}
        open={isModalOpen}
        onCancel={hideModal}
        footer={null}
      >
        {loading && <Spin size="large" />}
        {error && <Alert message={error} type="error" showIcon />}
        <Space style={{ marginBottom: "20px" }}>
          <Row>
            <Col style={{ margin: "5px" }}>
              <Select
                placeholder="Filter by Type"
                onChange={handleFilterChange}
                style={{ width: 200 }}
              >
                <Option value={3}>All</Option>
                <Option value={0}>{getAlertTag(0)}</Option>
                <Option value={1}>{getAlertTag(1)}</Option>
                <Option value={2}>{getAlertTag(2)}</Option>
              </Select>
            </Col>
            <Col style={{ margin: "5px" }}>
              <Select
                placeholder="Filter by Session"
                onChange={handleFilterSessionChange}
                style={{ width: 200 }}
              >
                <Option value={null}>All Sessions</Option>
                {sessions.map((session) => (
                  <Option key={session._id} value={session._id}>
                    {session.name}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Space>
        <List
          itemLayout="horizontal"
          dataSource={filteredAlerts}
          renderItem={(alert) => {
            const session =
              sessions.find((s) => s._id === alert.session_id) || {};
            return (
              <div className="alert-item">
                <div onClick={() => handleExpand(alert._id)}>
                  <Alert
                    message={
                      <strong>
                        {getAlertTag(alert.type)}
                        {alert.title}
                      </strong>
                    }
                    description={
                      <span>
                        {alert.description} - <Button type="link" size="small" onClick={() => navigate(`/sessions/${session._id}`)}>{session.name}</Button> - {getStageTag(alert.stage)} -{" "}
                        {dayjs(alert.created_at).fromNow()}
                      </span>
                    }
                    type={
                      alert.type === 0
                        ? "info"
                        : alert.type === 1
                        ? "warning"
                        : "error"
                    }
                    closable
                    onClose={() => handleResolve(alert._id)}
                    className="compact-alert no-icon"
                  />
                </div>
              </div>
            );
          }}
        />
        <Pagination
          current={currentPage}
          total={totalPages * 10} // assuming 10 items per page
          onChange={handlePageChange}
          style={{ marginTop: "20px" }}
        />
      </Modal>
    </div>
  );
};

export default AlertComponent;
