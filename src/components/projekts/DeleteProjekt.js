import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

// MUI Imports
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from "react-redux";
import { deleteProjekt } from "../../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadThis
});

class DeleteProjekt extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteProjekt = () => {
    this.props.deleteProjekt(this.props.projektsId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Delete Projekt"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteIcon fontSize="small"  color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleOpen}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {" "}
            Are you sure you want to delete this Projekt?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.deleteProjekt} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteProjekt.propTypes = {
  deleteProjekt: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  projektsId: PropTypes.string.isRequired
};

export default connect(null, { deleteProjekt })(
  withStyles(styles)(DeleteProjekt)
);
