import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import PostProjekt from "../components/projekts/PostProjekt";
import Projekts from "../components/projekts/projekts";
import Profile from "../components/profile/profile";
import ProjektSkeleton from "../util/ProjektSkeleton";
import Typography from "@material-ui/core/Typography";


// MUI
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';


// Redux Stuff
import { connect } from "react-redux";
import { getProjekts } from "../redux/actions/dataActions";

const styles = theme => ({
  ...theme.spreadThis,
  postProjekt: {
    textAlign: "center"
  },
  postProjektIcon: {
    textAlign: "center"
  }
});

export class home extends Component {
  componentDidMount() {
    this.props.getProjekts();
  }

  render() {
    const { projekts, loading } = this.props.data;
    const { classes } = this.props;

    let recentProjektsMarkup = !loading ? (
      projekts.map(projekts => (
        <Projekts key={projekts.projektsId} projekts={projekts} />
      ))
    ) : (
      <ProjektSkeleton />
    );
    return (
      <div className={classes.homeBackground}>
        <Typography
          variant="h1"
          color="secondary"
          className={classes.title}
        >
          Latest Projekts...
        </Typography>
        
        <div className={classes.postProjekt} class="postProjektIcon">
          <PostProjekt />
        </div>

        <Grid container className={classes.homeContainer} spacing={8}>
        <Grid item sm={4} xs={12}>
            <Profile />
          </Grid>
          <Grid item sm={8} xs={12}>
            {recentProjektsMarkup}
          </Grid>

        </Grid>
      </div>
    );
  }
}

home.propTypes = {
  getProjekts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  data: state.data
});
export default connect(mapStateToProps, { getProjekts })(
  withStyles(styles)(home)
);
