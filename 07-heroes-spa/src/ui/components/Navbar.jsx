import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context';

const navLinkClass = 'nav-item nav-link';
const navLinkActiveClass = `${navLinkClass} active`;

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
      <Link className="navbar-brand" to="/">
        Asociaciones
      </Link>

      <div className="navbar-collapse">
        <div className="navbar-nav">
          <NavLink
            className={({ isActive }) =>
              isActive ? navLinkActiveClass : navLinkClass
            }
            to="/marvel"
          >
            Marvel
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? navLinkActiveClass : navLinkClass
            }
            to="/dc"
          >
            DC
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? navLinkActiveClass : navLinkClass
            }
            to="/search"
          >
            Search
          </NavLink>
        </div>
      </div>

      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
        <ul className="navbar-nav ml-auto">
          <span className="nav-item nav-link text-primary">{user?.name}</span>
          <button onClick={onLogout} className="nav-item nav-link btn" aria-label='logoutBtn'>
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};
