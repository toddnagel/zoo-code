import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Routes from './routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css'

class App extends Component {
  static propTypes = {
    init: PropTypes.func,
    loadAnimals: PropTypes.func
  }

  render() {
    this.props.init();
    this.props.loadAnimals();

    return (
      <MuiThemeProvider>
        <Routes />
      </MuiThemeProvider>
    )
  }
}

export default App
