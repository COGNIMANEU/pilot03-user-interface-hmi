import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Input } from 'antd';
import { fetchSessionsRequest } from '../redux/actions/sessionActions';
import { getStatusTag, getStageTag, getCurrentSessionStage } from './ComponentUtils';
import dayjs from 'dayjs';
import './SessionsComponent.css';

const SessionsComponent = () => {
  const { user } = useSelector((state) => state.auth);
  const { sessions, loading } = useSelector((state) => state.sessions);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filteredSessions, setFilteredSessions] = useState(sessions);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchSessionsRequest(1,10));
  }, [dispatch]);

  useEffect(() => {
    setFilteredSessions(sessions);
  }, [sessions]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filteredData = sessions.filter(session =>
      session.name.toLowerCase().includes(value.toLowerCase()) ||
      session.description.toLowerCase().includes(value.toLowerCase()) ||
      session.workstation_id.toLowerCase().includes(value.toLowerCase()) ||
      session.client_id.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSessions(filteredData);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a onClick={() => navigate(`/sessions/${record._id}`)}>{text}</a>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      responsive: ['lg', 'xl'],
    },
    {
      title: 'Workstation',
      dataIndex: 'workstation_id',
      key: 'workstation_id',
      sorter: (a, b) => a.workstation_id.localeCompare(b.workstation_id),
      responsive: ['lg', 'xl'],
    },
    {
      title: 'Client',
      dataIndex: 'client_id',
      key: 'client_id',
      sorter: (a, b) => a.client_id.localeCompare(b.client_id),
      responsive: ['lg', 'xl'],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
      sorter: (a, b) => a.status - b.status,
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Stage',
      key: 'stage',
      sorter: (a, b) => getCurrentSessionStage(a) - getCurrentSessionStage(b),
      render: (text, record) => {
        const currentStage = getCurrentSessionStage(record);
        return <Button type="text" onClick={() => navigate(`/sessions/${record._id}/stages/${currentStage.stage}`)}>{getStageTag(currentStage.stage)}</Button>
      },
      responsive: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (created_at) => dayjs(created_at).fromNow(),
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      responsive: ['lg', 'xl'],
    },
    {
      title: 'Last Updated',
      dataIndex: 'last_updated',
      key: 'last_updated',
      render: (last_updated) => dayjs(last_updated).fromNow(),
      sorter: (a, b) => new Date(a.last_updated) - new Date(b.last_updated),
      responsive: ['lg', 'xl'],
    },
  ];

  return (
    <div className="session-overview-container">
      <div className="session-overview-header">
        <h2>Dashboard</h2>
        {user && (user.role === 0 || user.role === 1) && (
          <Button type="primary" onClick={() => navigate('/create-session')}>
            Create new session
          </Button>
        )}
      </div>
      <div className="session-overview-search">
        <Input
          placeholder="Search by name, description, workstation or client"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <Table
        columns={columns}
        dataSource={filteredSessions}
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
};

export default SessionsComponent;
