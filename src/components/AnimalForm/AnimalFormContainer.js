import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import moment from 'moment';

import AnimalFormComponent from './AnimalForm';

import { submitForm, modifyAnimal, resetForm } from '../../sagas/animalSaga/actions';

const mapStateToProps = state => {
  
  const formValues = state.animalSaga.isEditing ? state.animalSaga.animals[state.animalSaga.editing]: {};
   
  if(state.animalSaga.isEditing && formValues && formValues.dob){    
    formValues.dob = new Date(moment(formValues.dob).format('MM-DD-YYYY'));
  } 
   
  return {
    animalSaga: state.animalSaga,
    form: 'animalForm',
    initialValues: formValues,
  }
}

const mapDispatchToProps = dispatch => {
  return {    
    submitForm: debounce((values) => dispatch(submitForm(values)),500),
    resetForm: () => dispatch(resetForm()),
    modifyAnimal: debounce((values, index) => dispatch(modifyAnimal(values, index)),500),
  }
}

export default compose(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
    reduxForm({
      enableReinitialize: true,
      onSubmit: (v, d, p) => new Promise((resolve) => {}),
      onSubmitFail: (e, d, se, p) => {
        console.log(e);
      },
    }),
  )(AnimalFormComponent);
