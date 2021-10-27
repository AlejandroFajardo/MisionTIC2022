import React from "react";

import Layout from "../Layout/Layout";
import {getServicios} from "../../services/Firebase/FirebaseService";
import {Container} from "reactstrap";

class CrearVenta extends React.Component {
    state = {
        servicios: [],
        listaServicios: [],
        cantidad: 0,
        valorTotal: 0,
        form: {
            nombre: '',
            documento: '',
            fecha: '',
            vendedor: ''
        },
        formServicio: {
            servicio: '',
            cantidad: 0
        },
        administrador: false,
    };

    componentDidMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const isAdmin = params.get("administrador");
        if (isAdmin === "false") {
            this.setState({administrador: false});
        } else {
            this.setState({administrador: true});
        }
        this.loadServicios();
    }

    async loadServicios() {
        this.setState({servicios: await getServicios()});
    }

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleChange2 = (e) => {
        this.setState({
            formServicio: {
                ...this.state.formServicio,
                [e.target.name]: e.target.value,
            },
        });
    };

    render() {
        const options = []

        let i = 0;
        this.state.servicios.forEach((servicio) => {
            options.push(<option key={i} value={servicio.servicio}>{servicio.servicio}</option>)
            i++;
        });

        return (
            <>
                <Layout administrador={this.state.administrador}>
                    <Container>
                        <form className="needs-validation" novalidate>
                            <main>
                                <div className="py-5 text-center">
                                    <h2>Registro de ventas</h2>
                                    <p className="lead">ingrese los datos para gestionar una venta </p>
                                </div>

                                <div className="row g-5">
                                    <div className="col-md-5 col-lg-4 order-md-last">
                                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                                            <span className="text-secondary">Resumen de la venta</span>
                                        </h4>
                                        <br/>

                                        <ul className="list-group mb-3">
                                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                                <div>
                                                    <h6 className="my-0">Cantidad</h6>

                                                </div>
                                                <span id="txtCantidadServicios"
                                                      className="text-muted">{this.state.cantidad}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                                <div>
                                                    <h6 className="my-0">Valor total</h6>

                                                </div>
                                                <span id="txtTotalVenta"
                                                      className="text-muted">${this.state.valorTotal}</span>
                                            </li>
                                        </ul>

                                    </div>
                                    <div className="col-md-7- col-lg-8">
                                        <h4 className="mb-3">Datos del cliente</h4>
                                        <div className="row g-2">
                                            <div className="col-sm-6">
                                                <label for="NombreCliente" className="form-label">Nombre completo del
                                                    cliente</label>
                                                <input type="text" className="form-control" id="NombreCliente"
                                                       placeholder="" name="nombre" value={this.state.form.nombre}
                                                       onChange={this.handleChange} required/>
                                                <div className="invalid-feedback">
                                                    Debe ingresar un nombre
                                                </div>
                                            </div>

                                            <div className="col-sm-6">
                                                <label for="Documento" className="form-label">Documento del
                                                    cliente</label>
                                                <input type="text" className="form-control" id="Documento"
                                                       placeholder=""
                                                       value={this.state.form.documento} name="documento"
                                                       onChange={this.handleChange} required/>
                                                <div className="invalid-feedback">
                                                    Debe ingresar el documento del cliente
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <label for="Fecha" className="form-label">Fecha</label>
                                                <input type="date" className="form-control" id="Fecha"
                                                       value={this.state.form.fecha} name="fecha"
                                                       onChange={this.handleChange}/>
                                                <div className="invalid-feedback">
                                                    Por favor ingrese una fecha válida
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <label for="NombreVendedor">Nombre del Vendedor</label>
                                                <select className="form-control" id="NombreVendedor"
                                                        value={this.state.form.vendedor} name="vendedor"
                                                        onChange={this.handleChange}>
                                                    <option>Isabel</option>
                                                    <option>Sergio</option>
                                                    <option>Rusbell</option>
                                                    <option>Andres</option>
                                                    <option>Alejandro</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>

                            <br/>

                            <button id="btnServicios" type="button" className="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#ModalServicios">Adicionar servicios
                            </button>

                            <div className="col-12">
                                <br/>
                                <table id="Servicios" className="table">
                                    <thead className="thead-secondary">
                                    <tr className="text-c">
                                        <th scope="col">ID servicio</th>
                                        <th scope="col">Servicio</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Valor unitario</th>
                                        <th scope="col">Valor total</th>
                                        <th scope="col">Editar</th>
                                        <th scope="col">Borrar</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>

                            <hr className="my-4"/>

                            <button id="btnAgregarVenta" className="w-100 btn btn-primary btn-lg" type="submit">Agregar
                                nueva venta
                            </button>
                        </form>
                    </Container>

                    <div className="modal fade" id="ModalServicios" tabindex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel"
                         aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="tituloModal">Agregar servicio</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form id="FormNuevoServicio">
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <label for="Servicio" className="col-form-label">Servicio:</label>
                                            <select id="Servicio" className="form-control"
                                                    value={this.state.formServicio.servicio} name="servicio"
                                                    onChange={this.handleChange2}>
                                                {options}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label for="Cantidad" className="col-form-label">Cantidad:</label>
                                            <input type="number" className="form-control" id="Cantidad"
                                                   value={this.state.formServicio.cantidad} name="cantidad"
                                                   onChange={this.handleChange2}/>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar
                                        </button>
                                        <button id="btnGuardarServicio" type="submit"
                                                className="btn btn-primary">Guardar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Layout>
            </>
        )
    }
}

export default CrearVenta;