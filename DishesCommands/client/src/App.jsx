import React, { Component } from 'react';
import MyRoutes from './config/routes'
import { Provider } from 'react-redux';
import store from './store'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        
          <MyRoutes />
        
      </Provider>
    );
  }
}

export default App;