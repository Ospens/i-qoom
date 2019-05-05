import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  reducer as reduxFormReducer
} from 'redux-form'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import landingReducer from '../reducers/landingReducer'
import projectReducer from '../reducers/projectReducer'

const rootReducer = combineReducers({
  user: userReducer,
  landing: landingReducer,
  projects: projectReducer,
  form: reduxFormReducer
})

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)
