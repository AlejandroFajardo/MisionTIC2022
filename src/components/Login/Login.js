import React from "react";
import LoginLayout from "../Layout/LoginLayout";
import GoogleLogin from "react-google-login";
import {
  Button,
  Container,
  FormGroup,
  Form,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import {
  getUsuarios,
  addUsuario,
  addUsuarioCorreo,
} from "../../services/Firebase/FirebaseService";
import "bootstrap/dist/css/bootstrap.css";

class Login extends React.Component {
  state = {
    ListaUsuarios: [],
    exist: false,
    Email: "",
    Password: "",
  };

  componentDidMount() {
    this.loadUsuarios();
  }

  async loadUsuarios() {
    this.setState({ ListaUsuarios: await getUsuarios() });
  }

  responseGoogle = async (response) => {
    let userid = response.profileObj.googleId;
    let userRole = "";
    let userStatus = "";
    this.state.ListaUsuarios.forEach((user) => {
      if (user.id === userid) {
        this.state.exist = true;
        userStatus = user.data().state;
        userRole = user.data().role;
      }
    });
    if (!this.state.exist) {
      await addUsuario(
        response.profileObj.email,
        response.profileObj.googleId,
        " ",
        "Inactivo"
      );
      alert(
        "Usuario no existente, Se agrego el usuario ",
        response.profileObj.googleId
      );
      this.loadUsuarios();
    } else {
      if (!userStatus === "Inactivo") {
        alert("Correcto");
        window.location.href = "/usuarios/listado";
      } else {
        alert("Usuario inactivo");
      }
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleClick = async () => {
    console.log(this.state.Email);
    console.log(this.state.Password);
    let userRole = "";
    let userStatus = "";
    let password = "";
    this.state.ListaUsuarios.forEach((user) => {
      console.log(user.data().user);
      if (user.data().user === this.state.Email) {
        this.state.exist = true;
        userStatus = user.data().state;
        userRole = user.data().role;
        password = user.data().password;
      }
    });
    console.log(this.state.exist);
    if (!this.state.exist) {
      await addUsuarioCorreo(
        this.state.Email,
        this.state.Password,
        " ",
        "Inactivo"
      );
      alert("Usuario no existente, Se agrego el usuario ", this.state.Email);
      // this.loadUsuarios();
    } else {
      console.log(userStatus);
      if (userStatus === "Activo") {
        alert("Correcto");
        if (this.state.Password === password) {
          alert("error de contra");
        }
        window.location.href = "/usuarios/listado";
      } else {
        alert("Usuario inactivo");
      }
    }
  };

  render() {
    return (
      <LoginLayout>
        <Container>
          <Form id="signInForm">
            <Row>
              <FormGroup>
                <Input
                  type="email"
                  name="Email"
                  className="form-control"
                  placeholder="Email"
                  required
                  onChange={this.handleChange}
                />
                <Label for="email">Email</Label>
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="Password"
                  className="form-control"
                  placeholder="Contraseña"
                  onChange={this.handleChange}
                  required
                />
                <Label for="password">Costraseña</Label>
              </FormGroup>
            </Row>
            <Row xs="5">
              <Col></Col>
              <Col className="text-center">
                <Button
                  color="primary"
                  id="signInBtn"
                  sm={6}
                  onClick={this.handleClick}
                >
                  Acceder
                </Button>
              </Col>
              <Col className="text-center">
                <Label className="bx-5"> Ó </Label>
              </Col>
              <Col className="text-center">
                <GoogleLogin
                  clientId="1018603559623-60vtbnt0ugvgmjniqvdtms61v1753etl.apps.googleusercontent.com"
                  buttonText="Iniciar con Google"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </Col>
            </Row>
          </Form>
        </Container>
      </LoginLayout>
    );
  }
}

export default Login;
