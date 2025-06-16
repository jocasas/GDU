import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserList from '../pages/UserList'
import AddUser from '../pages/AddUser'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  )
}
