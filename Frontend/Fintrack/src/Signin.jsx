/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Signin.css";
import { UserContext } from './UserContext';
import logo from './image/earning.png'
import Footer from './Footer';
import ViewEye from './image/view.png'
import HideEye from './image/hide.png'
const Signin = () => {
    const [res, setRes] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const username = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const { setUsername } = useContext(UserContext);

    const post_data = () => {
        setErrorMessage('');

        const usernameValue = username.current.value.trim();
        const passwordValue = password.current.value.trim();
        if (!usernameValue ) {
            setErrorMessage('Username cannot be empty.');
            return;
        }
        if (!passwordValue ) {
            setErrorMessage('Password cannot be empty.');
            return;
        }
        PostEx(usernameValue, passwordValue);
    };

    const PostEx = async (usernameValue, passwordValue) => {
        try {
            const response = await axios.post(`http://localhost:9000/signin?username=${usernameValue}&password=${passwordValue}`);

            const { data } = response;
            setRes(data);
            if (response.status === 200) {
                setUsername(usernameValue);
                setTimeout(()=>{
                    navigate('/home/dashboard');
                },500);
                
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            setRes("Invalid Username & Password");
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <React.Fragment>
            <div className="login-container">
                <div className="launchpage-cmpyname">
                    <img src={logo} alt="" />
                    <h1>WealthWise</h1>
                </div>
                <div className="login-interior">
                    <div className="signin-content">
                        <h1>Sign In</h1>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <p className="result">{JSON.stringify(res)}</p>
                        <input type="text" ref={username} placeholder="Username" autoFocus />
                        <br />
                        <div className="password-container">
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                ref={password}
                                placeholder="Password"
                            />
                            <button type="button" onClick={togglePasswordVisibility}>
                                {passwordVisible ? <img src={ViewEye}/>: <img src={HideEye}/>}
                            </button>
                        </div>
                        <p>Don't have an account?</p>
                        <button onClick={post_data}>SIGN IN</button>
                    </div>
                    <div className="signup-content">
                        <h1>Hello...!</h1>
                        <p>Enter your personal details and start your journey with us</p>
                        <Link to="/signup"><button>SIGN UP</button></Link>
                    </div>
                </div>
                <div className="footer">
                    <Footer/>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Signin;
