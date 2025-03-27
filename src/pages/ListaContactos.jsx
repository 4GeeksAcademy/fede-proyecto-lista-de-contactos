import React from "react";
import { useState } from "react";

const CallContactos = () => {
    const [contactos, setContactos] = useState([]) // crea array vacio para ir agregando contactos(setContactos sera la funcion para actualizar contactos)
    const [newContact, setNewContact] = useState("") // newContact almacena el nuevo contacto que el usuario escribe(setNewContact es la funcion para actualizar el nueContact)

    const addContact = () => {
        if (newContact.trim() !== "") { //Aqui decimos que si newContac.trim(esto elimina espacios delante y detras) es diferente a vacio(es decir que hay algo escrito)
            setContactos([...contactos, newContact]) // decimos que la funcion setContacto va a tomar a contacos (esto se hace con  ...) y le agregaremos newContacto
            setNewContact(""); // luego setNewContacto limpiara a newContact dejando un string vacio ""
        }
    }

    const removeContact = (index) => {
        setContactos(contactos.filter((_, i) => i !== index));
    }

    const handleInputChange = (e) => { // esta funcion hace que te deje escribir en el input
        setNewContact(e.target.value);
      };


    return (
        <div>
            <div>
                <input type="text" className="form-contrl" placeholder="Nombre del contacto" value={newContact} onChange={handleInputChange} />
                <button className="bt btn-primary" onClick={addContact}>agregar</button>
            </div>
            <ul className="list-group">
                {contactos.map((contact, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {contact}
                        <button className="btn btn-danger btn-sm" onClick={() => removeContact(index)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>

    )
}

export { CallContactos };