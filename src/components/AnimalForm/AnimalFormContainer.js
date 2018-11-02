import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import moment from 'moment';

import AnimalFormComponent from './AnimalForm';

import { submitForm, modifyAnimal, resetForm } from 'sagas/animalSaga/actions';

const mapStateToProps = state => {
  
  let initialFormValues = {};

  if(state.animalSaga.isEditing){
    initialFormValues = {
      ...state.animalSaga.animals[state.animalSaga.editing],
      dob: new Date(moment(initialFormValues.dob).format('MM-DD-YYYY'))
    }
  }

  return {
    animalSaga: state.animalSaga,
    form: 'animalForm',
    initialValues: initialFormValues
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
