import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';

// Redux stuff
import { connect } from 'react-redux';
import { getProjekt, clearErrors, getProjekts} from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    [theme.breakpoints.down("xs")]: {
      left: '85%',
    },
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  }
});

class ProjektDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: ''
  };

  
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  } 


  handleOpen = () => {
    
    let oldPath = window.location.pathname;

    const { userHandle, projektsId } = this.props;
    const newPath = `/users/${userHandle}/projekts/${projektsId}`;

    if (oldPath === newPath) {
      oldPath = `/users/${userHandle}`;
    }

    window.history.pushState(null, null, newPath);
 
    this.setState({ open: true, oldPath, newPath });
    this.props.getProjekt(this.props.projektsId);

  };
  handleClose = () => {

    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();


  };

  render() {
    const {
      classes,
      projekt: {
        projektsId,
        body,
        createdAt,
        userImage,
        userHandle,
        comments
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={2}>
        <Grid item sm={2}>
          <CardMedia
            image={userImage}
            title="Profile image"
            className={classes.projektImage}
          />
        </Grid>
        <Grid item sm={10}>
        <Typography
            variant="body2"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
           <span className={classes.username}>{userHandle}</span>  · {dayjs(createdAt).fromNow()}
          </Typography>

          <Typography variant="body1" className ={classes.projektbody}>{body}</Typography>
        </Grid>
      <CommentForm projektsId={projektsId} />
      <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Comment on projekt"
          tipClassName={classes.expandButton}
        >
          <ChatIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ProjektDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getProjekt: PropTypes.func.isRequired,
  projektsId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  projekt: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  getProjekts: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
    projekt: state.data.projekt,
  UI: state.UI
});

const mapActionsToProps = {
    getProjekt,
  clearErrors,
  getProjekts
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ProjektDialog));