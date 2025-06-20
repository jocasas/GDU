import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { updateUser } from '../services/userService'

export default function EditUser() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const originalUser = state?.user

  const [user, setUser] = useState(originalUser)

  if (!user) {
    return <p>Error: No se encontró la información del usuario.</p>
  }

  const handleChange = (key: string, value: any) => {
    setUser((prev: any) => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // En los datos como el telefono la estructura es de tipo array, por tanto aqui hacemos trim al array y que no quede una coma y string vacio
    const cleanedUser = {
      ...user,
      telefonos: user.telefonos.filter((t: string) => t.trim() !== ''),
      direcciones: user.direcciones.filter((d: string) => d.trim() !== ''),
    }

    try {
      await updateUser(cleanedUser.rut, cleanedUser)
      alert('Usuario editado correctamente')
      navigate('/')
    } catch (error) {
      console.error('Error al editar usuario:', error)
      alert('Hubo un error al editar el usuario')
    }
  }

  return (
    <div>
      <h1>Editar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <label>
          RUT (no editable):
          <input type="text" value={user.rut} disabled />
        </label>
        <label>
          Nombre:
          <input
            type="text"
            value={user.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
          />
        </label>
        <label>
          Fecha de nacimiento:
          <input
            type="date"
            value={user.fechaNacimiento}
            onChange={(e) => handleChange('fechaNacimiento', e.target.value)}
          />
        </label>
        <label>
          Cantidad de hijos:
          <input
            type="number"
            value={user.cantidadHijos}
            onChange={(e) => handleChange('cantidadHijos', Number(e.target.value))}
          />
        </label>
        <label>
          Correo electrónico:
          <input
            type="email"
            value={user.correos}
            onChange={(e) => handleChange('correos', e.target.value)}
          />
        </label>

        <div>
          <p>Teléfonos:</p>
          {user.telefonos.map((phone: string, i: number) => (
            <input
              key={i}
              type="text"
              value={phone}
              onChange={(e) => {
                const newPhones = [...user.telefonos]
                newPhones[i] = e.target.value
                handleChange('telefonos', newPhones)
              }}
            />
          ))}
          <button
            type="button"
            onClick={() => handleChange('telefonos', [...user.telefonos, ''])}
          >
            + Agregar teléfono
          </button>
        </div>

        <div>
          <p>Direcciones:</p>
          {user.direcciones.map((addr: string, i: number) => (
            <input
              key={i}
              type="text"
              value={addr}
              onChange={(e) => {
                const newAddresses = [...user.direcciones]
                newAddresses[i] = e.target.value
                handleChange('direcciones', newAddresses)
              }}
            />
          ))}
          <button
            type="button"
            onClick={() => handleChange('direcciones', [...user.direcciones, ''])}
          >
            + Agregar dirección
          </button>
        </div>

        <div className="buttonFormSpace">
          <button className="buttonEdit" type="submit">Guardar cambios</button>
        </div>
      </form>
    </div>
  )
}