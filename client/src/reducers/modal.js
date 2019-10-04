var mapInitialState = {
  modalId: null,
  modalOptions: null,
};

const mapStateData = (state = mapInitialState, action) => {
  if(action.type === 'SET_MODAL'){
    state.modalId = action.modalId;

    if (action.modalOptions) {
      state.modalOptions = action.modalOptions;
    }
    return Object.assign({}, state); 
  }

  if(action.type === 'CLOSE_MODAL'){
    state.modalId = null;
    state.modalOptions = null;
    return Object.assign({}, state); 
  }

  return state;
}

export default mapStateData;