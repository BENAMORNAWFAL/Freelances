import React, { Component } from 'react';
// import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
// import firebase from '../config/firebase';
import { connect } from 'react-redux';
// import { order_request } from '../store/action';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class OrderRequests extends Component {
    constructor() {
        super();
        this.state = {
            activeTab: 'tab1',
            userDetails: null,
        };
    }

    async componentDidMount() {
        // this.props.order_request();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.user !== state.userDetails) {
            return {
                userDetails: props.user,
            };
        }
        return null;
    }

    handleTabs = (tab) => {
        this.setState({ activeTab: tab });
    };

    updateOrderStatus = async (userUid, orderId, status) => {
        // const { userDetails } = this.state;
        // const restaurantUid = userDetails.userUid;

        // try {
        //     await firebase.firestore().collection('users').doc(restaurantUid).collection('orderRequest').doc(orderId).update({
        //         status,
        //     });
        //     await firebase.firestore().collection('users').doc(userUid).collection('myOrder').doc(orderId).update({
        //         status,
        //     });
        // } catch (error) {
        //     console.error('Error updating order status:', error);
        // }
    };

    renderOrderRequests = (status) => {
        const { orderRequest } = this.props;
        if (!orderRequest) return null;

        return Object.values(orderRequest).map((order) => {
            if (order.status !== status) return null;
            const { userUid, id, userName, itemsList, totalPrice } = order;

            return (
                <div className="container border-bottom pb-2 px-lg-0 px-md-0 mb-4" key={id}>
                    <div className="row mb-3">
                        <div className="col-lg-6 col-md-6 col-12">
                            <h5>{userName}</h5>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12 text-lg-right text-md-right text-center">
                            <span className={`text-uppercase order-req-status ${status === 'DELIVERED' ? 'text-success' : 'text-danger'}`}>
                                {status}
                            </span>
                        </div>
                    </div>
                    {Object.values(itemsList).map((item, index) => (
                        <div className="row mb-3" key={index}>
                            <div className="col-lg-2 col-md-3 col-8 offset-2 offset-lg-0 offset-md-0 px-0 mb-3 text-center">
                                <img style={{ width: '70px', height: '70px' }} alt="Item" src={item.itemImageUrl} />
                            </div>
                            <div className="col-lg-7 col-md-6 col-sm-12 px-0">
                                <h6>{item.itemTitle}</h6>
                                <p className="mb-1"><small>{item.itemIngredients}</small></p>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-12 px-0 text-right">
                                <span style={{ fontSize: '14px' }} className="mx-3"><b>RS.{item.itemPrice}</b></span>
                            </div>
                        </div>
                    ))}
                    <div className="row mb-3 mb-md-0 mb-lg-0">
                        <div className="col-lg-6 col-md-6 col-12 order-lg-first order-md-first order-last">
                            {status === 'PENDING' && (
                                <button
                                    type="button"
                                    onClick={() => this.updateOrderStatus(userUid, id, 'IN PROGRESS')}
                                    className="btn btn-warning btn-sm text-uppercase px-3"
                                >
                                    <b>Send To In Progress</b>
                                </button>
                            )}
                            {status === 'IN PROGRESS' && (
                                <button
                                    type="button"
                                    onClick={() => this.updateOrderStatus(userUid, id, 'DELIVERED')}
                                    className="btn btn-warning btn-sm text-uppercase px-3"
                                >
                                    <b>Send To Delivered</b>
                                </button>
                            )}
                            {status === 'DELIVERED' && (
                                <h6 style={{ fontSize: '15px' }} className="text-success">
                                    This order is successfully delivered
                                </h6>
                            )}
                        </div>
                        <div className="col-lg-6 col-md-6 col-12 text-lg-right text-md-right">
                            <p><b className="mr-4">Total Price:</b><span style={{ fontSize: '1.1rem' }}>RS.{totalPrice}</span></p>
                        </div>
                    </div>
                </div>
            );
        });
    };

    render() {
        const { activeTab, userDetails } = this.state;
        return (
            <div>
                <div className="container-fluid res-details-cont1">
                    {/* <Navbar2 history={this.props.history} /> */}
                    <div className="container px-0 res-details-cont1-text mx-0">
                        <div className="container">
                            {userDetails && (
                                <div className="row">
                                    <div className="col-lg-2 col-md-3 col-6 text-lg-center text-md-center pr-0 mb-2">
                                        <img
                                            className="p-2 bg-white rounded text-center"
                                            alt="Restaurant"
                                            style={{ width: '60%' }}
                                            src={userDetails.userProfileImageUrl}
                                        />
                                    </div>
                                    <div className="col-lg-10 col-md-9 col-12 pl-lg-0 pl-md-0">
                                        <h1 className="restaurant-title">{userDetails.userName}</h1>
                                        <p className="restaurant-text">{userDetails.typeOfFood?.join(', ')}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div style={{ background: '#EBEDF3' }} className="container-fluid py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 col-md-10 col-sm-12 offset-lg-1 offset-md-1">
                                <div className="container">
                                    <div className="row">
                                        <div
                                            className={`col-12 col-lg-4 col-md-4 text-center ${activeTab === 'tab1' ? 'order-req-tab-active' : ''}`}
                                            onClick={() => this.handleTabs('tab1')}
                                        >
                                            <p className="order-req-tab-text"><FontAwesomeIcon icon="spinner" className="mr-3" />Pending</p>
                                        </div>
                                        <div
                                            className={`col-12 col-lg-4 col-md-4 text-center ${activeTab === 'tab2' ? 'order-req-tab-active' : ''}`}
                                            onClick={() => this.handleTabs('tab2')}
                                        >
                                            <p className="order-req-tab-text"><FontAwesomeIcon icon="truck" className="mr-3" />In Progress</p>
                                        </div>
                                        <div
                                            className={`col-12 col-lg-4 col-md-4 text-center ${activeTab === 'tab3' ? 'order-req-tab-active' : ''}`}
                                            onClick={() => this.handleTabs('tab3')}
                                        >
                                            <p className="order-req-tab-text"><FontAwesomeIcon icon="tasks" className="mr-3" />Delivered</p>
                                        </div>
                                    </div>
                                    {activeTab === 'tab1' && (
                                        <div className="row pending-order-section">
                                            <div className="col-12 bg-white p-4">
                                                {this.renderOrderRequests('PENDING')}
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'tab2' && (
                                        <div className="row inProgress-order-section">
                                            <div className="col-12 bg-white p-4">
                                                {this.renderOrderRequests('IN PROGRESS')}
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'tab3' && (
                                        <div className="row delivered-order-section">
                                            <div className="col-12 bg-white p-4">
                                                {this.renderOrderRequests('DELIVERED')}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        orderRequest: state.orderRequest,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // order_request: () => dispatch(order_request()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderRequests);
