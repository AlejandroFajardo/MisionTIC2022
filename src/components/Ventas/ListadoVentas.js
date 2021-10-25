import React from "react";
import Layout from "../Layout/Layout";

class ListadoVentas extends React.Component {
  state = {
    administrador: false,
  };

  componentDidMount() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const isAdmin = params.get("administrador");
    if (isAdmin === "false") {
      this.setState({ administrador: false });
    } else {
      this.setState({ administrador: true });
    }
  }

  render() {
    return (
      <Layout administrador={this.state.administrador}>Listado ventas</Layout>
    );
  }
}

export default ListadoVentas;
