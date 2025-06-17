import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserList from '../pages/UserList'
import AddUser from '../pages/AddUser'
import EditUser from '../pages/EditUser'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:rut" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  )
}
