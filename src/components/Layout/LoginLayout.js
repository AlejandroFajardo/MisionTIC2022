import "bootstrap/dist/css/bootstrap.css";
import logo from "../../assets/images/logo.png";
const LoginLayout = ({ children }) => {
  return (
    <>
      <main className="container">
        <div className="bg-light p-5 rounded">
          <div className="text-center mb-4">
            <img src={logo} width="72" alt="Logo PDT (Pro Delevopers Team)" />
            <h1 className="h3 mb-3 font-weight-normal">Iniciar sesión</h1>
            <p>Bienvenido</p>
            <p>Ingrese sus datos de usuario para acceder al portal de ventas</p>
          </div>
          {children}
        </div>
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

export default LoginLayout;
