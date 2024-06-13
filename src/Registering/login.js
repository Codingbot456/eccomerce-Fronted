import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './regi.css';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const validate = () => {
        let newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            try {
                const res = await axios.post('http://localhost:4000/api/login', formData);
                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    setIsAuthenticated(true);
                    setLoginSuccess(true);
                    setTimeout(() => {
                        navigate('/');
                    }, 1000); // Redirect after 2 seconds
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    setErrors({ apiError: error.response.data.msg });
                } else {
                    setErrors({ apiError: 'An error occurred. Please try again.' });
                }
            }
        } else {
            setErrors(newErrors);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="login-container">
            <div className="reg-con">
                {loginSuccess ? (
                    <div>
                        <h2>Login Successful</h2>
                        <p>You will be redirected to the homepage shortly.</p>
                    </div>
                ) : (
                    <>
                       
                        <form onSubmit={handleSubmit}>
                        <h2>Login</h2>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>
                            <div>
                                <label>Password:</label>
                                <div className="password-container">
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={errors.password ? 'error' : ''}
                                    />
                                </div>
                                <div className='check'>
                                    <input
                                        type="checkbox"
                                        id="show-password"
                                        checked={passwordVisible}
                                        onChange={togglePasswordVisibility}
                                    />
                                    <label htmlFor="show-password">Show Password</label>
                                </div>
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </div>
                            <button type="submit">Login</button>
                            {errors.apiError && <span className="error-message">{errors.apiError}</span>}
                        </form>
                        <p>
                            Don't have an account? <a href="/register">Register</a>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;
