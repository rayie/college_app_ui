//reducer for me
export function me(
  state = {
    sessionId: null,
    user: null,
  },
  action
) {
  switch (action.type) {
    case "LOGOUT_ME":
      return Object.assign({}, state, {
        user: null,
        env: {},
        isLoggedIn: false,
        isFetching: false,
        error: null,
        errorFrom: null,
      });
    case "STORE_SA_TOKEN":
      return Object.assign({}, state, {
        saToken: action.saToken,
      });
    case "REQUEST_ME":
      return Object.assign({}, state, {
        isFetching: true,
      });
    case "FAILED_RECEIVED_ME":
      return Object.assign({}, state, {
        isFetching: false,
        landingChecked: true,
        isLoggedIn: false,
        error: action.error,
        errorFrom: action.from,
      });
    case "RECEIVED_ME":
      /*
		  window.rollbar = new Rollbar(window.ROLLBAR_CONFIG)
		  window.rollbar.configure({
		    payload: {
		      ver: process.env.REACT_APP_VER,
		      person: {
			_id: action.meDoc.user._id,
			nm: action.meDoc.user.nm
		      }
		    }
		  })
		  */
      return Object.assign({}, state, {
        user: action.meDoc.user,
        landingChecked: true,
        isLoggedIn: true,
        isFetching: false,
        error: null,
        errorFrom: null,
      });
    case "RECEIVED_ME_REFRESH":
      return Object.assign({}, state, {
        user: action.user,
        ...state,
      });
    case "FAILED_RECEIVED_ME_REFRESH":
      return state;
    /*
		  return Object.assign({}, state, {
		    user: false,
		    isFetching: false,
		    landingChecked: true,
		    isLoggedIn: false,
		    error: action.error,
		    errorFrom: action.from
		  })
		  */
    case "GOT_UPDATED_USER":
      return Object.assign({}, state, {
        user: action.user,
      });
    case "TOGGLE_FILTER":
      return Object.assign({}, state, {
        filterOpen: action.open,
      });
    case "SET_TITLE":
      return Object.assign({}, state, {
        title: action.title,
      });
    case "SET_UV_API_ENV":
      return Object.assign({}, state, {
        uv_api_env: action.uv_api_env,
      });
    case "SET_INK_API_ENV":
      return Object.assign({}, state, {
        ink_api_env: action.ink_api_env,
      });
    default:
      return state;
  }
}

//reducer for me
export function landing(
  state = {
    lading_records: null,
  },
  action
) {
  switch (action.type) {
    case "SET_INK_API_ENV":
      return Object.assign({}, state, {
        ink_api_env: action.ink_api_env,
      });
    default:
      return state;
  }
}
