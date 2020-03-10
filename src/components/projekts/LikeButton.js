import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// REdux
import { connect } from 'react-redux';
import { likeProjekt, unlikeProjekt } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
  likedProjekt = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.projektsId === this.props.projektsId
      )
    )
      return true;
    else return false;
  };
  likeProjekt = () => {
    this.props.likeProjekt(this.props.projektsId);
  };
  unlikeProjekt = () => {
    this.props.unlikeProjekt(this.props.projektsId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedProjekt() ? (
      <MyButton tip="Undo like" onClick={this.unlikeProjekt}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeProjekt}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  projektsId: PropTypes.string.isRequired,
  likeProjekt: PropTypes.func.isRequired,
  unlikeProjekt: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
    likeProjekt,
    unlikeProjekt
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(LikeButton);