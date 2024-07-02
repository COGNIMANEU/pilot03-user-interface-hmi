import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (isAuthenticated && user.role === 0) {
    return children;
  }
  return <Navigate to="/" />;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};


export default AdminRoute;