import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="text-center mt-5">
				<h1>
					Bienvenido a un sistema de autenticación con JWT. 
					Inicia sesión para acceder a una ruta privada.
					O regístrate y luego inicia sesión.
				</h1>
			</div>
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
			
