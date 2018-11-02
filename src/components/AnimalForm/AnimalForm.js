import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import debounce from 'lodash/debounce';

import moment from 'moment';

import { DatePicker } from 'redux-form-material-ui';

//import classNames from 'classnames';

import { Field } from 'redux-form';

import MenuItem from 'material-ui/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { renderTextField } from './fields/renderTextField';
import { renderSelectField } from './fields/renderSelectField';
import { renderCheckbox } from './fields/renderCheckbox';
import { dynamicValidator } from './dynamicValidator';

//import asyncValidate from './asyncValidate';

import { 
  required, 
  alpha, 
  alphaNumericName, 
  minMaxLengthName, 
 // numericCost, 
  formatCost, 
  onlyDecimal
 } from './validate';

 const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

class AnimalForm extends Component {
  
  static propTypes = {
    animalSaga: PropTypes.shape({
      animals: PropTypes.array,
      formData: PropTypes.shape({
        errors: PropTypes.array,
        labels: PropTypes.array,
      }),
      species: PropTypes.array,
    })
  }

  constructor(props) {
    super(props);

    this.state = {  
      dob: null   
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  handleDate = (value) => {
    this.setState({ dob: value })
  }

  handleSubmit = (values) => {
    const { submitForm, modifyAnimal, reset } = this.props;
    const { isEditing, editing } = this.props.animalSaga;
    const dob = this.state.dob ? this.state.dob : this.props.initialValues.dob;

    if (isEditing) {
      modifyAnimal({ ...values, dob }, editing);
    }
    else {
      submitForm({ ...values, dob });
    }

    reset();
    this.setState({ dob: null })
  };

  cancelEdit = () => {
    const { resetForm } = this.props;

    resetForm();
  }
  
  render() {
    const { handleSubmit, pristine, submitting, initialValues, reset } = this.props;
    const { isEditing, species, isSubmitting, formData } = this.props.animalSaga;  
    
    if(!species || !formData || isSubmitting){
      return <span>Loading...</span>
    }

    const { errors, labels } = formData;
    
    const speciesItems = species.map((display,index) => (
      <MenuItem key={index} 
                value={display} 
                primaryText={display} 
                selected={initialValues.species === display} />
    ));
   
    return (
      <div>
        <Typography component="h5" variant="h5">
          {isEditing ? 'Edit' : 'Add'} Animal Form
        </Typography>
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))} 
              noValidate 
              autoComplete="off">
          <Grid container 
              spacing={16}>
            <Grid item xs={12}>
              <Field
                  name="name"
                  component={renderTextField}
                  label={labels.name[0]}
                  hintText={labels.name[1]}
                  required
                  validate={[required, minMaxLengthName, alphaNumericName]}
                  warn={alpha}
                />
            </Grid>
            <Grid item xs={4}>          
              <Field
                name="cost"                
                component={renderTextField}
                label={labels.cost[0]}
                hintText={labels.cost[1]} 
                required               
                validate={[
                  (value, allValues, props, name) => {
                        let customErrors = dynamicValidator(value, {
                          required: true,
                          msg: { required: errors.required }
                        });
                        return customErrors;
                   }
                ]}
                format={formatCost}
                normalize={onlyDecimal}
              />
            </Grid>
          </Grid>
          <Grid container spacing={16}>
            <Grid item xs={12}>
            <Field
                name="species"
                required
                component={renderSelectField}
                label={labels.species[0]}
                hintText={labels.species[1]}     
                defaultValue={initialValues.species}     
                validate={[
                  (value, allValues, props, name) => {
                        let customErrors = dynamicValidator(value, {
                          required: true,
                          msg: { required: errors.required }
                        });
                        return customErrors;
                   }
                ]}
              >
                {speciesItems}
              </Field>
            </Grid>
            <Grid item xs={4}> 
            <Field
              value={this.state.dob ? new Date(this.state.dob) : new Date(initialValues.dob)}
              name="dob"
              component={DatePicker}
              required
              defaultDate={initialValues.dob ? new Date(initialValues.dob) : null}
              floatingLabelText={labels.dob[0]}
              type='text'
              maxDate={new Date()}
              minDate={new Date(moment().subtract(60, 'years').calendar())}
              autoOk
              className="form-control"
              onChange={(event, date)=> this.handleDate(date)}
              formatDate={(date) => moment(date).format('MM-DD-YYYY')}  
              format={null}     
              validate={[required]}               
            />
            </Grid>
          </Grid>
          <Field
              name="oversize"
              component={renderCheckbox}
              label={labels.oversize[0]}
            />
          <div className="form-control mt-1">
            <button type="submit" disabled={((pristine && !this.state.dob) && !isEditing) || submitting}>Submit</button>
            <button type="button" disabled={submitting} onClick={reset}>Reset</button>
            {isEditing && 
            <button type="button" disabled={submitting} onClick={this.cancelEdit}>Cancel</button>
            }
          </div>
        </form>
      </div>
    );
  }
}

AnimalForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  modifyAnimal: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  isEditing: PropTypes.bool,
  editing: PropTypes.number,
  initialValues: PropTypes.object.isRequired,
  pristine: PropTypes.any, // from redux-form
  submitting: PropTypes.any, // from redux-form
  reset:  PropTypes.any, // from redux-form
  handleSubmit: PropTypes.any, // from redux-form
};

export default withStyles(styles)(AnimalForm);
