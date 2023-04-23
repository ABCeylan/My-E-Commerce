import React, { useState } from 'react';
import { loginUser } from '../../api';

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const user = await loginUser(username, password);
            onLogin(user);
        } catch (err) {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <div className="input-row">
                <div className="input-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <button className="login-button" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}

export default LoginPage;
