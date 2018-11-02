import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import AnimalDisplay from './AnimalDisplay';

class AnimalListComponent extends React.Component {
  static propTypes = {
    animalSaga: PropTypes.object
  }
  
  handleEdit = index => {   
    this.props.editAnimal(index);
  };

  handleDelete = index => {
    this.props.deleteAnimal(index);
  };

  render() {
    const { animals, isEditing, isSubmitting, editing } = this.props.animalSaga;

    return (
      <Grid container spacing={16}> 
          {(animals && animals.length > 0) && animals.map((animal,index) => (
            <AnimalDisplay 
              key={index} 
              animal={animal} 
              isSubmitting={isSubmitting}
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

AnimalListComponent.propTypes = {
  editAnimal: PropTypes.func.isRequired,
  deleteAnimal: PropTypes.func.isRequired,
};

export default AnimalListComponent;
