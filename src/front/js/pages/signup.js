import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<form className='w-50 mx-auto my-5'>
				<div className='mb-3'>
					<label htmlFor='email' className='form-label'>Email</label>
					<input className='form-control' type='text' name='email' id='email' placeholder='Email'></input>
				</div>
				<div className='mb-3'>
					<label htmlFor='password' className='form-label'>Contraseña</label>
					<input className='form-control' type='password' name='password' id='password' placeholder='Contraseña'></input>
				</div>
				<button className='btn btn-primary w-100'>Registrarse</button>
			</form>
			<div className="w-50 mx-auto">
				<Link to="/">
					<button className="btn btn-primary w-100">Back home</button>
				</Link>
			</div>
			<br />
			<br />
			<br />

			{/* CÓDIGO QUE TRAE EL BOILERTPLATE */}
			{/* <div className="container">
				<ul className="list-group">
					{store.demo.map((item, index) => {
						return (
							<li
								key={index}
								className="list-group-item d-flex justify-content-between"
								style={{ background: item.background }}>
								<Link to={"/single/" + index}>
									<span>Link to: {item.title}</span>
								</Link>
								{// Conditional render example
									// Check to see if the background is orange, if so, display the message
									item.background === "orange" ? (
										<p style={{ color: item.initial }}>
											Check store/flux.js scroll to the actions to see the code
										</p>
									) : null}
								<button className="btn btn-success" onClick={() => actions.changeColor(index, "orange")}>
									Change Color
								</button>
							</li>
						);
					})}
				</ul>
				<br />
			</div> */}
		</>
	);
};

