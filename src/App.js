import "./App.css";
import { Route, Switch } from "react-router-dom";
import ListadoServicios from "./components/Servicios/ListadoServicios";
import ListadoVentas from "./components/Ventas/ListadoVentas";
import Login from "./components/Login/Login";
import CrearServicio from "./components/Servicios/CrearServicio";
import EditarServicio from "./components/Servicios/EditarServicio";
import CrearVenta from "./components/Ventas/CrearVenta";
import EditarVenta from "./components/Ventas/EditarVenta";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ListadoEdicionUsuarios from "./components/Usuarios/ListadoEdicionUsuarios";

function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/servicios/editar/:service" component={EditarServicio} />
        <Route path="/servicios/crear" component={CrearServicio} />
        <Route path="/servicios" component={ListadoServicios} />
        <Route path="/ventas/editar/:service" component={EditarVenta} />
        <Route path="/ventas/crear" component={CrearVenta} />
        <Route path="/ventas" component={ListadoVentas} />
        <Route path="/usuarios/listado" component={ListadoEdicionUsuarios} />
        <Route path="/error" component={PageNotFound} />
        <Route path="" component={Login} />
      </Switch>
    </>
  );
}

export default App;
