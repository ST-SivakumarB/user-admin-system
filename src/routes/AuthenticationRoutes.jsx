import { lazy } from 'react';
import Loadable from '../component/Loadable';
import { Navigate } from 'react-router-dom';

const LoginPage = Loadable(lazy(() => import('../pages/authentication/Login')));

const AuthenticationRoutes = {

  children: [
    {
    path: '/',
    element: <Navigate to="login" replace />
  },
    {
      path: 'login', 
      element: <LoginPage />
    }
  ]
};

export default AuthenticationRoutes;
