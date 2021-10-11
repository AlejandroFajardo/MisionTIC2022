import Layout from "../Layout/Layout";
import {getServicios} from "../../services/Firebase/FirebaseService";

const ListadoServicios = () => {
    return (
        <>
            <Layout>
                Listado servicios
            </Layout>
        </>
    )
}

getServicios();

export default ListadoServicios;