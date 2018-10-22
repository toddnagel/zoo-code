import { call, all, put, takeLatest } from 'redux-saga/effects'
import * as actions from './actions'

import { request } from '../../modules/client';

let defaultState = {
  message: 'animalSaga initialized',
  editing: null,
  isEditing: false,
  isSubmiting: false
}

function* loadAnimals() {

  try {
    
    const response = yield call(request, 'http://localhost:3000/mock.json');
    console.log(response);
    yield put({
      type: actions.LOAD_ANIMALS_SUCCESS,
      payload: {
        ...defaultState,
        animals: [...response.animals],
        species: [...response.species],
        formData: [...response.formData],
        message: 'animals saga has been run'
      },
    });
  }
  catch (err) {
    
    yield put({
      type: actions.LOAD_ANIMALS_FAIL,
      payload: {
        ...defaultState,
        message: "API Error!"
      },
    });
  }
}

function* editAnimal({payload}) {  
  yield put({
    type: actions.LOAD_EDIT_FORM,
    payload: {
      message: 'load edit form has been run'
    }
  })
}

function* formSubmitted({payload}) {    
  yield put({
    type: actions.FORM_SUBMITTED_SUCCESS,
    payload: {
      animal: [
        ...payload.animal
      ],
      isSubmiting: false,
      message: 'form submitted has been run'
    }
  })
}

function* modifyFormSubmitted({payload}) {    
  yield put({
    type: actions.MODIFY_FORM_SUBMITTED_SUCCESS,
    payload: {
      animal: [
        ...payload.animal
      ],
      isSubmiting: false,
      index: payload.index,
      message: 'modify form submitted has been run'
    }
  })
}
export default function* sagas() {
  yield all([
    yield takeLatest(actions.LOAD_ANIMALS, loadAnimals),
    yield takeLatest(actions.FORM_SUBMITTED, formSubmitted),
    yield takeLatest(actions.MODIFY_FORM_SUBMITTED, modifyFormSubmitted),
    yield takeLatest(actions.EDIT_ANIMAL, editAnimal)
  ]);
}
