import React from 'react';
import './LogIn.css';
import LogoImage from '../../assets/images/Logo Header.svg';

function LogIn(){
    return(
        <div>
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

                    {/* Submit/Log In */}
                    <button type="submit" class="btn btn-primary">Log In</button>

                    <p class="or">or</p>

                    <p class="signUp">Dont have an account? <span class="signUpLink">Sign Up</span></p>
                </form>
            </div>
        </div>
    )
}

export default LogIn;