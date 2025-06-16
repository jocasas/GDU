import { Routes, Route } from 'react-router-dom';
import UsersPage from '../pages/UsersPage';
import NotFound from '../pages/NotFound';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
