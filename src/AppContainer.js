import { connect } from 'react-redux'

import AppComponent from './App'

import { init } from './sagas/testSaga/reducer'
import { loadAnimals } from './sagas/animalSaga/reducer'

const mapStatetoProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(init())
    },
    loadAnimals: () => {
      dispatch(loadAnimals())
    }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(AppComponent)
