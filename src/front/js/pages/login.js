import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <form className='w-50 mx-auto my-5' onSubmit={actions.handleSubmitLogin}>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>Email</label>
                    <input className='form-control' type='text' name='email' id='email' placeholder='Email' value={store.loginUser.email} onChange={actions.handleChangeLogin}></input>
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>Contraseña</label>
                    <input className='form-control' type='password' name='password' id='password' placeholder='Contraseña' value={store.loginUser.password} onChange={actions.handleChangeLogin}></input>
                </div>
                <button className='btn btn-primary w-100'>Inicia Sesión</button>
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

