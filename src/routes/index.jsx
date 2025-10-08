import { createBrowserRouter } from 'react-router-dom';

// routes
import AuthenticationRoutes from './AuthenticationRoutes';
// import MainRoutes from './MainRoutes'; skkk

// ==============================|| ROUTING RENDER ||============================== //

const router = createBrowserRouter([ AuthenticationRoutes], {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
