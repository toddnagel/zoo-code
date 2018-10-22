import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import AnimalList from '../components/AnimalList';
import AnimalForm from '../components/AnimalForm';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    maxWidth: 1600,
    minWidth: 1160,
    margin: 'auto',
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  paper: {
    padding: theme.spacing.unit * 2,
  },
  form: {
    padding: theme.spacing.unit * 2,
    minWidth: 320,
    color: theme.palette.text.secondary,
  },
});

const HomePage = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={16}>
          <Grid item xs={8}>
            <AnimalList />
          </Grid>
          <Grid item xs={4}>
            <Paper className={classes.form}>
              <AnimalForm />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
