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
  return <h1>Listado de Usuarios</h1>
}
