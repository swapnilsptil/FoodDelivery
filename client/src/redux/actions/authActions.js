import {
  SIGNUP_SUCCESS,
  LOADING_UI,
  SET_ERRORS,
  SERVER_ERROR,
  CLEAR_ERRORS,
  LOADING_USER,
  SET_USER,
  SET_ERROR,
  SET_UNAUTHENTICATED,
  SET_ERRORS_SIGNUP_SELLER,
} from "../types";

import axios from "../../util/axios";

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/auth/signup-user", newUserData)
    .then((res) => {
      dispatch({
        type: SIGNUP_SUCCESS,
      });
      dispatch({ type: CLEAR_ERRORS });
      history.push("/login");
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const loginAction = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/auth/login", userData)
    .then((res) => {
      const jwt = `Bearer ${res.data.token}`;
      localStorage.setItem("jwt", jwt);
      axios.defaults.headers.common["Authorization"] = jwt;
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SET_ERROR,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("/user")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data.result,
      });
    })
    .catch((err) => console.log(err));
};

export const signupSeller = (newSellerData, history) => (dispatch) => {
  dispatch(signupSellerFinal(newSellerData, history));
};

export const signupSellerFinal = (newSellerData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/auth/signup-seller", newSellerData)
    .then((res) => {
      dispatch({
        type: SIGNUP_SUCCESS,
      });
      dispatch({ type: CLEAR_ERRORS });
      history.push("/login");
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: SET_ERRORS_SIGNUP_SELLER,
          payload: err.response.data,
        });
      } else {
        dispatch({
          type: SERVER_ERROR,
        });
      }
    });
};

export const logoutAction = (history) => (dispatch) => {
  localStorage.removeItem("jwt");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
  if (history) history.push("/login");
};
