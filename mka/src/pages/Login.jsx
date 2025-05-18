import pinkFace from '../assets/Imagen1.png'
import heartFace from '../assets/Imagen2.png'
import { Link } from 'react-router-dom';
import '../styles/login.css'

function Login(){
    const handleLogin = () =>{
        console.log("Signing in")
    }

    return(
        <>
            <div className="login-container">
                <img src={pinkFace} alt="pink face" className="decor-top-right" />
                <img src={heartFace} alt="heart face" className="decor-bottom-left" />

                <form className="login-form" onSubmit={handleLogin}>
                    <label>Email</label>
                    <input type="email" placeholder="name@email.com" required />

                    <label>Password</label>
                    <input type="password" placeholder="******" required />

                    <Link to="/register" className="login-link">New here? Sign up</Link>

                    <button type="submit">Sign In</button>
                </form>
            </div>
        </>
    )
}

export default Login