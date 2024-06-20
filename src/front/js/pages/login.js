import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context)
    if (!!store.user) return <Navigate to="/private" replace />

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container">
                    <div className="ms-auto">
                        <Link to="/signup">
                            <button className="btn btn-primary">Resgístrate</button>
                        </Link>
                    </div>
                </div>
            </nav >

            <h1 className="d-flex justify-content-center">Iniciar sesión</h1>
            <form className='w-50 mx-auto my-5' onSubmit={actions.handleSubmitLogin}>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input className='form-control' type='text' name='email' id='email' placeholder='Email' value={store.loginUser.email} onChange={actions.handleChangeLogin}></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>Contraseña</label>
                    <input className='form-control' type='password' name='password' id='password' placeholder='Contraseña' value={store.loginUser.password} onChange={actions.handleChangeLogin}></input>
                </div>
                <button className='btn btn-primary w-100'>Iniciar Sesión</button>
            </form>
            <div className="w-50 mx-auto">
                <Link to="/">
                    <button className="btn btn-primary w-100">Back home</button>
                </Link>
            </div>
            <br />
            <br />
            <br />
        </>
    );
};

