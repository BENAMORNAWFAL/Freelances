import React, { Component } from 'react';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'

class RegisterRestaurant extends Component {
  state = {
    registerFormError: "",
    restoProfileImageLabel: "Choose image",
    restoName: "",
    restoEmail: "",
    restoPassword: "",
    restoConfirmPassword: false,
    restoCity: "",
    restoAdresse: "",
    restoCategory: "Food",
    phone: "",
    restoProfileImage: null,
    restoTNC: false,
    showError: false,
  };

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: val,
      showError: false,
      registerFormError: ""
    });
  };

  handlerestoProfileImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      this.setState({
        restoProfileImageLabel: file.name,
        restoProfileImage: file,
        showError: false,
        registerFormError: "",
      });
    } else {
      this.setState({
        restoProfileImageLabel: "Choose image...",
        restoProfileImage: null,
        showError: true,
        registerFormError: "Please select a profile image.",
      });
    }
  };

  handleValidation = () => {
    const { restoName, restoEmail, restoPassword, restoConfirmPassword, restoCity, restoCountry, categories, restoAge, restoProfileImage, restoTNC } = this.state;
    const restoNameFormate = /^([A-Za-z.\s_-]).{5,}$/;
    const restoEmailFormate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const restoPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    const restoCityFormate = /^([A-Za-z.\s_-]).{5,}$/;
    const restoCountryFormate = /^([A-Za-z.\s_-]).{5,}$/;

    // if (!restoName.match(restoNameFormate)) {
    //   this.setState({ showError: true, registerFormError: "Please enter a valid name." });
    //   return false;
    // }
    // if (!restoEmail.match(restoEmailFormate)) {
    //   this.setState({ showError: true, registerFormError: "Please enter a valid email address." });
    //   return false;
    // }
    // if (!restoPassword.match(restoPasswordFormate)) {
    //   this.setState({ showError: true, registerFormError: "Use alphanumeric, uppercase, lowercase & greater than 10 characters." });
    //   return false;
    // }
    // if (restoPassword !== restoConfirmPassword) {
    //   this.setState({ showError: true, registerFormError: "Confirmation password not matched." });
    //   return false;
    // }
    // if (!restoCity.match(restoCityFormate)) {
    //   this.setState({ showError: true, registerFormError: "Please enter a valid city name." });
    //   return false;
    // }
    // if (!restoCountry.match(restoCountryFormate)) {
    //   this.setState({ showError: true, registerFormError: "Please enter a valid country name." });
    //   return false;
    // }
    // if (!(restoAge > 0 && restoAge < 101)) {
    //   this.setState({ showError: true, registerFormError: "Please enter a valid age." });
    //   return false;
    // }
    // if (!restoProfileImage) {
    //   this.setState({ showError: true, registerFormError: "Please select a profile image." });
    //   return false;
    // }
    // if (!restoTNC) {
    //   this.setState({ showError: true, registerFormError: "Please accept terms and conditions." });
    //   return false;
    // }
    return true;
  };

  handleCreateAccountBtn = async (e) => {
    e.preventDefault();
    if (this.handleValidation()) {
      const { restoName, restoEmail, restoPassword, restoCity, restoAdresse, restoCategory, restoPhone, restoProfileImage, restoTNC } = this.state;
      const restoDetails = {
        restoName,
        restoEmail,
        restoPassword,
        restoCity,
        restoAdresse,
        restoCategory,
        restoPhone,
      };
      try {
        console.log('resto ************', restoDetails);
        const response = await axios.post('http://localhost:3000/api/newrestaurant', restoDetails);
            console.log('Register in successfully:', response.data);
            
                this.props.history.push("/login");
          
      } catch (error) {
        console.error('Error in Register:', error.response ? error.response.data : error);
      }
    }
  };

  render() {
    const { showError, registerFormError, restoProfileImageLabel, restoTNC, categories } = this.state;
    return (
      <div>
        <div className="container-fluid register-cont1">
          <Navbar2 history={this.props.history} />
          <div className="container register-cont1-text">
            <h1 className="text-uppercase text-white text-center mb-4"><strong>Register resto And Add Restaurant</strong></h1>
          </div>
        </div>
        <div className="container-fluid py-5 bg-light">
          <div className="col-lg-6 col-md-6 col-sm-12 mx-auto bg-white shadow p-4">
            <h2 className="text-center mb-4">Register Restaurant</h2>
            <form onSubmit={this.handleCreateAccountBtn}>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="restoName">Restaurant Name</label>
                  <input type="text" className="form-control" id="restoName" name="restoName" placeholder="Resto Name" onChange={this.handleChange} />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="restoEmail">Email</label>
                  <input type="email" className="form-control" id="restoEmail" name="restoEmail" placeholder="Email" onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="restoPassword">Password</label>
                  <input type="password" className="form-control" id="restoPassword" name="restoPassword" placeholder="Password" onChange={this.handleChange} />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="restoConfirmPassword">Confirm Password</label>
                  <input type="password" className="form-control" id="restoConfirmPassword" name="restoConfirmPassword" placeholder="Confirm Password" onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="restoAdresse">Adresse</label>
                  <input type="text" className="form-control" id="restoAdresse" name="restoAdresse" onChange={this.handleChange} />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="restoCity">City</label>
                  <input type="text" className="form-control" id="restoCity" name="restoCity" onChange={this.handleChange} />
                </div>
              </div>
              <div className="form-row mb-3">
                <label htmlFor="restoCategory">Category</label>
                <select id="restoCategory" className="form-control" name="restoCategory" value={categories} onChange={this.handleChange}>
                  <option defaultValue value="food">Food</option>
                  <option value="candies">Candies</option>
                  <option value="juices">Juices</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="restoPhone">Phone</label>
                  <input type="text" className="form-control" id="restoPhone" name="restoPhone" onChange={this.handleChange} />
                </div>
                <div className="form-group col-md-6">
                  <p className="mb-2">Restaurant Image</p>
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="restoProfileImage" onChange={this.handlerestoProfileImage} />
                    <label className="custom-file-label" htmlFor="restoProfileImage">{restoProfileImageLabel}</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="restoTNC" name="restoTNC" checked={restoTNC} onChange={this.handleChange} />
                  <label className="custom-control-label" htmlFor="restoTNC">Accept Terms and Conditions</label>
                </div>
              </div>
              {showError && <p className="text-danger">{registerFormError}</p>}
              <button type="submit" className="btn btn-warning text-uppercase mb-3"><b>Create an Account</b></button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default RegisterRestaurant;
