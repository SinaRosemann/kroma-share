import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Logo from "../images/kromacloud_logo.png";
import backgroundImage from "../images/kromacloud_04.jpg";

import { Link } from "react-router-dom";

// MUI Imports
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

// Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = theme => ({
  ...theme.spreadThis,
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    height: "100vh"
  }
});

export class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

    return (
      <div className={classes.background}>
        <Grid container className={classes.flexcenter}>
          <Grid item xs={12} sm={4} md={6} lg={8} className={classes.grid} />
          <Grid item xs={12} sm={8} md={6} lg={4} className={classes.grid}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h2" className={classes.pageTitle}>
                  Login
                </Typography>
                <small>
                  Dont have an account yet? sign up {}
                  <Link to="/signup" className={classes.link}>
                    here
                  </Link>
                </small>
                <form
                  noValidate
                  onSubmit={this.handleSubmit}
                  className={classes.form}
                >
                  <TextField
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    className={classes.textField}
                    helperText={errors.email}
                    error={errors.email ? true : false}
                    value={this.state.email}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  <TextField
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    className={classes.textField}
                    helperText={errors.password}
                    error={errors.password ? true : false}
                    value={this.state.password}
                    onChange={this.handleChange}
                    fullWidth
                  />
                  {errors.general && (
                    <Typography
                      varriant="body2"
                      className={classes.customError}
                    >
                      {errors.general}
                    </Typography>
                  )}
                  <Button
                    type="submit"
                    variant="outlined"
                    color="secondary"
                    size="large"
                    className={classes.button}
                  >
                    Login
                    {loading && (
                      <CircularProgress
                        color="secondary"
                        size={30}
                        className={classes.progress}
                      />
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
