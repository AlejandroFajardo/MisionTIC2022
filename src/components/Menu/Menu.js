import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";

const Menu = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} width="40" alt="Logo PDT (Pro Delevopers Team)" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <NavLink
                  to="/ventas"
                  className="nav-link"
                  activeClassName="active"
                >
                  Ventas
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

const MenuAdministrador = () => {
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} width="40" alt="Logo PDT (Pro Delevopers Team)" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <NavLink
                  to="/servicios"
                  className="nav-link"
                  activeClassName="active"
                >
                  Servicios
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/ventas"
                  className="nav-link"
                  activeClassName="active"
                >
                  Ventas
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/usuarios/listado"
                  className="nav-link"
                  activeClassName="active"
                >
                  Usuarios
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export { MenuAdministrador, Menu };
