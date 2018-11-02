import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Routes from './routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
  static propTypes = {
    init: PropTypes.func,
    loadAnimals: PropTypes.func
  }

  render() {
    this.props.init(); // left this in, could load in inital page data used elsewhere to remain consistant.
    this.props.loadAnimals(); // load in the existing animals, labels, and error messages.

    return (
      <MuiThemeProvider>
        <Routes />
      </MuiThemeProvider>
    )
  }
}

export default App
