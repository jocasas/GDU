import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function EditUser() {
  const { rut } = useParams()
  const navigate = useNavigate()

  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // Simulación de fetch, reemplazar con la API real
    const mockUser = {
      rut,
      name: 'Juan Pérez',
      birthdate: '1990-01-01',
      children: 2,
      email: 'juan@example.com',
      phones: ['+56912345678','+56912345678'],
      addresses: ['Calle falsa 123','Calle falsa 123'],
    }

    setUserData(mockUser)
  }, [rut])

  const handleChange = (key: string, value: any) => {
    setUserData((prev: any) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Usuario actualizado:', userData)
    alert('Usuario editado (simulado)')
    navigate('/')
  }

  if (!userData) return <p>Cargando...</p>

  return (
    <div>
      <h1>Editar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <label>
          RUT (no editable):
          <input type="text" value={userData.rut} disabled />
        </label>
        <label>
          Nombre:
          <input type="text" value={userData.name} onChange={(e) => handleChange('name', e.target.value)} />
        </label>
        <label>
          Fecha de nacimiento:
          <input
            type="date"
            value={userData.birthdate}
            onChange={(e) => handleChange('birthdate', e.target.value)}
          />
        </label>
        <label>
          Cantidad de hijos:
          <input
            type="number"
            value={userData.children}
            onChange={(e) => handleChange('children', Number(e.target.value))}
          />
        </label>
        <label>
          Correo electrónico:
          <input type="email" value={userData.email} onChange={(e) => handleChange('email', e.target.value)} />
        </label>

        <div>
          <p>Teléfonos:</p>
          {userData.phones.map((phone: string, i: number) => (
            <input
              key={i}
              type="text"
              value={phone}
              onChange={(e) => {
                const newPhones = [...userData.phones]
                newPhones[i] = e.target.value
                handleChange('phones', newPhones)
              }}
            />
          ))}
          <button type="button" onClick={() => handleChange('phones', [...userData.phones, ''])}>
            + Agregar teléfono
          </button>
        </div>

        <div>
          <p>Direcciones:</p>
          {userData.addresses.map((addr: string, i: number) => (
            <input
              key={i}
              type="text"
              value={addr}
              onChange={(e) => {
                const newAddresses = [...userData.addresses]
                newAddresses[i] = e.target.value
                handleChange('addresses', newAddresses)
              }}
            />
          ))}
          <button type="button" onClick={() => handleChange('addresses', [...userData.addresses, ''])}>
            + Agregar dirección
          </button>
        </div>

        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  )
}
