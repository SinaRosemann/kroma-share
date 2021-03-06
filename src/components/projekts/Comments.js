import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// MUI Imports
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";

const styles = theme => ({
  ...theme.spreadThis,
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%"
  }
});

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;

    return (
      <Grid container>
        {comments.map(comment => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item xs={4} sm={2}>
                    <CardMedia
                      image={userImage}
                      title="Profile image"
                      className={classes.projektImage}
                    />
                  </Grid>
                  <Grid item xs={8} sm={10}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="body2"
                
                        color="primary"
                      >
                        <span className={classes.username}>{userHandle}</span> ·{" "}
                        {dayjs(createdAt).fromNow()}
                      </Typography>
                      <Typography variant="body1" className ={classes.projektbody}>{body}</Typography>

                    </div>
                  </Grid>
                </Grid>
              </Grid>
           </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
