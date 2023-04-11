import { useAuthStore } from '../../hooks';

export const Navbar = () => {
  const { user, startLogout } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt me-2"></i>
        {user.name}
      </span>
      <button className="btn btn-outline-danger" onClick={startLogout}>
        <i className="fas fa-sign-out me-2"></i>
        &nbsp; Signout
      </button>
    </div>
  );
};
