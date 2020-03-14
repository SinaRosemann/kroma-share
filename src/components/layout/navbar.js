import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import MyButton from "../../util/MyButton";
import PropTypes from "prop-types";
import PostProjekt from "../projekts/PostProjekt";
import Notifications from "./Notifications";
import Logo from "../../images/kromacloud_logo.png";
import withStyles from "@material-ui/core/styles/withStyles";
import Profilepicture from "../profile/profilepicture";

// Redux stuff
import { connect } from "react-redux";

// Material UI Imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import HomeIcon from "@material-ui/icons/Home";

const styles = theme => ({
  ...theme.spreadThis,
  icons: {
    position: "fixed",
    display: "inline-flex",
    right: "20px"
  },
  logo: {
    maxHeight: "80px"
  }
});

export class navbar extends Component {
  render() {
    const { classes, authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className={classes.navContainer}>
          <Link to="/">
            {" "}
            <img src={Logo} alt="logo kroma cloud" className={classes.logo} />
          </Link>
          {authenticated ? (
            <div className={classes.icons}>
              <Fragment>
                <Profilepicture />
                <PostProjekt />
                <Link to="/">
                  <MyButton tip="Home">
                    <HomeIcon color="secondary" />
                  </MyButton>
                </Link>
                <Notifications color="secondary" />
              </Fragment>
            </div>
          ) : (
            <div className={classes.icons}>
              <Fragment className={classes.icons}>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </Fragment>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(withStyles(styles)(navbar));
