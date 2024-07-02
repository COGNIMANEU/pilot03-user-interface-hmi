import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlertsRequest, updateAlertStatusRequest, fetchUnresolvedCountRequest } from '../redux/actions/alertActions';
import { List, Button, Pagination, Spin, Alert, Tag, Select, Space, Modal, Badge } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Option } = Select;

const alertTypeColors = {
  0: 'blue',    // information
  1: 'orange',  // warning
  2: 'red'      // critical
};

const AlertComponent = () => {
  const dispatch = useDispatch();
  const { alerts, loading, error, totalPages, currentPage, unresolvedCount } = useSelector(state => state.alerts);

  const [filterType, setFilterType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAlertsRequest(1, 10)); // Fetch first page with 10 alerts per page
    dispatch(fetchUnresolvedCountRequest()); // Fetch unresolved count
  }, [dispatch]);

  const handleResolve = id => {
    dispatch(updateAlertStatusRequest(id, 1)); // 1 corresponds to "resolved"
  };

  const handlePageChange = page => {
    dispatch(fetchAlertsRequest(page, 10));
  };

  const handleFilterChange = value => {
    setFilterType(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filterType !== null && alert.type !== filterType) {
      return false;
    }
    return alert.status === 0; // Only show unresolved alerts
  });

  return (
    <div>
      <Badge count={unresolvedCount}>
          <Button type="primary" shape="circle" icon={<BellOutlined />} onClick={showModal} />
        </Badge>
      <Modal
        title="Unresolved Alerts"
        open={isModalOpen}
        onCancel={hideModal}
        footer={null}
      >
        {loading && <Spin size="large" />}
        {error && <Alert message={error} type="error" showIcon />}
        <Space style={{ marginBottom: '20px' }}>
          <Select placeholder="Filter by Type" onChange={handleFilterChange} style={{ width: 200 }}>
            <Option value={3}>All</Option>
            <Option value={0}>Info</Option>
            <Option value={1}>Warning</Option>
            <Option value={2}>Critical</Option>
          </Select>
        </Space>
        <List
          itemLayout="horizontal"
          dataSource={filteredAlerts}
          renderItem={alert => (
            <List.Item
              actions={[
                alert.status === 0 && (
                  <Button type="primary" onClick={() => handleResolve(alert._id)}>
                    Resolve
                  </Button>
                )
              ]}
            >
              <List.Item.Meta
                title={
                  <span>
                    <Tag color={alertTypeColors[alert.type]}>
                      {alert.type === 0 ? 'Info' : alert.type === 1 ? 'Warning' : 'Critical'}
                    </Tag>
                    {alert.title}
                  </span>
                }
                description={
                  <span>
                    {alert.description} -{' '}
                    {alert.status === 0
                      ? 'Unresolved'
                      : alert.status === 1
                      ? 'Resolved'
                      : 'Ignored'}{' '}
                    - {dayjs(alert.created_at).fromNow()}
                  </span>
                }
              />
            </List.Item>
          )}
        />
        <Pagination
          current={currentPage}
          total={totalPages * 10} // assuming 10 items per page
          onChange={handlePageChange}
          style={{ marginTop: '20px' }}
        />
      </Modal>
    </div>
  );
};

export default AlertComponent;