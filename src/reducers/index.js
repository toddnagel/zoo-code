import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as testSaga } from '../sagas/testSaga/reducer'
import { reducer as animalSaga } from '../sagas/animalSaga/reducer'

const reducers = combineReducers({
  testSaga,
  animalSaga,
  form: formReducer
})

export default reducers
