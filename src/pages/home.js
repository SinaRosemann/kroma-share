import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import Projekts from "../components/projekts/projekts";
import Profile from '../components/profile/profile';
import ProjektSkeleton from '../util/ProjektSkeleton';

// Redux Stuff
import { connect } from 'react-redux';
import { getProjekts } from '../redux/actions/dataActions'


const styles = theme => ({
  ...theme.spreadThis,
  container: {
    margin: "0px auto",
    paddingTop: "100px",
    maxWidth: "1200px",
  },
  background: {
    backgroundColor: "#666666"
  }
});


export class home extends Component {
  componentDidMount() {
    this.props.getProjekts(); 
  }

  render() {
    const { projekts, loading } = this.props.data;
    const {
      classes
    } = this.props;

    let recentProjektsMarkup = !loading ? (
      projekts.map(projekts => 
        <Projekts key={projekts.projektsId} projekts={projekts} />)) : (
      <ProjektSkeleton/>
    );
    return (
      <div className={classes.background}>
      <Grid container className={classes.container} spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentProjektsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile/>
        </Grid>
      </Grid>
      </div>
    );
  }
}

home.propTypes = {
  getProjekts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  data: state.data
})
export default connect(mapStateToProps, {getProjekts})(withStyles(styles)(home));
