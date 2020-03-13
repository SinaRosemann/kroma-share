import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import MyButton from "../../util/MyButton";

/// MUI stuff
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";

// Icons
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

// Redux
import { connect } from "react-redux";


const styles = theme => ({
    ...theme.spreadThis,
    profile: {
        display: "inline-flex",
        alignItems: "center"
    },
    profileImage: {
        height: "20px",
        width: "20px",
        borderRadius: "50%"
    },
    logout: {
        color: "#ffffff"
    },
    name: {
        color: "#ffffff",
        fontSize: "14px",
        letterSpacing: "2px",
        padding: "0px 20px 0px 10px",
        textTransform: "uppercase",
        "&:hover": {
            textDecoration: "none",
          }
    }
  });


export class Profilepicture extends Component {
    render() {
        const {
            classes,
            user: {
              credentials: { handle, imageUrl },
              loading,
              authenticated
            }
          } = this.props;

          let profilepic = !loading ? 
            authenticated ? (
                <div className={classes.profile}>
                                      <img src={imageUrl} alt="profile" className={classes.profileImage} />

                    <MuiLink
                      component={Link}
                      to={`/users/${handle}`}
                      variant="p"
                      className={classes.name}
                    >
                      { } {handle}
                    </MuiLink>
                </div>
            ) : (
                <MuiLink
                      component={Link}
                      to={"/login"}
                      color="primary"
                      variant="h5"
                    >
                      Login
                    </MuiLink>
            ) : (<div></div>)
        return profilepic
    }
}

const mapStateToProps = state => ({
    user: state.user
  });


Profilepicture.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };

export default connect(
  mapStateToProps)(withStyles(styles)(Profilepicture));
