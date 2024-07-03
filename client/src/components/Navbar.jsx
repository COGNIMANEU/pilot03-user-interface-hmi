import { useState } from 'react';
import { Menu, Dropdown, Button, Drawer, Space, Badge, Divider } from 'antd';
import { SettingOutlined, PoweroffOutlined, UserOutlined, DownOutlined, UserAddOutlined, MenuOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';
import './Navbar.css'; // Import the CSS file
import AlertComponent from './AlertComponent';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { alerts } = useSelector((state) => state.alerts); // Assuming alerts are stored in state.alerts
  const [visible, setVisible] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };


  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="0" onClick={() => { navigate('/update-password'); closeDrawer(); }}>
        <SettingOutlined />
        {'  Update Password'}
      </Menu.Item>
      <Menu.Item key="1" onClick={() => { handleLogout(); closeDrawer(); }}>
        <PoweroffOutlined twoToneColor='red'/>
        {'  Log Out'}
      </Menu.Item>
    </Menu>
  );

  const helpMenu = (
    <Menu>
      <Menu.Item key="1" onClick={closeDrawer}>
        <a href="https://example1.com" target="_blank" rel="noopener noreferrer">
          Example Help 1
        </a>
      </Menu.Item>
      <Menu.Item key="2" onClick={closeDrawer}>
        <a href="https://example2.com" target="_blank" rel="noopener noreferrer">
          Example Help 2
        </a>
      </Menu.Item>
      <Menu.Item key="3" onClick={closeDrawer}>
        <a href="https://example3.com" target="_blank" rel="noopener noreferrer">
          Example Help 3
        </a>
      </Menu.Item>
    </Menu>
  );


  const hasAlerts = alerts && alerts.length > 0;

  return (
    <div className="navbar nav">
      <div className="navbar-logo">
        <a href='/'>
          <img src="/logo.png" alt="Logo" className="full-logo" />
          <img src="/logo-collapsed.png" alt="Logo" className="collapsed-logo" />
        </a>
      </div>
      <div className="navbar-links">
        <Dropdown overlay={helpMenu} trigger={['click']}>
          <Button type="text">Helps <DownOutlined /></Button>
        </Dropdown>
        {user && user.role === 0 && (
          <Button type="text" onClick={() => navigate('/create-user')}>
            <UserAddOutlined /> Create User
          </Button>
        )}
        <AlertComponent />
        <Dropdown overlay={userMenu} trigger={['click']}>
          <Button type="text" shape="round" icon={<UserOutlined />}>
            {user ? user.email : 'User'} <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <Badge dot={hasAlerts}>
        <Button className="menu-button" type="text" icon={<MenuOutlined />} onClick={showDrawer} />
      </Badge>
      <Drawer
        title="Menu"
        placement="right"
        closable={true}
        onClose={closeDrawer}
        visible={visible}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Dropdown overlay={helpMenu} trigger={['click']}>
            <Button type="text" block>Helps <DownOutlined /></Button>
          </Dropdown>
          {user && user.role === 0 && (
            <Button type="text" block onClick={() => { navigate('/create-user'); closeDrawer(); }}>
              <UserAddOutlined /> Create User
            </Button>
          )}
          <Divider />
          <Dropdown overlay={userMenu} trigger={['click']}>
            <Button type="text" block shape="round" icon={<UserOutlined />}>
              {user ? user.email : 'User'} <DownOutlined />
            </Button>
          </Dropdown>
          <AlertComponent />
        </Space>
      </Drawer>
    </div>
  );
};

export default Navbar;