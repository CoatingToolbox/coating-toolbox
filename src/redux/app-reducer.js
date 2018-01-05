
const appInitialState = { isAdmin: false};
    
    // create a reducer for actions
function appReducer(state = appInitialState, action) {
    switch(action.type) {
        case "SET_ADMIN":
            return Object.assign({}, state, {isAdmin: action.value});
        default: 
            return state;
    }
}