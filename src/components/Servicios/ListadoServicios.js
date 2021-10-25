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
} from "reactstrap";
import { LayoutAdministrador } from "../Layout/Layout";
import { getServicios } from "../../services/Firebase/FirebaseService";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import firebase from "firebase/app";

class ListadoServicios extends React.Component {
  state = {
    modalActualizar: false,
    modalEditar: false,
    ListaServicios: [],
    terminoBusqueda: null,
    form: {
      id: "",
      Descripcion: "",
      ValorUnitario: "",
      Estado: "",
    },
  };
  inputBusqueda = React.createRef();

  componentDidMount() {
    this.loadServicios();
  }

  async loadServicios() {
    this.setState({ ListaServicios: await getServicios() });
  }

  filtro = (servicio) => {
    let value = this.state.terminoBusqueda;
    if (value) {
      value = value.toLowerCase();
      return (
        (servicio.id && servicio.id.toString().includes(value)) ||
        (servicio.Descripcion &&
          servicio.Descripcion.toLowerCase().includes(value)) ||
        (servicio.Servicio && servicio.Servicio.toLowerCase().includes(value))
      );
    }

    return true;
  };

  actualizarFiltro = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      terminoBusqueda: this.inputBusqueda.current.value,
    });
  };

  mostrarModalActualizar = () => {
    this.setState({ modalActualizar: !this.state.modalActualizar });
  };

  peticionPut = () => {
    alert("hola");
    firebase
      .child(`servicios/${this.state.id}`)
      .set(this.state.form, (error) => {
        if (error) console.log(error);
      });
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
    console.log(this.state.form);
  };

  seleccionarServicio = async (servicio) => {
    await this.setState({ form: servicio });
    console.log(servicio.id);
  };

  render() {
    return (
      <LayoutAdministrador>
        <Container>
          <div className="container p-4">
            <h2>
              <center>Lista de Servicios</center>
            </h2>
            <NavLink to={"/servicios/crear"}>Crear servicio</NavLink>
            <div className="row">
              <div className="col-md-6">
                <form id="buscar-form" onSubmit={this.actualizarFiltro}>
                  <div className="form-group">
                    <label>Filtro de búsqueda: </label>
                    <input
                      type="text"
                      id="id-servicio"
                      className="form-control"
                      placeholder="Ingrese ID del servicio o descripción"
                      autoFocus
                      ref={this.inputBusqueda}
                    />
                  </div>
                  <button
                    onClick={this.actualizarFiltro}
                    type="button"
                    className="btn  btn-primary"
                    id="btn-buscar"
                  >
                    Buscar
                  </button>
                </form>
              </div>
            </div>
          </div>

          <Table>
            <thead>
              <tr>
                <th>ID servicio</th>
                <th>Servicio</th>
                <th>Descripcion</th>
                <th>Valor Unitario</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.ListaServicios.filter(this.filtro).map((servicio) => (
                <tr key={servicio.id}>
                  <td>{servicio.id}</td>
                  <td>{servicio.Servicio}</td>
                  <td>{servicio.Descripcion}</td>
                  <td>{servicio.ValorUnitario}</td>
                  <td>{servicio.Estado}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.seleccionarServicio(servicio)}
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      color="danger"
                      onClick={() => this.eliminar(servicio)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form && this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>Descripción:</label>
              <input
                className="form-control"
                name="Descripción"
                type="text"
                onChange={this.handleChange}
                value={this.state.form && this.state.form.Descripcion}
              />
            </FormGroup>

            <FormGroup>
              <label>ValorUnitario:</label>
              <input
                className="form-control"
                name="ValorUnitario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form && this.state.form.ValorUnitario}
              />
            </FormGroup>

            <FormGroup>
              <label>Estado:</label>
              <select className="form-control" id="Status">
                <option>Disponible</option>
                <option>No disponible</option>
              </select>
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.peticionPut(this.state.form)}
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

export default ListadoServicios;
