import {TOGGLE_DRAWER} from "../actions/mainActions";

const initialState = {
  drawerOpen: false
};

const mainReducer = (state = initialState, action) => {
  if (action.type === TOGGLE_DRAWER) {
    return {
      ...state, drawerOpen: !state.drawerOpen
    }
  }

  return state;
};

export default mainReducer;