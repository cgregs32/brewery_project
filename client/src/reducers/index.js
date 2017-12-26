import { combineReducers } from 'redux'
import flash from './flash'
import {breweries} from './breweries'

const rootReducer = combineReducers({
  flash,
  breweries,
})

export default rootReducer
