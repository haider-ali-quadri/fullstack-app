// src/utils/Nav.jsx
import routes from './config';
import './Nav.css';
import { Link } from 'react-router-dom';

function Nav() {
  const renderNavItem = (route) => {
    if (route.children) {
      return (
        <li className="nav-item dropdown" key={route.label}>
          <span className="nav-link">{route.label}</span>
          <ul className="dropdown-menu">
            {route.children.map((child) => (
              <li key={child.path}>
                <Link to={child.path} className="dropdown-item">
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      );
    }
    return (
      <li className="nav-item" key={route.path}>
        <Link to={route.path} className="nav-link">
          {route.label}
        </Link>
      </li>
    );
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="nav-logo">MyWebsite</Link>
      </div>
      <ul className="nav-links">
        {routes.map(renderNavItem)}
      </ul>
    </nav>
  );
}

export default Nav;
