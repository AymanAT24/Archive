import './header.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from '@/api/axios';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);

    const fetchUserRole = async () => {
      try {
        const response = await axios.get('user/myProfile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserRole(response.data.data.role);
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      }
    };

    if (token) {
      fetchUserRole();
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('userToken');

    try {
      await fetch('user/logout', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem('userToken');
      setIsLoggedIn(false);
      toast.success('تم تسجيل الخروج بنجاح');
      navigate('/auth/login');
      window.location.reload();
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg bg-body-dark">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav p-3 ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to={'/'}
                  className={`nav-link ${
                    location.pathname === '/' ? 'active-page' : ''
                  } text-light fw-bolder`}
                  aria-current="page"
                >
                  الصفحة الرئيسية
                </Link>
              </li>

              {userRole !== 'user' && (
                <li className="nav-item">
                  <Link
                    to={'/users'}
                    className={`nav-link ${
                      location.pathname === '/users' ? 'active-page' : ''
                    } text-light fw-bolder`}
                    aria-current="page"
                  >
                    المستخدمين
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link
                  to={'/features'}
                  className={`nav-link ${
                    location.pathname === '/features' ? 'active-page' : ''
                  } text-light fw-bolder`}
                  aria-current="page"
                >
                  اضافة خصائص
                </Link>
              </li>
            </ul>
            {isLoggedIn ? (
              <ul className="navbar-nav p-3 mb-2 mb-lg-0">
                <li className="nav-item ms-auto">
                  <button
                    className="nav-link active text-light fw-bolder btn btn-logout"
                    onClick={handleLogout}
                  >
                    تسجيل الخروج
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav p-3 mb-2 mb-lg-0">
                <li className="nav-item ms-auto">
                  <Link to={'/auth/login'}>
                    <button className="nav-link active text-light fw-bolder btn btn-logout">
                      تسجيل الدخول
                    </button>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
