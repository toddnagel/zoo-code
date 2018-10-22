import * as action from './actions'

export const loadAnimals = () => {
  return {
    type: action.LOAD_ANIMALS,
    payload: {}
  }
}

export const editAnimal = (index) => {
  return {
    type: action.EDIT_ANIMAL,
    payload: index
  }
}

export const deleteAnimal = (index) => {
  return {
    type: action.DELETE_ANIMAL,
    payload: index
  }
}

const ACTION_HANDLERS = {
  
  [action.LOAD_ANIMALS_SUCCESS]: (state, action) => {
    return { ...state, ...action.payload }
  },
  [action.LOAD_ANIMALS_FAIL]: (state, action) => {
    return { ...state, ...action.payload }
  },
  [action.DELETE_ANIMAL]: (state, action) => {
    return { ...state, animals: [ ...state.animals.filter((data, i) => i !== action.payload) ] }
  },
  [action.EDIT_ANIMAL]: (state, action) => {
    return { ...state, editing: action.payload, isEditing: true }
  },
  [action.RESET_FORM]: (state, action) => {
    return { 
      ...state, 
      editing: '',
      isEditing: false,
    }
  },
  [action.FORM_SUBMITTED]: (state, action) => {
    return { ...state, isSubmiting: true }
  },
  [action.MODIFY_FORM_SUBMITTED]: (state, action) => {
    return { ...state, isSubmiting: true }
  },
  [action.FORM_SUBMITTED_SUCCESS]: (state, action) => {
    return { ...state, isSubmiting: false, message: action.payload.message, animals: [ ...state.animals, ...action.payload.animal ] }
  },
  [action.MODIFY_FORM_SUBMITTED_SUCCESS]: (state, action) => {
    return { 
      ...state, 
      message: action.payload.message, 
      editing: '',
      isEditing: false, 
      isSubmiting: false, 
      animals: [ 
        ...state.animals.slice(0, action.payload.index), 
        {
          ...action.payload.animal[0],
        },
        ...state.animals.slice(action.payload.index + 1),        
      ]
    }
  }
}

let defaultState = {}

export const reducer = (state = defaultState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
