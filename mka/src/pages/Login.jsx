import pinkFace from '../assets/Imagen1.png'
import heartFace from '../assets/Imagen2.png'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import '../styles/login.css'

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogin = async (e) =>{
        e.preventDefault();
        await login(email, password);
    }

    return(
        <>
            <div className="login-container">
                <img src={pinkFace} alt="pink face" className="decor-top-right" />
                <img src={heartFace} alt="heart face" className="decor-bottom-left" />

                <form className="login-form" onSubmit={handleLogin}>
                    <label>Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com" required />

                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="******" required />

                    {error && <p style={{color: 'red'}}>{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login