import whiteFace from '../assets/Imagen3.png'
import yellowFace from '../assets/Imagen4.png'
import { Link } from 'react-router-dom';
import '../styles/login.css'

function Register(){
    const handleRegister = () =>{
        console.log("Signing up")
    }

    return(
        <>
            <div className="login-container">
                <img src={whiteFace} alt="pink face" className="decor-top-left" />
                <img src={yellowFace} alt="heart face" className="decor-bottom-right" />

                <form className="login-form" onSubmit={handleRegister}>
                    <label>Email</label>
                    <input type="email" placeholder="value" required />

                    <label>Password</label>
                    <input type="password" placeholder="value" required />

                    <Link to="/login" className="login-link">Already have an account? Sign in</Link>

                    <button type="submit">Register</button>
                </form>
            </div>
        </>
    )
}

export default Register