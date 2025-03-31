import React from "react";
import { Link } from "react-router-dom";
import { CallContactos } from "../hooks/contactos";
import { App } from "../hooks/users";



export const ListaContactos = () => {



    return (
        <div>
            <h1 className="text-center">lista de Tareas</h1>
            <ul>
                <App></App>
            </ul>
            <Link to="/">
                <button className="btn btn-primary m-3">Back home</button>
            </Link>
        </div>
    )

}