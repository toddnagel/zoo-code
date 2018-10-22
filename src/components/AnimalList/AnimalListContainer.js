import { connect } from 'react-redux'

import AnimalListComponent from './AnimalList'

import { loadAnimals, editAnimal, deleteAnimal } from '../../sagas/animalSaga/reducer'

const mapStatetoProps = state => {  
  return {
    animalSaga: state.animalSaga
  }
}

const mapDispatchToProps = dispatch => {
  return {
    animalsInit: () => {
      dispatch(loadAnimals())
    },
    editAnimal: (index) => dispatch(editAnimal(index)),
    deleteAnimal: (index) => dispatch(deleteAnimal(index)),
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(AnimalListComponent)
