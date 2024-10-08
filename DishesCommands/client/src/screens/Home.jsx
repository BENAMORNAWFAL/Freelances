import React, { Component } from 'react';
// import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      homeSearchBarText: '',
    };
    this.handleSearchBar = this.handleSearchBar.bind(this);
  }

  handleSearchBar() {
    const { homeSearchBarText } = this.state;
    if (homeSearchBarText) {
      this.props.history.push('/restaurants', this.state.homeSearchBarText);
    }
  }

  handleOrderNowBtn() {
    const userInLogin=localStorage.getItem('user_data');
    // console.log(" user in login **************** ",userInLogin);
    if (userInLogin){
      this.props.history.push('/restaurants');
    }else{
      this.props.history.push('/login');

    }
  }

  render() {
    return (
      <div>
        {/* Home Navbar Section */}
        <div className="container-fluid home-cont1">
          <div className="">
            {/* <Navbar history={this.props.history} /> */}
            <Navbar2 history={this.props.history} userType='normalUser'/>
            <div className="container home-cont1-text">
              <h1 className="h1 text-uppercase text-white text-center mb-4"><strong>Organic Fast Food Made <br /> Easy And Healthy</strong></h1>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                    <input type="text" className="form-control text-uppercase" id="searchText" placeholder="Restaurant Name" onChange={(e) => { this.setState({ homeSearchBarText: e.target.value }) }} />
                  </div>
                  <div className="col-lg-2 col-md-2 col-sm-12">
                    <button type="button" className="btn btn-warning mb-2 text-uppercase btn-block rounded-0" onClick={this.handleSearchBar}><b>Search</b></button>
                  </div>
                </div>
              </div>
              <div className="container text-white text-center mt-4">
                <div className="col-lg-7 col-md-8 col-sm-12 mx-auto">
                  {/* <img style={{ width: "95%" }} alt="" src={require("../assets/images/options-img.png")} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Home Number section */}
        <div className="container-fluid py-2 bg-warning">
          <div className="row" style={{height:'30px'}}>
            
          </div>
        </div>

        {/* Home How it work section */}
        <div className="container-fluid text-center py-4" id='howitwork'>
          <div className="py-4">
            <h2 className="h2 text-uppercase">How It Works</h2>
            <p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-4 col-md-4 px-5">
                <span className="round-border my-4">
                  <img alt="Choose A Restaurant" src="src/assets/images/how-to-work2.png" />
                </span>
                <h3 className="h3 mb-4">Choose A Restaurant</h3>
                <p className="mb-4">Cras vitae dictum velit. Duis at purus enim. Cras massa massa, maximus sit amet finibus quis, pharetra eu erat.</p>
              </div>
              <div className="col-12 col-lg-4 col-md-4 px-5">
                <span className="round-border my-4">
                  <img alt="Choose A Tasty Dish" src="src/assets/images/how-to-work3.png" />
                </span>
                <h3 className="h3 mb-4">Choose A Tasty Dish</h3>
                <p className="mb-4">Dictum velit. Duis at purus enim. Cras massa massa, maximus sit amet finibus quis, pharetra eu erat.</p>
              </div>
              <div className="col-12 col-lg-4 col-md-4 px-5">
                <span className="round-border my-4">
                  <img alt="Pick Up Or Delivery" src="src/assets/images/how-to-work1.png" />
                </span>
                <h3 className="h3 mb-4">Pick Up Or Delivery</h3>
                <p className="mb-4">Purus enim. Cras massa massa, maximus sit amet finibus quis, pharetra eu erat.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Home Order now section */}
        <div className="container-fluid text-center py-5 home-cont3">
          <p className="h1 text-uppercase text-white mt-5 mb-3">Just Order And We Will Deliver You</p>
          <p className="text-white mb-3">Pellentesque eget justo eget nibh luctus semper at ut tellus.</p>
          <button type="button" className="btn btn-warning text-uppercase mb-5" onClick={() => this.handleOrderNowBtn()}><b>Order Now</b></button>
        </div>

        {/* Home Featured restaurant section */}
        <div className="container-fluid py-5">
          <div className="py-4">
            <h2 className="h2 text-uppercase text-center">Featured Restaurant</h2>
            
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "100%" }} alt="Natural Healthy Food" src="src/assets/images/dareljeld.jpg" />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Dar El Jeld</h5>
                      <p className="mb-2"><small>Juices, Cooked Fish, Couscous</small></p>
                      <p>
                        
                        <small>(1) Review</small>
                      </p>
                      <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "100%" }} alt="Menu & Drinks" src="src/assets/images/burger-zink.jpg" />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Le Zink</h5>
                      <p className="mb-2"><small>Burger & Cola </small></p>
                      <p>
                        
                        <small>(3) Review</small>
                      </p>
                      <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "100%" }} alt="Chefs" src="src/assets/images/foundouk.jpg"/>
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Foundouk El Attarine</h5>
                      <p className="mb-2"><small>Couscous, Salad, Chicken</small></p>
                      <p>
                      
                        <small>(1) Review</small>
                      </p>
                      <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "100%" }} alt="Menu's" src="src/assets/images/citroen.jpg" />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Club Grill Citroen</h5>
                      <p className="mb-2"><small>Italian, Steakhouse</small></p>
                      <p>
                        
                        <small>(1) Review</small>
                      </p>
                      <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "100%" }} alt="Food N&H" src="src/assets/images/theatre.jpg" />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Le Grand Café du Théatre</h5>
                      <p className="mb-2"><small>Cafe & Restaurant, Mediterranean</small></p>
                      <p>
                        
                        <small>(4) Review</small>
                      </p>
                      <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
                <div className="container res-shadow res-border">
                  <div className="row p-3">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center border p-2">
                      <img style={{ width: "100%" }} alt="Restaurant" src="src/assets/images/sarayturkish.jpg" />
                    </div>
                    <div style={{ position: "relative" }} className="col-lg-8 col-md-8 col-sm-12 py-2">
                      <h5 className="mb-1">Saray Turkish Cuisine</h5>
                      <p className="mb-2"><small>Juice & Turkey Foods</small></p>
                      <p>
                        
                        <small>(2) Review</small>
                      </p>
                      <span style={{ position: "absolute", top: 5, right: 5 }}><FontAwesomeIcon icon="heart" className="text-success mr-1" /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Home Footer */}
        <Footer />
      </div>
    );
  }
}

export default Home;
