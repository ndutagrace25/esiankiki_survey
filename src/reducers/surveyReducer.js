import {
  GET_ALL_CATEGORIES,
  GET_ALL_CATEGORIES_ERROR,
  GET_ALL_QUESTIONS,
  GET_ALL_QUESTIONS_ERROR,
  GET_ALL_USERS,
  GET_ALL_USERS_ERROR,
} from "../actions/types";

const initialState = {
  allCategories: [],
  allCategoriesErr: {},
  allQuestions: [],
  allQuestionsErr: {},
  allUsers: [],
  allUsersErr: {},
};

export default function red(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload,
      };
    case GET_ALL_CATEGORIES_ERROR:
      return {
        ...state,
        allCategoriesErr: action.payload,
      };
    case GET_ALL_QUESTIONS:
      return {
        ...state,
        allQuestions: action.payload,
      };
    case GET_ALL_QUESTIONS_ERROR:
      return {
        ...state,
        allQuestionsErr: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case GET_ALL_USERS_ERROR:
      return {
        ...state,
        allUsersErr: action.payload,
      };

    default:
      return state;
  }
}
