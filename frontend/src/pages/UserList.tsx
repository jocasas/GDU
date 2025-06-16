import { useNavigate } from 'react-router-dom'

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
          </tr>
        </thead>
        <tbody>
          {fakeUsers.map((user) => (
            <tr key={user.rut}>
              <td>{user.rut}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.birthdate}</td>
              <td>{user.children}</td>
              <td>{user.phones.join(', ')}</td>
              <td>{user.addresses.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
