import React from "react";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Label,
  Input,
} from "reactstrap";
import { LayoutAdministrador } from "../Layout/Layout";
import {
  getUsuarios,
  updateUsuario,
} from "../../services/Firebase/FirebaseUsuers";
import "bootstrap/dist/css/bootstrap.css";

class ListadoEdicionUsuarios extends React.Component {
  state = {
    modalActualizar: false,
    ListaUsuarios: [],
    form: {
      Rol: "",
      Estado: "",
      user: "",
    },
    id: 0,
    edit: false,
  };

  componentDidMount() {
    this.loadUsuarios();
  }

  async loadUsuarios() {
    this.setState({ ListaUsuarios: await getUsuarios() }, () => {
      if (this.state.edit) {
        this.setState({ edit: false });
        alert("Se edito correctamente");
      }
    });
  }

  mostrarModalActualizar = (idUser) => {
    this.setState({ modalActualizar: !this.state.modalActualizar });
    this.state.id = idUser;
    this.state.ListaUsuarios.forEach((user) => {
      if (user.id === idUser) {
        this.state.form.Rol = user.data().role;
        this.state.form.Estado = user.data().state;
      }
    });
    console.log(this.state.administrador);
  };

  peticionPut = async (usuario) => {
    this.setState({ edit: true });
    this.setState({ modalActualizar: false });
    console.log(
      usuario.data().password,
      this.state.form.Rol,
      this.state.form.Estado,
      usuario.data().user
    );
    updateUsuario(this.state.id, {
      password: usuario.data().password,
      role: this.state.form.Rol,
      state: this.state.form.Estado,
      user: usuario.data().user,
    });
    await this.loadUsuarios();
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <LayoutAdministrador>
        <Container>
          <Container className="container p-4">
            <h2>
              <center>Lista de Usuarios</center>
            </h2>
          </Container>

          <Table>
            <thead>
              <tr>
                <th>ID usuario</th>
                <th>usuario</th>
                <th>Rol</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {this.state.ListaUsuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.data().user}</td>
                  <td>{usuario.data().role}</td>
                  <td>{usuario.data().state}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(usuario.id)}
                    >
                      Editar
                    </Button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <Container>
              <h3>Editar Usuario</h3>
            </Container>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <Label>Id:</Label>

              <Input
                className="form-control"
                readOnly
                type="text"
                value={this.state.id}
              />
            </FormGroup>

            <FormGroup>
              <Label>Rol:</Label>
              <Input
                type="select"
                className="form-control"
                name="Rol"
                onChange={this.handleChange}
                value={this.state.form.Rol}
              >
                <option value="Vendedor">Vendedor</option>
                <option value="Administrador">Administrador</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label>Estado:</Label>
              <Input
                type="select"
                className="form-control"
                name="Estado"
                onChange={this.handleChange}
                value={this.state.form.Estado}
              >
                <option value="Inactivo">Inactivo</option>
                <option value="Activo">Activo</option>
              </Input>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() =>
                this.peticionPut(
                  this.state.ListaUsuarios.find(
                    (usuario) => usuario.id === this.state.id
                  )
                )
              }
            >
              Aceptar
            </Button>
            <Button
              color="danger"
              onClick={() => this.mostrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </LayoutAdministrador>
    );
  }
}

export default ListadoEdicionUsuarios;
