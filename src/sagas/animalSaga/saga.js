import { call, all, put, takeLatest } from 'redux-saga/effects'
import * as actions from './actions'

import { request } from 'modules/client'; 

let defaultState = {
  message: 'The zoo has been initialized.',
  editing: null,
  isEditing: false,
  isSubmitting: false
}

function* loadAnimals() {

  try {
    
    const response = yield call(request, 'http://localhost:3000/mock.json');
    
    yield put({
      type: actions.LOAD_ANIMALS_SUCCESS,
      payload: {
        ...defaultState,
        animals: [...response.animals],
        species: [...response.species],
        formData: response.formData,
        message: 'Data for the zoo has been loaded.'
      },
    });
  }
  catch (err) {
    
    yield put({
      type: actions.LOAD_ANIMALS_FAIL,
      payload: {
        ...defaultState,
        message: "The zoo API has failed."
      },
    });
  }
}

function* editAnimal({payload}) {  
  yield put({
    type: actions.LOAD_EDIT_FORM,
    payload: {
      message: 'The modify animal form has been initialized.'
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
      isSubmitting: false,
      message: 'The animal form has been submitted.'
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
      isSubmitting: false,
      index: payload.index,
      message: 'The modify animal form has been submitted.'
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
