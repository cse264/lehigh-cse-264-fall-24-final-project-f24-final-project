// NOTE: SIGN UP BACK BUTTON DOESN'T WORKx

import React from 'react';
import { useState } from 'react';
import './LogIn.css';
import LogoImage from '../../assets/images/Logo Header.svg';

function LogIn(){
    const [isSignUp, setIsSignUp] = useState(false);
    const [isSignUpVisible, setIsSignUpVisible] = useState(true);

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    const hideSignUp = () => {
        setIsSignUpVisible(false);
    };

    return(
        <div>
            {isSignUpVisible && (
            <div class="card">
                <img src={LogoImage} class="logo" alt="Tangerines Logo" />
                <h1 class="loginHeader">Log In</h1>

                <form>
                    {/* Email input */}
                    <div class="form-group">
                        <input type="email" class="form-control" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter Email" />
                    </div>

                    {/* Password input */}
                    <div class="form-group">
                        <input type="password" class="form-control" id="inputPassword" placeholder="Enter Password" />
                    </div>

                    <p class="error">Username/Password not found. Please try again.</p>

                    {/* Submit/Log In */}
                    <button type="submit" class="btn btn-primary">Log In</button>

                    {/* Sign Up */}
                    <p class="or">or</p>
                    <p class="signUp">Dont have an account? <span class="signUpLink" onClick={toggleForm}>Sign Up</span></p>
                </form>
                </div>
            )}
                

                {/* SignUp Overlay */}
                {isSignUp && (
                    <div class="overlay">
                        <div class="overlay-form">
                            <h2>Sign Up</h2>
                            <form>
                                {/* Sign Up */}
                                <div class="form-group">
                                    <input type="email" class="form-control" id="signupEmail" aria-describedby="emailHelp" placeholder="Enter Email" />
                                </div>
                                <div>
                                    <input type="password" class="form-control" id="signupPassword" placeholder="Enter Password" />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Sign Up
                                </button>

                                <p class="backToLogin" onClick={hideSignUp}>Back to Log In</p>
                            </form>
                        </div>
                    </div>
                )}

            </div>
    )
}

export default LogIn;