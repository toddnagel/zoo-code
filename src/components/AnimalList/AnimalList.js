import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import AnimalDisplay from './AnimalDisplay';

export default class AnimalListComponent extends React.Component {
  static propTypes = {
    animalSaga: PropTypes.object
  }
  
  handleEdit = (index) => {   
    this.props.editAnimal(index);
  };

  handleDelete = (index) => {
    this.props.deleteAnimal(index);
  };

  render() {
    const { animals, isEditing, isSubmiting, editing } = this.props.animalSaga;

    return (
      <Grid container spacing={16}> 
          {(animals && animals.length > 0) && animals.map((animal,index) => (
            <AnimalDisplay 
              key={index} 
              animal={animal} 
              isSubmiting={isSubmiting}
              isEditing={isEditing && editing === index} 
              handleEdit={this.handleEdit.bind(this, index)} 
              handleDelete={this.handleDelete.bind(this, index)}
            />            
        ))}
        {(!animals || !animals.length > 0) && <div>Please add an animal.</div>}        
      </Grid>
    )
  }
}
