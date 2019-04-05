import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import AppNavBar from './AppNavBar';
import NotesTable from './NotesTable';

const styles = theme => ({

});

function BodyGridContainer(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppNavBar/>
      <NotesTable/>
    </div>
  );
}

BodyGridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BodyGridContainer);
