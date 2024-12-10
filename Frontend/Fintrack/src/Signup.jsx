import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
import logo from './image/earning.png'
import Footer from './Footer';
const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [res, setRes] = useState('');

    const handleUsernameChange = (value) => {
        setUsername(value);
        setErrorMessage('');

        if (!value.trim()) {
            setErrorMessage('Username cannot be empty.');
        } else if (value.length < 4) {
            setErrorMessage('Username must have more than 4 characters.');
        }
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        setErrorMessage('');
        evaluatePasswordStrength(value);

        if (rePassword && value !== rePassword) {
            setErrorMessage('Passwords do not match.');
        } else {
            setErrorMessage('');
        }
    };

    const handleRePasswordChange = (value) => {
        setRePassword(value);
        setErrorMessage(' ');

        if (value !== password) {
            setErrorMessage('Passwords do not match.');
        }
    };

    const evaluatePasswordStrength = (password) => {
        if (!password) {
            setPasswordStrength(' ');
            return;
        }

        const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
        // At least 8 characters, one uppercase, one number, one special character
        const moderatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/; 
        // At least 6 characters, one uppercase, one number

        if (strongPassword.test(password)) {
            setPasswordStrength('Strong');
        } else if (moderatePassword.test(password)) {
            setPasswordStrength('Moderate');
        } else {
            setPasswordStrength('Weak');
        }
    };

    const post_data = async () => {
        setErrorMessage('');
        setRes('');

        if (!username.trim()) {
            setErrorMessage('Username cannot be empty.');
            return;
        }

        if (username.length < 4) {
            setErrorMessage('Username must have more than 4 characters.');
            return;
        }

        if (!password) {
            setErrorMessage('Password cannot be empty.');
            return;
        }

        if (password !== rePassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (passwordStrength !== 'Strong') {
            setErrorMessage('Enter a strong password.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:9000/signup', {
                username,
                password,
            });

            if (response.status === 200) {
                setPasswordStrength('');
                setRes('New User has been added Successfully!');
                setTimeout(()=>{
                    setRes(' ');
                },10000);
            } else {
                setRes('User Registration failed.');
            }
        } catch (error) {
            setErrorMessage('Username already exists');
        }
    };
    

    return (
        
        <div className="signup-container">
            <div className="launchpage-cmpyname">
            <img src={logo} alt="" />
            <h1>WealthWise</h1>
          </div>
            <div className="signup-interior">
                <div className="login-content">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please log in with your personal info</p>
                    <Link to="/signin">
                        <button>SIGN IN</button>
                    </Link>
                </div>
                <div className="register-content">
                    <h1>Create Account</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {passwordStrength && (
                        <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
                            Password Strength: {passwordStrength}
                        </p>
                    )}
                    {res && <p className="result">{res}</p>}
                    <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        autoFocus
                        onChange={(e) => handleUsernameChange(e.target.value)}
                    />
                    <br />
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => handlePasswordChange(e.target.value)}
                    />
                    <br />
                    <input
                        type="password"
                        value={rePassword}
                        placeholder="Confirm Password"
                        onChange={(e) => handleRePasswordChange(e.target.value)}
                    />
                    <br />
                    <p>Already have an account?</p>
                    <button onClick={post_data}>SIGN UP</button>
                </div>
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    );
};

export default Signup;
