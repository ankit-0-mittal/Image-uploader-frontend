import React, { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('https://67f9-2405-201-6800-700e-3832-34ae-6085-3ccf.ngrok-free.app/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "true" 
            },
            body: JSON.stringify({ username, password }),
        });
        const result = await response.json();

        if (response.ok) {
            alert('Registered successfully!');
            setUsername('');
            setPassword('');
            window.location.href='/upload'
        } else {
            alert(result.message || 'Registration failed. Please try again.');
        }

        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
