import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { deleteUser, getUsers } from '../services/userService'

interface User {
    rut: string
    nombre: string;
    fechaNacimiento: string;
    cantidadHijos: number;
    correos: string[];
    telefonos: string[];
    direcciones: string[];
}

export default function UserList() {
    const navigate = useNavigate()

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers().then(setUsers);
    }, []);

    const handleDelete = async (user: any) => {
        const today = new Date().toISOString().slice(5, 10) // MM-DD
        const birthdate = new Date(user.fechaNacimiento).toISOString().slice(5, 10)

        if (today === birthdate) {
            alert('No se puede eliminar a un usuario que está de cumpleaños hoy.')
            return
        }

        if (!confirm(`¿Estás seguro de que deseas eliminar al usuario ${user.nombre}?`)) return

        try {
            await deleteUser(user.rut)
            alert('Usuario eliminado correctamente')
            setUsers((prev) => prev.filter((u) => u.rut !== user.rut))
        } catch (error) {
            console.error('Error al eliminar:', error)
            alert('Error al eliminar usuario')
        }
    }


    return (
        <div>
            <h1>Listado de Usuarios</h1>
            <p>Total de usuarios: {users.length}</p>
            <div className='buttonAddSpace'>
                <button className='buttonAdd' onClick={() => navigate('/add')}>
                    Agregar Usuario
                </button>
            </div>
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
                            <td>{user.nombre}</td>
                            <td>{user.correos}</td>
                            <td>{user.fechaNacimiento}</td>
                            <td>{user.cantidadHijos}</td>
                            <td>{user.telefonos.join(', ')}</td>
                            <td>{user.direcciones.join(', ')}</td>
                            <td>
                                <Link to={`/edit/${user.rut}`} state={{ user }}>
                                    <button>Editar</button>
                                </Link>
                                <button onClick={() => handleDelete(user)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
