import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:8080/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            })
            if (!res.ok) {
                const text = await res.text()
                throw new Error(text || res.statusText)
            }

            const data = await res.text()
            console.log("HI " + res.text())
            console.log("HI", data)
            let token: string | undefined
            try {
                const parsed = JSON.parse(data)
                token = parsed?.token ?? parsed?.accessToken ?? (typeof parsed === 'string' ? parsed : undefined)
            } catch {
                token = data
            }
            localStorage.setItem('authToken', token?.toString() || '')
            navigate('/app')
        } catch (err) {
            console.error(err)
            alert('Login failed')
        }
    }

    return (
        <div className="login">
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
                </label>
                <label>
                    Password
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <button type="submit">Sign in</button>
            </form>
        </div>
    )
}