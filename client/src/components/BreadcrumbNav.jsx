import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

const BreadcrumbNav = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split('/').filter(i => i);
  const breadcrumbNameMap = {
    '/': 'Home',
    '/create-user': 'Create User',
    '/update-password': 'Update Password',
    '/create-session': 'Create Session',
    '/sessions/':'Sessions'
  };

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return {
      key: url,
      title: breadcrumbNameMap[url] || pathSnippets[index],
      link: <Link to={url}>{breadcrumbNameMap[url] || pathSnippets[index]}</Link>
    };
  });

  const breadcrumbItems = [
    {
      title: <Link to="/"><HomeOutlined/> Home</Link>,
    },
    ...extraBreadcrumbItems
  ];

  return (
    <Breadcrumb items={breadcrumbItems} style={{ margin: '16px 0' }} />
  );
};

export default BreadcrumbNav;