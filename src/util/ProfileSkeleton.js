import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI
import Paper from '@material-ui/core/Paper';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = (theme) => ({
  ...theme.spreadThis,
  imagewrapper: {
    backgroundColor: "#666666",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    margin: "0px auto"
  },
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: '0 auto 7px auto'
  },
  fullLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '50%',
    marginBottom: 10
  }
});

const ProfileSkeleton = (props) => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className={classes.imagewrapper}>
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn color="primary" fontSize="small"/> <span className={classes.bioText}>Location</span>
          <hr />
          <LinkIcon color="primary" fontSize="small"/><span className={classes.bioText}> https://website.com</span>
          <hr />
          <CalendarToday color="primary" fontSize="small"/> <span className={classes.bioText}> Joined date</span>
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);