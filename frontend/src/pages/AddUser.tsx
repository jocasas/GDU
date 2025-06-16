import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddUser() {
    const navigate = useNavigate()

    const [rut, setRut] = useState('')
    const [name, setName] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [children, setChildren] = useState(0)
    const [email, setEmail] = useState('')
    const [phones, setPhones] = useState([''])
    const [addresses, setAddresses] = useState([''])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí después mandamos a la API
        console.log({ rut, name, birthdate, children, email, phones, addresses })
        alert('Usuario agregado (simulado)')
        navigate('/')
    }

    return (
        <div>
            <h1>Agregar Usuario</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    RUT:
                    <input type="text" value={rut} onChange={(e) => setRut(e.target.value)} required />
                </label>
                <label>
                    Nombre:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Fecha de nacimiento:
                    <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
                </label>
                <label>
                    Cantidad de hijos:
                    <input
                        type="number"
                        value={children}
                        onChange={(e) => setChildren(Number(e.target.value))}
                        min={0}
                        required
                    />
                </label>
                <label>
                    Correo electrónico:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>

                <div>
                    <p>Teléfonos:</p>
                    {phones.map((phone, i) => (
                        <input
                            key={i}
                            type="text"
                            value={phone}
                            onChange={(e) => {
                                const newPhones = [...phones]
                                newPhones[i] = e.target.value
                                setPhones(newPhones)
                            }}
                        />
                    ))}
                    <button type="button" onClick={() => setPhones([...phones, ''])}>
                        + Agregar teléfono
                    </button>
                </div>

                <div>
                    <p>Direcciones:</p>
                    {addresses.map((addr, i) => (
                        <input
                            key={i}
                            type="text"
                            value={addr}
                            onChange={(e) => {
                                const newAddresses = [...addresses]
                                newAddresses[i] = e.target.value
                                setAddresses(newAddresses)
                            }}
                        />
                    ))}
                    <button type="button" onClick={() => setAddresses([...addresses, ''])}>
                        + Agregar dirección
                    </button>
                </div>

                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}
