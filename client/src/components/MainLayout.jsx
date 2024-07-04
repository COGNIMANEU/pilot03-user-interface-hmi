import { Layout } from 'antd';
import CustomFooter from './CustomFooter';
import Navbar from './Navbar'; // Assuming you have a Navbar component
import './MainLayout.css'
const { Content } = Layout;

// eslint-disable-next-line react/prop-types
const MainLayout = ({  children, isAuthenticated }) => {
  return (
    <Layout>
      {isAuthenticated && <Navbar />}
      <Content className="main-content">
        {children}
      </Content>
      <CustomFooter />
    </Layout>
  );
};

export default MainLayout;