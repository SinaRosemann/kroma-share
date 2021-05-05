import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Projekts from "../components/projekts/projekts";
import StaticProfile from "../components/profile/StaticProfile";
import Profile from "../components/profile/profile";
import Grid from "@material-ui/core/Grid";
import ProjektSkeleton from '../util/ProjektSkeleton'
import ProfileSkeleton from '../util/ProfileSkeleton';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import PostProjekt from "../components/projekts/PostProjekt";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";


const styles = theme => ({
  ...theme.spreadThis
});

class user extends Component {
  state = {
    profile: null,
    projektsIdParam: null
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const projektsId = this.props.match.params.projektsId;

    if (projektsId) this.setState({ projektsIdParam: projektsId });
    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  } 

  componentDidUpdate(prevState) {
    if (prevState.profile !== this.state.profile) {
      
    }
  }


   
  render() {
    const { projekts, loading } = this.props.data;
    const { projektsIdParam } = this.state;
    const { classes , authenticated} = this.props;
    const userhandle = this.props.match.params.handle;


    const projektsMarkup = loading ? (
      <ProjektSkeleton/>
    ) : projekts === null ? (
      <p>No Projekt available </p>
    ) : 
      !projektsIdParam ? (
        projekts.map(projekts => 
          <Projekts key={projekts.projektsId} projekts={projekts} />)
      ) : (
        projekts.map(projekts => {
          if(projekts.projektsId !== projektsIdParam) 
          return <Projekts key={projekts.projektsId} projekts={projekts} />
          else return <Projekts key={projekts.projektsId} projekts={projekts} openDialog/>
        })
      )
    ;

    let userMarkup = authenticated ? (
      <div className={classes.homeBackground}>
        <Typography
          variant="h1"
          color="secondary"
          className={classes.title}
        >{userhandle}'s Projekts 
        </Typography>
{/*         <div className="postProjektIcon">
          <PostProjekt />
        </div> */}

      <Grid container className={classes.homeContainer} spacing={8}>
      <Grid item md={4} sm={12} xs={12} >
          {this.state.profile === null ? (
            <ProfileSkeleton/>
          ) : (
          
            <StaticProfile profile={this.state.profile} /> 

          )}
        </Grid>
        <Grid item md={8} sm={12} xs={12}>
          {projektsMarkup}
        </Grid>
        
      </Grid>
      </div>
    ) : (
      <div className={classes.homeBackground}>
        <Typography
          variant="h1"
          color="secondary"
          className={classes.title}
        >{userhandle} Projekts 
        </Typography>
      <Grid container className={classes.homeContainer} spacing={8}>
      <Grid item md={4} sm={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton/>
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
        <Grid item md={8} sm={12}>
          {projektsMarkup}
        </Grid>
        
      </Grid>
      </div>
    )


    return userMarkup
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired

};

const mapStateToProps = state => ({
  data: state.data,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { getUserData })(
  withStyles(styles)(user)
);
