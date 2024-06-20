import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<div className="ms-2">
					<span className="nav-link">Bienvenido {store?.user?.email}</span>
				</div>
				<div className="ms-auto">
					<Link to="/signup">
						<button className="btn btn-primary">Resgístrate</button>
					</Link>
				</div>
				<div className="ms-2">
					<Link to="/login">
						<button className="btn btn-primary">Inicia Sesión</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
