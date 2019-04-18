//Set initial state
const initState = {
  isAuth: false,
  user: {}
};

//Export state accordingly to how its manipulated with the help of action type, if no change return initState.
export default (state = initState, action) => {
  switch (action.type) {
    default:
    return state;
  }
}
