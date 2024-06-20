import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Context } from "../store/appContext";




export const Me = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {
        if (store?.accessToken !== null) actions.routePrivateUser()
    }, [])

    useEffect(() => {
        if (store?.accessToken === null) navigate('/')
    }, [])

    return (
        <>
            {

                store.accessToken &&
                <>
                    <h1 className="d-flex justify-content-center">¡{store?.user?.email} estás en una ruta privada con Riggo!</h1>
                    <div className="d-flex justify-content-center">
                        <img src={rigoImageUrl} />
                    </div>
                    <div className="w-50 mx-auto">
                        <Link to="/">
                            <button className="btn btn-primary w-100">Back home</button>
                        </Link>
                    </div>
                </>
            }
        </>
    );
};







