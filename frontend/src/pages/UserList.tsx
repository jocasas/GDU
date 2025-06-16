import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

interface User {
    rut: string
    name: string
    birthdate: string
    children: number
    email: string
    phones: string[]
    addresses: string[]
}

const fakeUsers: User[] = [
    {
        rut: '12345678-9',
        name: 'Juan Pérez',
        birthdate: '1990-05-12',
        children: 2,
        email: 'juan@example.com',
        phones: ['+56912345678'],
        addresses: ['Santiago, Chile']
    },
    {
        rut: '98765432-1',
        name: 'María López',
        birthdate: '1985-08-22',
        children: 1,
        email: 'maria@example.com',
        phones: ['+56987654321', '+56911223344'],
        addresses: ['Valparaíso', 'Viña del Mar']
    }
]

export default function UserList() {
    const navigate = useNavigate()

    const [users, setUsers] = useState(fakeUsers);

    const handleDelete = (rut: string) => {
        const confirmed = confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmed) {
            setUsers((prev) => prev.filter((user) => user.rut !== rut));
        }
    };


    return (
        <div style={{ padding: '1rem' }}>
            <h1>Listado de Usuarios</h1>
            <p>Total de usuarios: {fakeUsers.length}</p>

            <button onClick={() => navigate('/add')} style={{ marginBottom: '1rem' }}>
                Agregar Usuario
            </button>

            <table border={1} cellPadding={8} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>RUT</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Fecha Nacimiento</th>
                        <th>Hijos</th>
                        <th>Teléfonos</th>
                        <th>Direcciones</th>
                        <th>Administrar</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.rut}>
                            <td>{user.rut}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.birthdate}</td>
                            <td>{user.children}</td>
                            <td>{user.phones.join(', ')}</td>
                            <td>{user.addresses.join(', ')}</td>
                            <td>
                                <Link to={`/edit/${user.rut}`}>
                                    <button>Editar</button>
                                </Link>
                                <button onClick={() => handleDelete(user.rut)}>Eliminar</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
