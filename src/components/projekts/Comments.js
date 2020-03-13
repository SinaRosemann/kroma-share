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
  },
  visibleSeperator: {
    width: "100%",
    margin: "0px auto 20px auto",
    colort: "#f0f0f0"
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
                  <Grid item sm={2}>
                    <CardMedia
                      image={userImage}
                      title="Profile image"
                      className={classes.projektImage}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="body2"
                        component={Link}
                        to={`/users/${userHandle}`}
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
{/*               <hr className={classes.visibleSeperator} />
 */}            </Fragment>
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
