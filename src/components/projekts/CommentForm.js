import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from "react-router-dom";

// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// Redux stuff
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.spreadThis,
  commentForm: {
    textAlign: "center",
    padding: "50px"
  },
  visibleSeperator: {
    width: "100%",
    margin: "0px auto 30px auto",
    colort: "#f0f0f0"
  },
  loginText: {
    fontSize: "12px"
    }
});

class CommentForm extends Component {
  state = {
    body: '',
    errors: {}
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '' });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitComment(this.props.projektsId, { body: this.state.body });
  };

  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;

    const commentFormMarkup = authenticated ? (
      <Grid item sm={12} >
        <form onSubmit={this.handleSubmit} className={classes.commentForm}>
        <Typography
            variant="h5"
            color="primary"
          > Leave a comment or note
          </Typography>

          <TextField
            name="body"
            type="text"
            label="Your thoughts"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <Typography
            variant="h6"
            color="primary"
          > Latest Comments
          </Typography>
        <hr className={classes.visibleSeperator} />
      </Grid>
    ) : (
      <Grid item sm={12} >
        <Typography
            variant="h6"
            color="primary"
          > Latest Comments
          </Typography>
          <span className={classes.loginText}><Link to="/login" className={classes.link} >
                    Login 
    </Link> {} to Comment </span>
          
        <hr className={classes.visibleSeperator} />
      </Grid>
    );
    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  projektsId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(
  mapStateToProps,
  { submitComment }
)(withStyles(styles)(CommentForm));