import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { update_user, remove_user } from '../store/action';
import { Navbar, Nav, Button } from 'react-bootstrap';

class Navbar2 extends Component {
    constructor() {
        super();
        this.state = {
            updated_user:null,
            homeIconLink: '/'
        };
        this._renderWithLogin = this._renderWithLogin.bind(this);
    }
    
    componentDidMount() {
        console.log('Props passed to Navbar2:', this.props.userType);
        this.setState({updated_user:localStorage.getItem('user_data')});
    }

    static getDerivedStateFromProps(props) {
        if (props.user) {
            const { isRestaurant, userName } = props.user;
            return {
                updated_user: props.user,
                homeIconLink: isRestaurant ? '/order-requests' : '/',
                userName
            };
        } else {
            return {
                updated_user: {
                    isLogin: false,
                },
                userName: ''
            };
        }
    }

    handleLogOutBtn = () => {
        localStorage.removeItem('user_data');
        this.props.history.push('/');
    };

    _renderWithOutLogin() {
        return (
            <Nav className="ml-auto">
                <Nav.Item>
                    {/* <Nav.Link as={Link} to="/restaurants">Restaurants</Nav.Link> */}
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/login">Login / Register</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Link to="/register-restaurant">
                        <Button variant="warning" size="sm" className="text-uppercase mr-2">Register Restaurant</Button>
                    </Link>
                </Nav.Item>
            </Nav>
        );
    }

    _renderWithLogin() {
        const { updated_user, userName } = this.state;
        return (
            <Nav className="ml-auto align-items-center">
                    <>
                    <Nav.Link as={Link} to="/restaurants">Order Now</Nav.Link>
                        
                        <Nav.Item>
                            <Nav.Link as={Link} to="/my-orders">My Orders</Nav.Link>
                        </Nav.Item>
                    </>
               
                <Nav.Item>
                    <Nav.Link>{userName}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Button variant="warning" size="sm" className="text-uppercase" onClick={this.handleLogOutBtn}>Log Out</Button>
                </Nav.Item>
            </Nav>
        );
    }

    render() {
        const { updated_user, homeIconLink } = this.state;
        return (
            
            <Navbar variant="dark" expand="lg">
                <Navbar.Brand as={Link} to={homeIconLink}>
                    <img alt="Quick Food Logo" src="src/assets/images/logo3.png" style={{width:'200px'}}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {localStorage.getItem('user_data') ? this._renderWithLogin() : this._renderWithOutLogin()}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = {
    // update_user,
    // remove_user
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar2);
