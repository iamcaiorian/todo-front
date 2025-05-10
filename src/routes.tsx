import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/homePage'
import TodolistPage from './pages/todolistPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/todolists/:id" element={<TodolistPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
