import React, { Component } from 'react';
import axios from 'axios';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { Redirect } from 'react-router-dom';


class Login extends Component {

    constructor() {
        super();
        this.state = {
            isRegisterForm: false,
            registerFormError: "",
            userProfileImageLabel: "Choose image",
            userName: "",
            userEmail: "",
            userPassword: "",
            userConfirmPassword: "",
            userCity: "",
            userCountry: "",
            userGender: "Male",
            userAge: "",
            userProfileImage: null,
            userTNC: false,
            showError: false,
            userLoginEmail: "",
            userLoginPassword: "",
            shouldRedirect:false,
            userType:''
        };

    }

    handleForms = () => {
        this.setState((prevState) => ({ isRegisterForm: !prevState.isRegisterForm }));
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleUserProfileImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            this.setState({
                userProfileImageLabel: file.name,
                userProfileImage: file,
                showError: false,
                registerFormError: ""
            });
        } else {
            this.setState({
                userProfileImageLabel: "Choose image...",
                userProfileImage: null,
                showError: true,
                registerFormError: "Please select a profile image."
            });
        }
    }

    handleUserTNC = () => {
        this.setState((prevState) => ({
            userTNC: !prevState.userTNC,
            showError: !prevState.userTNC,
            registerFormError: !prevState.userTNC ? "" : "Please accept terms and conditions."
        }));
    }

    validateForm = () => {
        const { userName, userEmail, userPassword, userConfirmPassword, userCity, userCountry, userAge, userProfileImage, userTNC } = this.state;
        const userNameFormat = /^([A-Za-z.\s_-]).{5,}$/;
        const userEmailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const userPasswordFormat = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
        const userCityCountryFormat = /^([A-Za-z.\s_-]).{5,}$/;

        // if (!userName.match(userNameFormat)) {
        //     return "Please enter a valid name.";
        // } else if (!userEmail.match(userEmailFormat)) {
        //     return "Please enter a valid email address.";
        // }
        //  else if (!userPassword.match(userPasswordFormat)) {
        //     return "Use alphanumeric, uppercase, lowercase & greater than 10 characters.";
        // } 
        // else if (userPassword !== userConfirmPassword) {
        //     return "Confirmation password not matched.";
        // } 
        // else if (!userCity.match(userCityCountryFormat)) {
        //     return "Please enter a valid city name.";
        // } else if (!userCountry.match(userCityCountryFormat)) {
        //     return "Please enter a valid country name.";
        // } else if (!(userAge > 0 && userAge < 101)) {
        //     return "Please enter a valid age.";
        // } else if (!userProfileImage) {
        //     return "Please select a profile image.";
        // } else if (!userTNC) {
        //     return "Please accept terms and conditions.";
        // } else {
        //     return null;
        // }
    }

   

handleCreateAccountBtn = async () => {
    const error = this.validateForm();
    if (error) {
        this.setState({ showError: true, registerFormError: error });
        return;
    }

    const { userName, userEmail, userPassword, userCity, userCountry, userGender, userAge, userProfileImage } = this.state;
    const userDetails = {
        userName,
        userEmail,
        userPassword,
        userCity,
        userCountry,
        userGender,
        userAge,
    };

    // const formData = new FormData();
    // formData.append('userProfileImage', userProfileImage);
    // Object.keys(userDetails).forEach(key => formData.append(key, userDetails[key]));

    // formData.append('userName', userName);
    // formData.append('userEmail', userEmail);
    // formData.append('userPassword', userPassword);
    // formData.append('userCity', userCity);
    // formData.append('userCountry', userCountry);
    // formData.append('userGender', userGender);
    // formData.append('userAge', userAge);
    if (userProfileImage) {
        formData.append('userProfileImage', userProfileImage);
    }
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        console.log("FormData:", formData);
        console.log("config:", config);

        console.log('userDetails', userDetails)
        const response = await axios.post("http://localhost:3000/api/newuser", userDetails);
        console.log("✔✔ Client success:", response.data);
        this.setState((prevState) => ({ isRegisterForm: !prevState.isRegisterForm }));
        
    } catch (error) {
        console.error('Error in Sign up:', error.response ? error.response.data : error);
        this.setState({ showError: true, registerFormError: 'Failed to create account. Please try again.' });
    } finally{
       
    }
};

handleLoginNowBtn = async () => {
    const { userLoginEmail, userLoginPassword } = this.state;

    const userLoginDetails = {
        email: userLoginEmail,
        password: userLoginPassword,
    };

    console.log("login  :", userLoginDetails);

    try {
        const response = await axios.post('http://localhost:3000/api/login', userLoginDetails);
        console.log('User logged in successfully:', response.data);
        localStorage.setItem('user_data', JSON.stringify(response.data.user));
        if (response.data.type == 'restaurant') {
            this.props.history.push("/menu");
            this.userType='restaurant'
        } else {
            this.props.history.push("/home");
            this.userType='normalUser'

        }
    } catch (error) {
        console.error('Error in Login:', error.response ? error.response.data : error);
        this.setState({ showError: true, registerFormError: 'Failed to log in. Please try again.' });
    }
};

render() {
    const { isRegisterForm, showError, registerFormError, userProfileImageLabel, userTNC, userGender, userName, userEmail, userPassword, userConfirmPassword, userCity, userCountry, userAge, userLoginEmail, userLoginPassword, userType } = this.state;

    return (
        <div>
            <div className="container-fluid register-cont1">
           
                <Navbar2 history={this.props.history}  />
                <div className="container register-cont1-text">
                    <h1 className="text-uppercase text-white text-center mb-4"><strong>User Login / Register</strong></h1>
                </div>
            </div>
            <div className="container-fluid py-5 bg-light">
                {isRegisterForm ? (
                    <div className="col-lg-6 col-md-8 col-sm-12 mx-auto bg-white shadow p-4">
                        <h2 className="text-center mb-4">Create an Account</h2>
                        <form action="javascript:void(0)">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="userName">Full Name</label>
                                    <input type="text" className="form-control" id="userName" name="userName" placeholder="Full Name" value={userName} onChange={this.handleInputChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="userEmail">Email</label>
                                    <input type="email" className="form-control" id="userEmail" name="userEmail" placeholder="Email" value={userEmail} onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="userPassword">Password</label>
                                    <input type="password" className="form-control" id="userPassword" name="userPassword" placeholder="Password" value={userPassword} onChange={this.handleInputChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="userConfirmPassword">Confirm Password</label>
                                    <input type="password" className="form-control" id="userConfirmPassword" name="userConfirmPassword" placeholder="Password" value={userConfirmPassword} onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="userCity">City</label>
                                    <input type="text" className="form-control" id="userCity" name="userCity" placeholder="City" value={userCity} onChange={this.handleInputChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="userCountry">Country</label>
                                    <input type="text" className="form-control" id="userCountry" name="userCountry" placeholder="Country" value={userCountry} onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-4">
                                    <label htmlFor="userGender">Gender</label>
                                    <select id="userGender" className="form-control" name="userGender" value={userGender} onChange={this.handleInputChange}>
                                        <option defaultValue>Male</option>
                                        <option>Female</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="userAge">Age</label>
                                    <input type="number" className="form-control" id="userAge" name="userAge" placeholder="Age" value={userAge} onChange={this.handleInputChange} />
                                </div>
                                <div className="form-group col-md-6">
                                    <p className="mb-2">Profile Image</p>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="userProfileImage" name="userProfileImage" onChange={this.handleUserProfileImage} />
                                        <label className="custom-file-label" htmlFor="userProfileImage">{userProfileImageLabel}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="userTNC" name="userTNC" checked={userTNC} onChange={this.handleUserTNC} />
                                <label className="form-check-label" htmlFor="userTNC">I accept the terms and conditions</label>
                            </div>
                            {showError && <small className="text-danger">{registerFormError}</small>}
                            <button type="submit" className="btn btn-primary btn-block" onClick={this.handleCreateAccountBtn}>Create Account</button>
                            <button type="button" className="btn btn-link btn-block" onClick={this.handleForms}>Already have an account? Log in</button>
                        </form>
                    </div>
                ) : (
                    <div className="col-lg-4 col-md-6 col-sm-8 mx-auto bg-white shadow p-4">
                        <h2 className="text-center mb-4">Log in</h2>
                        <form action="javascript:void(0)">
                            <div className="form-group">
                                <label htmlFor="userLoginEmail">Email</label>
                                <input type="email" className="form-control" id="userLoginEmail" name="userLoginEmail" placeholder="Email" value={userLoginEmail} onChange={this.handleInputChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userLoginPassword">Password</label>
                                <input type="password" className="form-control" id="userLoginPassword" name="userLoginPassword" placeholder="Password" value={userLoginPassword} onChange={this.handleInputChange} />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block" onClick={this.handleLoginNowBtn}>Log in</button>
                            <button type="button" className="btn btn-link btn-block" onClick={this.handleForms}>Create new account</button>
                        </form>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
}

export default Login;
