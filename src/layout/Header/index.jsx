import './header.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token); // Check if the user is logged in
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Remove the token from local storage
    setIsLoggedIn(false); // Update the state to reflect the logout
    navigate('/auth/login'); // Redirect to the login page
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
            </ul>
            {isLoggedIn && (
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
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
