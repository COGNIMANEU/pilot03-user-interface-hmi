import { Layout, Row, Col, Divider } from 'antd';
import { Link } from 'react-router-dom';
import logo from '/footer_logo.png'; // Update the path to your logo
import './Footer.css';

const { Footer } = Layout;

const CustomFooter = () => {
  return (
    <Footer style={{ textAlign: 'center', padding: '20px 50px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <img src={logo} alt="Logo" style={{ width: '150px' }} />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <h4>Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/terms-and-conditions">Terms and Conditions</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <h4>Quick Access</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <h4>&copy; 2024 COGNIMAN</h4>
          <Divider />
          <p>All rights reserved.</p>
        </Col>
      </Row>
    </Footer>
  );
};

export default CustomFooter;