import "../../assets/css/navbar-top-fixed.css";
import { Menu, MenuAdministrador } from "../Menu/Menu";

const Layout = ({ children, administrador }) => {
  return (
    <>
      <Menu admin={administrador} />

      <main className="container">
        <div className="bg-light p-5 rounded">{children}</div>
      </main>
      <footer className="my-2 pt-2 text-muted text-center text-small">
        <p className="mb-1">&copy; 2017–2021 PDT</p>
        {/*<ul className="list-inline">
                    <li className="list-inline-item">
                        <a href="https://www.google.com.co/">Privacy</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://www.google.com.co/">Terms</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://www.google.com.co/">Support</a>
                    </li>
                </ul>*/}
      </footer>
    </>
  );
};

const LayoutAdministrador = ({ children }) => {
  return (
    <>
      <MenuAdministrador />

      <main className="container">
        <div className="bg-light p-5 rounded">{children}</div>
      </main>
      <footer className="my-2 pt-2 text-muted text-center text-small">
        <p className="mb-1">&copy; 2017–2021 PDT</p>
        {/*<ul className="list-inline">
                    <li className="list-inline-item">
                        <a href="https://www.google.com.co/">Privacy</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://www.google.com.co/">Terms</a>
                    </li>
                    <li className="list-inline-item">
                        <a href="https://www.google.com.co/">Support</a>
                    </li>
                </ul>*/}
      </footer>
    </>
  );
};

export default Layout;
export { Layout, LayoutAdministrador };
