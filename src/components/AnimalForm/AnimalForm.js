import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import debounce from 'lodash/debounce';

import moment from 'moment';

import DatePicker from 'material-ui/DatePicker';
//import classNames from 'classnames';
//import moment from 'moment';

import { Field } from 'redux-form';

import MenuItem from 'material-ui/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { renderTextField } from './fields/renderTextField';
import { renderSelectField } from './fields/renderSelectField';
import { renderCheckbox } from './fields/renderCheckbox';
//import { renderDatepicker } from './fields/renderDatepicker';

//import asyncValidate from './asyncValidate';
import { required, alpha, alphaNumericName, minMaxLengthName, numericCost, formatCost, onlyDecimal } from './validate';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});


class AnimalForm extends Component {
  static propTypes = {
    animalSaga: PropTypes.object
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
    if(value){
      this.setState({ dob: value })
    }
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
    const { handleSubmit, pristine, submitting, initialValues, reset, classes } = this.props;
    const { isEditing, isSubmiting, species, formData } = this.props.animalSaga;  
    
    if(!species || !formData || isSubmiting){
      return <span>Loading...</span>
    }

    const title = isEditing ? 'Edit' : 'Add';
    const labels = formData[0].labels;
    const speciesItems = species.map((display,index) => (
      <MenuItem key={index} value={display} primaryText={display} selected={initialValues.species === display} />
    ));
console.log('propr',this.props)
    return (
      <div>
        <Typography component="h5" variant="h5">
          {title} Animal Form
        </Typography>
        <form onSubmit={handleSubmit(this.handleSubmit.bind(this))} autoComplete="off">
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Field
                  name="name"
                  component={renderTextField}
                  label={labels.name[0]}
                  hintText={labels.name[1]}
                  classes={classes['input']}
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
                validate={[required,numericCost]}
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
                validate={[required]}
              >
                {speciesItems}
              </Field>
            </Grid>
            <Grid item xs={4}> 
            <DatePicker
              value={this.state.dob ? this.state.dob : initialValues.dob || null}
              name="dob"
              required
              defaultDate={initialValues.dob || null}
              floatingLabelText={labels.dob[0]}
              type='text'
              errorText={this.props.touched && this.props.error}
              maxDate={new Date()}
              minDate={new Date(moment().subtract(60, 'years').calendar())}
              autoOk
              className="form-control"
              onChange={(event, date)=> this.handleDate(date)}
              formatDate={(date) => moment(date).format('MM-DD-YYYY')}                      
            />
            </Grid>
          </Grid>
          <Field
              name="oversize"
              component={renderCheckbox}
              label="Bigger then a breadbox?"
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
  modifyAnimal: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnimalForm);
