export const LOAD_ANIMALS = 'LOAD_ANIMALS';
export const LOAD_ANIMALS_SUCCESS = 'LOAD_ANIMALS_SUCCESS';
export const LOAD_ANIMALS_FAIL = 'LOAD_ANIMALS_FAIL';

export const DELETE_ANIMAL = 'DELETE_ANIMAL';
export const DELETE_ANIMAL_SUCCESS = 'DELETE_ANIMAL_SUCCESS';
export const EDIT_ANIMAL = 'EDIT_ANIMAL';
export const LOAD_EDIT_FORM = 'LOAD_EDIT_FORM';

export const MODIFY_FORM_SUBMITTED = 'MODIFY_FORM_SUBMITTED';
export const MODIFY_FORM_SUBMITTED_SUCCESS = 'MODIFY_FORM_SUBMITTED_SUCCESS';

export const FORM_SUBMITTED = 'FORM_SUBMITTED';
export const FORM_SUBMITTED_SUCCESS = 'FORM_SUBMITTED_SUCCESS';
export const FORM_SUBMITTED_FAILURE = 'FORM_SUBMITTED_FAILURE';

export const RESET_FORM = 'RESET_FORM';

const buildAnimal = values => {

  const animal = [];

  animal.push({
    name: values.name,
    cost: values.cost,
    species: values.species,
    dob: values.dob,
    oversize: values.oversize
  });

  return animal;
}

export const submitForm = (values, index) => {
  
  const animal = buildAnimal(values);
  
  if(index){
    return {
      type: MODIFY_FORM_SUBMITTED,
      payload: { 
        animal, 
        index, 
        isSubmitting: true
      }
    };
  }
  else{
    return {
      type: FORM_SUBMITTED,
      payload: { 
        animal, 
        isSubmitting: true
      }
    };
  }  
};

export const modifyAnimal = (values, index) => {

  const animal = buildAnimal(values);
    
  return {
    type: MODIFY_FORM_SUBMITTED,
    payload: { 
      animal, 
      index, 
      isSubmitting: true 
    }
  };
};

export const resetForm = () => {
  
  return {
    type: RESET_FORM,
  };
};
  
