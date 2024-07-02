import { Menu, Dropdown, Button } from 'antd';
import { SettingOutlined, PoweroffOutlined, UserOutlined, DownOutlined, UserAddOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';
import './Navbar.css'; // Import the CSS file
import AlertComponent from './AlertComponent';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="0" onClick={() => navigate('/update-password')}>
        <SettingOutlined />
        {'  Update Password'}
      </Menu.Item>
      <Menu.Item key="1" onClick={handleLogout}>
        <PoweroffOutlined twoToneColor='red'/>
        {'  Log Out'}
      </Menu.Item>
    </Menu>
  );

  const helpMenu = (
    <Menu>
      <Menu.Item key="1">
        <a href="https://example1.com" target="_blank" rel="noopener noreferrer">
          Example Help 1
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="https://example2.com" target="_blank" rel="noopener noreferrer">
          Example Help 2
        </a>
      </Menu.Item>
      <Menu.Item key="3">
        <a href="https://example3.com" target="_blank" rel="noopener noreferrer">
          Example Help 3
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="navbar nav">
      <div className="navbar-logo">
        <a href='/'>
          <img src="/logo.png" alt="Logo" />
        </a>
      </div>
      <div className="navbar-links">
        <Dropdown overlay={helpMenu} trigger={['click']}>
          <Button type="text">Helps <DownOutlined /></Button>
        </Dropdown>
      </div>
      {user && user.role === 0 && (
        <Button type="text" onClick={() => navigate('/create-user')}>
          <UserAddOutlined /> Create User
        </Button>
      )}
      <div className="navbar-notification">
        <AlertComponent />
      </div>
      <div className="navbar-user">
        <Dropdown overlay={userMenu} trigger={['click']}>
          <Button type="text" shape="round" icon={<UserOutlined />}>
            {user ? user.email : 'User'} <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
