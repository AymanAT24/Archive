import './header.scss';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className="header">
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav p-3 ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link
                  to={'/'}
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  الصفحة الرئيسية
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  to={'/users'}
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  المستخدمين
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
