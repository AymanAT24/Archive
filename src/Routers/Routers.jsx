import { Suspense } from 'react';
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom';

import { authenticated, useAuth } from '@/context/Auth';
import {
  Home,
  Login,
  SignUp,
  ErrorPage,
  UpdatedFax,
  DetailsFax,
} from '@/pages';

function Protect({ children, protect = false, path = '', role = 'user' }) {
  const { user } = useAuth();
  const authed = authenticated();

  if (
    authed === protect &&
    (role === 'admin' || role === 'godAdmin' || role === 'manager') &&
    path === 'dash'
  ) {
    return children;
  }

  if (
    authed === protect &&
    role === 'user' &&
    authed !== true &&
    path !== 'login'
  )
    return <Navigate to={'/'} />;
  if (authed === protect && path !== 'dash') return children;
  return <Navigate to={protect ? '/auth/login' : '/'} />;
}
const Routers = () => {
  const allowed = useAuth().user;

  return (
    <div className="conatiner main-color">
      <Suspense fallback="جاري تحميل البايانات">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/update/:id" element={<UpdatedFax />} />
            <Route path="/Details/:id" element={<DetailsFax />} />

            {/*///////////////////////// auth ///////////////////////////////////////*/}

            <Route
              path="/auth/sign-up"
              element={
                // <Protect >
                <SignUp />
                // </Protect>
              }
            />
            <Route
              path="/auth/login"
              element={
                <Protect path="login">
                  <Login />
                </Protect>
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
};

export default Routers;
