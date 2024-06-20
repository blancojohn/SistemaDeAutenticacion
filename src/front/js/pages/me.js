import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import rigoImageUrl from "../../img/rigo-baby.jpg";



import { Context } from "../store/appContext";

export const Me = () => {
    const { store, actions } = useContext(Context);
    useEffect(()=>{
        if (store?.accessToken !== null) actions.routePrivateUser()
    }, [])

    return (
        <>
            {
                store.accessToken &&
                <>
                    <h1 className="d-flex justify-content-center">¡Estás en una ruta privada con Riggo!.</h1>
                    <div className="d-flex justify-content-center">
                        <img src={rigoImageUrl} />
                    </div>
                </>
            }
        </>
    );
};



