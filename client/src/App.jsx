import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from './redux/actions/authActions';
import DashboardPage from './components/DashboardPage.jsx';
import LoginComponent from './components/LoginComponent.jsx';
import CreateUserComponent from './components/CreateUserComponent.jsx';
import UpdatePasswordComponent from './components/UpdatePasswordComponent.jsx';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import {jwtDecode} from 'jwt-decode';
import AlertComponent from './components/AlertComponent.jsx';
import NewSessionForm from './components/NewSessionForm.jsx';
import SessionDetailPage from './components/SessionDetailPage.jsx';
import EditSessionPage from './components/EditSessionPage.jsx';
import MainLayout from './components/MainLayout.jsx';
import SessionStageDetail from './components/SessionStageDetail.jsx';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        // Decode token to get user info and set in redux
        const user = jwtDecode(token);
        dispatch(loginSuccess(user, token, true));
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  }, [dispatch]);

  return (
    <Router>
      <MainLayout isAuthenticated={isAuthenticated}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginComponent />} />
          <Route
            path="/create-user"
            element={
              <AdminRoute>
                <CreateUserComponent />
              </AdminRoute>
            }
          />
          <Route
            path="/update-password"
            element={
              <PrivateRoute>
                <UpdatePasswordComponent />
              </PrivateRoute>
            }
          />
          <Route
              path="/create-session"
              element={
                <PrivateRoute>
                  <NewSessionForm />
                </PrivateRoute>
              }
            />
            <Route
            path="/sessions/:sessionId"
            element={
              <PrivateRoute>
                <SessionDetailPage />
              </PrivateRoute>
            }
          />
          <Route path="/edit-session/:sessionId" element={<PrivateRoute><EditSessionPage /></PrivateRoute>} />
          <Route path="/sessions/:sessionId/stages/:stage" element={<PrivateRoute><SessionStageDetail /></PrivateRoute>} />
          <Route
            path="/alerts"
            element={
              <PrivateRoute>
                <AlertComponent />
              </PrivateRoute>
            }
          />
          <Route
            path="/account-settings"
            element={
              <PrivateRoute>
                <UpdatePasswordComponent />
              </PrivateRoute>
            }
          />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default App;