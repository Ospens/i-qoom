import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  reducer as reduxFormReducer
} from 'redux-form'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'
import landingReducer from '../reducers/landingReducer'
import projectReducer from '../reducers/projectReducer'
import documentsReducer from '../reducers/documentsReducer'
import { loadState, saveState } from './localStorage'

const rootReducer = combineReducers({
  user: userReducer,
  landing: landingReducer,
  documents: documentsReducer,
  projects: projectReducer,
  form: reduxFormReducer
})

const persistedState = loadState()

const store = createStore(
  rootReducer,
  persistedState.state,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

store.subscribe(() => {
  saveState({
    state: store.getState()
  })
})

export default store
