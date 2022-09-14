import { axios } from "../utils";
import {
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_ERROR,
  GET_ALL_QUESTIONS,
  GET_ALL_QUESTIONS_ERROR,
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
} from "./types";
import Swal from "sweetalert2";

// get all categories
export const getAllCategories = () => (dispatch) => {
  let url = `category`;
  axios
    .get(url)
    .then((response) => {
      dispatch({
        type: GET_ALL_CATEGORIES,
        payload: response.data,
      });
    })
    .catch((error) => {
      if (error.message) {
        Swal.fire("Error", error.message, "error");
        dispatch({
          type: GET_ALL_CATEGORIES_ERROR,
          payload: error.message,
        });
      } else {
        Swal.fire("Error", error.response.data.message, "error");
        dispatch({
          type: GET_ALL_CATEGORIES_ERROR,
          payload: error.response.data,
        });
      }
    });
};

// get all questions
export const getAllQuestions = () => (dispatch) => {
  let url = `question`;
  axios
    .get(url)
    .then((response) => {
      dispatch({
        type: GET_ALL_QUESTIONS,
        payload: response.data,
      });
    })
    .catch((error) => {
      if (error.message) {
        Swal.fire("Error", error.message, "error");
        dispatch({
          type: GET_ALL_QUESTIONS_ERROR,
          payload: error.message,
        });
      } else {
        Swal.fire("Error", error.response.data.message, "error");
        dispatch({
          type: GET_ALL_QUESTIONS_ERROR,
          payload: error.response.data,
        });
      }
    });
};

// get all users
export const getAllUsers = (id, data) => (dispatch) => {
  let url = `user`;
  axios
    .get(url, data)
    .then((response) => {
      dispatch({
        type: GET_ALL_USERS,
        payload: response.data,
      });
    })
    .catch((error) => {
      if (error.message) {
        Swal.fire("Error", error.message, "error");
        dispatch({
          type: GET_ALL_USERS_ERROR,
          payload: error.message,
        });
      } else {
        Swal.fire("Error", error.response.data.message, "error");
        dispatch({
          type: GET_ALL_USERS_ERROR,
          payload: error.response.data,
        });
      }
    });
};
