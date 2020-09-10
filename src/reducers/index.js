export default function (state = {}, action) {
  switch (action.type) {
    case "LOAD_USER":
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
      };

    default:
      return state;
  }
}
