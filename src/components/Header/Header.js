import React from 'react'
import PropTypes from 'prop-types'

import { Toolbar } from 'material-ui/Toolbar'

export default class HeaderComponent extends React.Component {
  static propTypes = {
    testSaga: PropTypes.object,
    animalSaga: PropTypes.object
  }

  render() {
    const { message, animals } = this.props.animalSaga
    console.log('latest message: ',message)
    if(animals) { console.log('animal count: ',animals.length) }

    return (
      <div>
        <Toolbar>
            <div className="w-100 text-center">
              <h1>Welcome to the ZOO</h1>
              
            </div>
        </Toolbar>
      </div>
    )
  }
}
