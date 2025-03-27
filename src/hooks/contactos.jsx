import React from "react";
import { CallContactos} from "../hooks/contactos";




export const ListaContatos = () => {

    

	return (
        <div>
            <h1>lista de contactos</h1>
            <ul>
                <li>maria</li>
                <li>pepe</li>
                <li>juan</li>
                <CallContactos></CallContactos>
            </ul>
        </div>
    )

}