import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getUsers } from '../services/userService'

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

    const handleDelete = (rut: string) => {
        const confirmed = confirm("¿Estás seguro de que deseas eliminar este usuario?");
        if (confirmed) {
            setUsers((prev) => prev.filter((user) => user.rut !== rut));
        }
    };


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
                            <td>{user.correos.join(', ')}</td>
                            <td>{user.fechaNacimiento}</td>
                            <td>{user.cantidadHijos}</td>
                            <td>{user.telefonos.join(', ')}</td>
                            <td>{user.direcciones.join(', ')}</td>
                            <td>
                                <Link to={`/edit/${user.rut}`} state={{user}}>
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
