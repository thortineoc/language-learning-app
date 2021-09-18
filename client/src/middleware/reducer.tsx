const reducer = (state = {}, action: any) => {
  switch (action.type) {
    case "REDIRECT":
      return { redirectTo: action.payload };

    default:
      return state;
  }
};

export default reducer;
