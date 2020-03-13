import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import DeleteProjekt from "../projekts/DeleteProjekt";
import ProjektDialog from "./ProjektDialog";
import LikeButton from "./LikeButton";
import Comments from "./Comments";

// MUI Imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

// Redux stuuf
import { connect } from "react-redux";
import {
  likeProjekt,
  unlikeProjekt,
  getProjekt
} from "../../redux/actions/dataActions";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  image: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  name: {
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#ff2420"
  },
  body: {
    padding: "20px 0px"
  }
};

class projekts extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      projekts: {
        body,
        createdAt,
        userImage,
        userHandle,
        projektsId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteProjekt projektsId={projektsId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardContent>
          <CardMedia
            image={userImage}
            title="Profile image"
            className={classes.image}
          />
          {deleteButton}
        </CardContent>
        <CardContent className={classes.content}>
        <Typography
            variant="body2"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
           <span className={classes.name}>{userHandle}</span>  · {dayjs(createdAt).fromNow()}
          </Typography>
          
          <Typography variant="body1" className ={classes.body}>{body}</Typography>
          <LikeButton projektsId={projektsId} />
          <span>{likeCount}</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount}</span>
          <ProjektDialog
            projektsId={projektsId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />

        </CardContent>
      </Card>

      /*    <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />  
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          <LikeButton projektsId={projektsId} />
          <span>{likeCount}</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount}</span>
          <ProjektDialog
            projektsId={projektsId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card> */
    );
  }
}

projekts.proptypess = {
  getProjekt: PropTypes.func.isRequired,
  projektid: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  likeProjekt: PropTypes.func.isRequired,
  unlikeProjekt: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  projekts: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  openDialog: PropTypes.boolean
};

const mapStateToProps = state => ({
  user: state.user,
  projekt: state.data.projekt,
  UI: state.UI
});

const mapActionsToProps = {
  likeProjekt,
  unlikeProjekt,
  getProjekt
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(projekts));
