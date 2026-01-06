import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
  LOGIN_TWO_STEP_FAILURE,
  LOGIN_TWO_STEP_SUCCESS,
} from "./ActionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
  jwt: null,
};

// Reducer function to handle authentication state
// It takes the current state and an action as arguments
const authReducer = (state = initialState, action) => 
{
  // switch statement to handle different action types
  // Each case corresponds to a specific action type
  // and updates the state accordingly
  switch (action.type) 
  {
    // handling the request action for registration,login, and getting user data
    // This will set the loading state to true and reset any previous error
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
      return { ...state, loading: true, error: null };

    // handling the success action for registration,login, and getting user data
    // This will set the loading state to false and 
    // payload : we update the jwt token
    case REGISTER_SUCCESS:
      return { ...state, loading: false, jwt:action.payload };

     
    case LOGIN_SUCCESS:
      return { ...state, loading: false, jwt: action.payload };

      case LOGIN_TWO_STEP_SUCCESS:
      return { ...state, loading: false, jwt: action.payload };

    // handling the success action for getting user data
    // This will set the loading state to false and update the user data
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        fetchingUser: false,
        
      };

    // handling the failure action for registration,login, and getting user data
    // This will set the loading state to false and update the error message
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
    case GET_USER_FAILURE:
    case LOGIN_TWO_STEP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      localStorage.removeItem("jwt");
      return { ...state, jwt: null, user: null };

    default:
      return state;
  }
};

export default authReducer;
