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

import Layout from "../Layout/Layout";
import { getVenta, getVentas } from "../../services/Firebase/FirebaseService";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import firebase from "firebase/app";

class ListadoVentas extends React.Component {
  state = {
    modalActualizar: false,
    modalEditar: false,
    ListaVentas: [],
    terminoBusqueda: null,
    form: {
      id: "",
      Nombre: "",
      Documento: "",
      Vendedor: "",
      Cantidad: "",
      ValorTotal: "",
    },
    administrador: false,
  };
  inputBusqueda = React.createRef();

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const isAdmin = params.get("administrador");
    if (isAdmin === "false") {
      this.setState({ administrador: false });
    } else {
      this.setState({ administrador: true });
    }
    this.loadVentas();
  }

  async loadVentas() {
    this.setState({ ListaVentas: await getVentas() });
  }

  filtro = (venta) => {
    let value = this.state.terminoBusqueda;
    if (value) {
      value = value.toLowerCase();
      return (
        (venta.id && venta.id.toString().includes(value)) ||
        (venta.Nombre && venta.Nombre.toLowerCase().includes(value)) ||
        (venta.Documento && venta.Documento.toLowerCase().includes(value))
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
    firebase.child(`ventas/${this.state.id}`).set(this.state.form, (error) => {
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

  seleccionarVenta = async (venta) => {
    await this.setState({ form: venta });
    this.setState({ modalActualizar: true });
    console.log(venta.id);
  };

  render() {
    return (
      <>
        <Layout administrador={this.state.administrador}>
          <Container>
            <div className="container p-4">
              <h2>
                <center>Lista de Ventas</center>
              </h2>
              <NavLink to={"/ventas/crear"}>Crear venta</NavLink>
              <div className="row">
                <div className="col-md-6">
                  <form id="buscar-form" onSubmit={this.actualizarFiltro}>
                    <div className="form-group">
                      <label>Filtro de búsqueda: </label>
                      <input
                        type="text"
                        id="id-venta"
                        className="form-control"
                        placeholder="Ingrese ID de la venta o nombre del cliente"
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

            <table>
              <thead>
                <tr>
                  <th>ID venta</th>
                  <th>Nombre completo del cliente</th>
                  <th>Documento del cliente</th>
                  <th>Nombre del Vendedor</th>
                  <th>Cantidad</th>
                  <th>Valor Facturado</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {this.state.ListaVentas.filter(this.filtro).map((venta) => (
                  <tr key={venta.Id}>
                    <td>{venta.Id}</td>
                    <td>{venta.Nombre}</td>
                    <td>{venta.Documento}</td>
                    <td>{venta.Vendedor}</td>
                    <td>{venta.Cantidad}</td>
                    <td>{venta.ValorTotal}</td>

                    <td>
                      <Button
                        color="primary"
                        onClick={() => this.mostrarModalActualizar(venta)}
                      >
                        Editar
                      </Button>{" "}
                      <Button
                        color="danger"
                        onClick={() => this.eliminar(venta)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                <label>Nombre:</label>
                <input
                  className="form-control"
                  name="Nombre"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form && this.state.form.Nombre}
                />
              </FormGroup>

              <FormGroup>
                <label>Documento:</label>
                <input
                  className="form-control"
                  name="Documento"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form && this.state.form.Documento}
                />
              </FormGroup>

              <FormGroup>
                <label>Vendedor:</label>
                <input
                  className="form-control"
                  name="Vendedor"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form && this.state.form.Vendedor}
                />
              </FormGroup>

              <FormGroup>
                <label>Cantidad:</label>
                <input
                  className="form-control"
                  name="Vendedor"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form && this.state.form.Cantidad}
                />
              </FormGroup>

              <FormGroup>
                <label>ValorTotal:</label>
                <input
                  className="form-control"
                  name="Vendedor"
                  type="text"
                  onChange={this.handleChange}
                  value={this.state.form && this.state.form.Cantidad}
                />
              </FormGroup>
            </ModalBody>

            <ModalFooter>
              <Button
                color="primary"
                onClick={() => this.editar(this.state.form)}
              >
                Aceptar
              </Button>
              <Button
                color="danger"
                onClick={() => this.cerrarModalActualizar()}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
        </Layout>
      </>
    );
  }
}
export default ListadoVentas;

/*<footer className="my-2 pt-2 text-muted text-center text-small">
  <ul className="list-inline">
    <li className="list-inline-item">
      <a href="https://www.google.com.co/">Ir al listado</a>
    </li>
  </ul>
  <p className="mb-1">&copy; 2017–2021 PDT</p>
  <ul className="list-inline">
    <li className="list-inline-item">
      <a href="https://www.google.com.co/">Privacy</a>
    </li>
    <li className="list-inline-item">
      <a href="https://www.google.com.co/">Terms</a>
    </li>
    <li className="list-inline-item">
      <a href="https://www.google.com.co/">Support</a>
    </li>
  </ul>
</footer>;*/
