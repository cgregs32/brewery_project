const initialState = {
  breweries: [],
  brewery: [],
}

const beweries = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_BREWERIES':
      return { ...state, breweries: action.breweries};
    case 'SET_BREWERY':
      return { ...state, brewery: action.brewery};
    default:
      return state;
  }
}
