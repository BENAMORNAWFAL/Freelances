import React, { Component } from 'react';
import axios from 'axios';
import Navbar2 from '../components/Navbar2';
import Footer from '../components/Footer';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MyOrders extends Component {
  state = {
    activeTab: 'tab1',
    myOrder: null,
    user: null,
    menuItems: {},
  };

  async componentDidMount() {
    await this.fetchMyOrders();
  }

  handleTabs = (tab) => {
    this.setState({ activeTab: tab });
  };

  async fetchMyOrders() {
    try {
      const user_data = localStorage.getItem('user_data');
      if (!user_data) {
        throw new Error('No user connected found');
      }
      const userObject = JSON.parse(user_data);
      this.setState({ user: userObject });

      if (userObject) {
        const response = await axios.get(`http://localhost:3000/api/user/order/${userObject.id}`);
        const myOrders = response.data;

        // Fetch menu items for each order
        const ordersWithMenuItems = await Promise.all(myOrders.map(async order => {
          const menuResponse = await axios.get(`http://localhost:3000/api/menu/${order.menuId}`);
          const menuData = menuResponse.data;
          return { ...order, menuItemName: menuData.name, menuDescription: menuData.description, menuPrice: menuData.price };
        }));

        this.setState({ myOrder: ordersWithMenuItems });
        console.log('Fetched all my orders successfully:', ordersWithMenuItems);
      }
    } catch (error) {
      console.error('Error fetching orders:', error.response ? error.response.data : error);
    }
  }


  async fetchMenuItems(myOrder) {
    try {
      const menuIds = myOrder.map(order => order.menuId);
      const promises = menuIds.map(menuId =>
        axios.get(`http://localhost:3000/api/menu/${menuId}`)
      );
      const responses = await Promise.all(promises);
      const menuItems = {};
      responses.forEach((response, index) => {
        menuItems[menuIds[index]] = response.data;
      });
      this.setState({ menuItems });
      console.log('Fetched menu items successfully:', menuItems);
    } catch (error) {
      console.error('Error in fetching menu items:', error.response ? error.response.data : error);
    }
  }

  handleDeleteYourItemBtn = (id) => {
    console.log('id delete =============', id);

    axios.delete(`http://localhost:3000/api/delete/order/${id}`)
      .then(response => {
        console.log('delete order in successfully:', response.data);
        this.fetchMyOrders();
      })
      .catch(error => {
        console.error('Error in delete item:', error);
      });

  }


  calculateTotalPrice = () => {
    const { myOrder } = this.state;
    if (!myOrder) return 0;

    return myOrder.reduce((total, order) => total + order.totalPrice, 0);
  };

  renderOrderList = (status) => {
    const { myOrder, menuItems } = this.state;

    if (!myOrder) return <div>Loading...</div>;

    // const filteredOrders = myOrder.filter(order => order.status === status);

    return (
      <div>
        {myOrder.map(order => (
          <div className="container border-bottom pb-2 px-lg-0 px-md-0 mb-4" key={order.id}>
            <div className="row">
              <div className="col-lg-8 col-md-8 col-sm-12">
                <h5>{order.menuItemName}</h5>
                <p>Quantity: {order.quantity}</p>
                <p>Total Price: {order.totalPrice}</p>
                <p>Description Food: {order.menuDescription}</p>
                <p>Total Price: {order.totalPrice}</p>
                <button type="button" className="btn btn-danger text-uppercase mb-3" onClick={() => this.handleDeleteYourItemBtn(order.id)}><b>Delete Order</b></button>

              </div>
            </div>
          </div>
        ))}

      </div>
    );
  };

  render() {
    const { activeTab, userDetails } = this.state;

    return (
      <div>
        <div className="container-fluid res-details-cont1">
          <Navbar2 history={this.props.history} />
          <div className="container px-0 res-details-cont1-text mx-0">
            <div className="container">
              {userDetails && (
                <div className="row">
                  <div className="col-lg-2 col-md-3 col-6 text-lg-center text-md-center pr-0 mb-2">
                    <img className="p-2 bg-white rounded text-center" alt="User Profile" style={{ width: "60%" }} src={userDetails.userProfileImageUrl} />
                  </div>
                  <div className="col-lg-10 col-md-9 col-12 pl-lg-0 pl-md-0">
                    <h1 className="restaurant-title">{userDetails.userName}</h1>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div style={{ background: "#EBEDF3" }} className="container-fluid py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-md-10 col-sm-12 offset-lg-1 offset-md-1">
                <div className="container">
                  <div className="row">
                    <div className={`col-12 col-lg-4 col-md-4 text-center ${activeTab === 'tab1' ? 'order-req-tab-active' : ''}`} onClick={() => this.handleTabs("tab1")}>
                      <p className="order-req-tab-text"><FontAwesomeIcon icon="spinner" className="mr-3" />Pending</p>
                    </div>
                    <div className={`col-12 col-lg-4 col-md-4 text-center ${activeTab === 'tab2' ? 'order-req-tab-active' : ''}`} onClick={() => this.handleTabs("tab2")}>
                      <p className="order-req-tab-text"><FontAwesomeIcon icon="truck" className="mr-3" />In Progress</p>
                    </div>
                    <div className={`col-12 col-lg-4 col-md-4 text-center ${activeTab === 'tab3' ? 'order-req-tab-active' : ''}`} onClick={() => this.handleTabs("tab3")}>
                      <p className="order-req-tab-text"><FontAwesomeIcon icon="tasks" className="mr-3" />Delivered</p>
                    </div>
                  </div>
                  {activeTab === 'tab1' && (
                    <div className="row pending-order-section">
                      <div className="col-12 bg-white p-4">
                        {this.renderOrderList('PENDING')}
                      </div>
                    </div>
                  )}
                  {activeTab === 'tab2' && (
                    <div className="row inProgress-order-section">
                      <div className="col-12 bg-white p-4">
                        {this.renderOrderList('IN PROGRESS')}
                      </div>
                    </div>
                  )}
                  {activeTab === 'tab3' && (
                    <div className="row delivered-order-section">
                      <div className="col-12 bg-white p-4">
                        {this.renderOrderList('DELIVERED')}
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

const mapStateToProps = state => {
  return {
    user: state.user,
    myOrder: state.myOrder,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    // my_order: () => dispatch(my_order()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
