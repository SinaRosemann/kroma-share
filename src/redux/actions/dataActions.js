import {
  SET_PROJEKTS,
  LOADING_DATA,
  LIKE_PROJEKT,
  UNLIKE_PROJEKT,
  DELETE_PROJEKT,
  SET_ERRORS,
  POST_PROJEKT,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_PROJEKT,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from "../types";
import axios from "axios";

// Get all projekts 
export const getProjekts = () => dispatch => { 
  dispatch({ type: LOADING_DATA });
  axios
    .get("/projekts")
    .then(res => {
      dispatch({
        type: SET_PROJEKTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_PROJEKTS,
        payload: []
      });
    });
};


export const getProjekt = projektsId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/projekts/${projektsId}`)
    .then(res => {
      dispatch({
        type: SET_PROJEKT,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

// Post a projekt
export const postProjekt = newProjekt => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/projekts", newProjekt)
    .then(res => {
      dispatch({
        type: POST_PROJEKT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Like a projekt

export const likeProjekt = projektsId => dispatch => {
  axios
    .get(`/projekts/${projektsId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_PROJEKT,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
// Unlike a projekt
export const unlikeProjekt = projektsId => dispatch => {
  axios
    .get(`/projekts/${projektsId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_PROJEKT,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Submit a comment
export const submitComment = (projektsId, commentData) => dispatch => {
  axios
    .post(`/projekts/${projektsId}/comment`, commentData)
    .then(res => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    }) 
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};


// Delete a Projekt
export const deleteProjekt = projektsId => dispatch => {
  axios
    .delete(`/projekts/${projektsId}`)
    .then(() => {
      dispatch({ 
        type: DELETE_PROJEKT,
        payload: projektsId 
      });
    })
    .catch(err => console.log(err));
};

export const getUserData = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => {
      dispatch({
        type: SET_PROJEKTS,
        payload: res.data.projekts
      });
    })
    .catch(() => {
      dispatch({
        type: SET_PROJEKTS,
        payload: null
      });
    });
};

export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};
