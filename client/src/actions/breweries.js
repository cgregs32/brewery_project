import {setFlash} from './flash'
import axios from 'axios'

export const breweries = () => {
  return(dispatch) => {
    axios.get('/api/all_breweries?page=1&per_page=10')
      .then(res => {
        dispatch({type: "GET_BREWERIES", breweries: res.data.entries})
      })
      .catch( error => {
        dispatch(setFlash('We had trouble retreiving your request.', 'red'))
    });
  }
}

const initialState= {
  breweries: [],
  brewery: [],
}
