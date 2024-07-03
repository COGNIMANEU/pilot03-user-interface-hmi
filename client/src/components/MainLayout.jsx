import { Layout } from 'antd';
import CustomFooter from './CustomFooter';
import Navbar from './Navbar'; // Assuming you have a Navbar component

const { Content } = Layout;

// eslint-disable-next-line react/prop-types
const MainLayout = ({  children, isAuthenticated }) => {
  return (
    <Layout>
      {isAuthenticated && <Navbar />}
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        {children}
      </Content>
      <CustomFooter />
    </Layout>
  );
};

export default MainLayout;