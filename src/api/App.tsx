import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../api/pages/Login.tsx'

function MainApp() {
    return (
        <div>
            <h1>Main App</h1>
            <p>Protected content goes here.</p>
        </div>
    )
}

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/app" element={<MainApp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
