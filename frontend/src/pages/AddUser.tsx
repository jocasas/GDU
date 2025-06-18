import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './form.css'
import { createUser } from '../services/userService'

export default function AddUser() {
    const navigate = useNavigate()

    const [rut, setRut] = useState('')
    const [nombre, setName] = useState('')
    const [fechaNacimiento, setBirthdate] = useState('')
    const [cantidadHijos, setChildren] = useState(0)
    const [correos, setEmail] = useState('')
    const [telefonos, setPhones] = useState([''])
    const [direcciones, setAddresses] = useState([''])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Aquí después mandamos a la API
        const newUser = {
            rut,
            nombre,
            fechaNacimiento,
            cantidadHijos,
            correos,
            telefonos,
            direcciones
        };

        try {
            await createUser(newUser); // tu función que hace el POST a la API
            alert('Usuario agregado exitosamente');
            navigate('/');
        } catch (error) {
            console.error('Error al agregar usuario:', error);
            alert('Error al agregar usuario');
        }
    }

    return (
        <div>
            <h1>Agregar Usuario</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    RUT:
                    <input name="rut" type="text" value={rut} onChange={(e) => setRut(e.target.value)} required />
                </label>
                <label>
                    Nombre:
                    <input name="nombre" type="text" value={nombre} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Fecha de nacimiento:
                    <input name="fechaNacimiento" type="date" value={fechaNacimiento} onChange={(e) => setBirthdate(e.target.value)} required />
                </label>
                <label>
                    Cantidad de hijos:
                    <input name="cantidadHijos" type="number" value={cantidadHijos} onChange={(e) => setChildren(Number(e.target.value))} min={0} required />

                </label>
                <label>
                    Correo electrónico:
                    <input name="correos" type="correos" value={correos} onChange={(e) => setEmail(e.target.value)} required />
                </label>

                <div>
                    <p>Teléfonos:</p>
                    {telefonos.map((phone, i) => (
                        <input
                            key={i}
                            type="text"
                            value={phone}
                            onChange={(e) => {
                                const newPhones = [...telefonos]
                                newPhones[i] = e.target.value
                                setPhones(newPhones)
                            }}
                        />
                    ))}
                    <button type="button" onClick={() => setPhones([...telefonos, ''])}>
                        + Agregar teléfono
                    </button>
                </div>

                <div>
                    <p>Direcciones:</p>
                    {direcciones.map((addr, i) => (
                        <input
                            key={i}
                            type="text"
                            value={addr}
                            onChange={(e) => {
                                const newAddresses = [...direcciones]
                                newAddresses[i] = e.target.value
                                setAddresses(newAddresses)
                            }}
                        />
                    ))}
                    <button type="button" onClick={() => setAddresses([...direcciones, ''])}>
                        + Agregar dirección
                    </button>
                </div>
                <div className='buttonFormSpace'>
                    <button className='buttonSave' type="submit">Guardar</button>
                </div>
            </form>
        </div>
    )
}
