import React from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

const styles = theme => ({
  card: {
    display: 'flex',
    marginRight: 15,
    minWidth: 400,
  },
  row: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },  
  content: {
    padding: 10,
  },
  cover: {
    maxWidth: 140,
    maxHeight: 180,
  },
  avatar: {
    display: 'flex',
    flexDirection: 'column',
    margin: 10,
    width: 80,
    height: 80,
  },
  actions: {
    justifyContent: 'right',
  }
});

const AnimalDisplay = ({ classes, theme, animal, key, handleEdit, handleDelete, isEditing, isSubmiting }) => {

  if(!animal){ return <span>Loading...</span>}

  const dateOfBirth = `Born on ${moment(new Date(animal.dob)).format('LL')}`;
  const maintenanceCost = `Maintenance is ${formatter.format(animal.cost)}`;
  const animalImage = animal.species.toLowerCase().replace(' ', '-');

  if(isEditing && isSubmiting) return <div>Loading...</div>;

  return (
    
    <Grid item xs={6} {...key}>
      <Card className={classes.card}> 
      <div className={classes.row}> 
        <Avatar
          alt={animal.species}
          src={`/images/${animalImage}.jpg`}
          className={classes.avatar}
        />
        </div>
        <div className={classes.details}> 
          <CardContent className={classes.content}>
            <Typography component="h6" variant="h6">
              {animal.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {animal.species}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {dateOfBirth}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {maintenanceCost}
            </Typography>
            <br />
            <Typography variant="caption" color="textPrimary">
              <span>This animal is {animal.oversize && <span>not</span>} bigger then a breadbox.</span>
            </Typography>
          </CardContent>        
          <CardActions className={classes.actions}>
          <Button size="small" disabled={isEditing} onClick={handleEdit} color="primary">
          Edit
          </Button>
          <Button size="small" disabled={isEditing} onClick={handleDelete} color="primary">
          Delete
          </Button>
          </CardActions>
          </div>
      </Card>
    </Grid>
  );
}

AnimalDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  isEditing: PropTypes.bool
};

export default withStyles(styles)(AnimalDisplay);
