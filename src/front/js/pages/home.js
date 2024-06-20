import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar";


export const Home = () => {
	const { store, actions } = useContext(Context)

	return (
		<>
			<Navbar />
			{
				(store.accessToken) ? (
					<>
						<div className="d-flex justify-content-center">
							<h1>{store?.user?.email} es un usuario de JWT autenticado</h1>
						</div>
					</>
				) : (
					<div className="text-center mt-5">
						<h1>
							Bienvenido a un sistema de autenticación con JWT.
							Inicia sesión para acceder a una ruta privada.
							O regístrate y luego inicia sesión.
						</h1>
					</div>
				)
			}
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	);
};


