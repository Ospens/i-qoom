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
import conventionReducer from '../reducers/conventionReducer'
import accessRightsReducer from '../reducers/accessRightsReducer'
import filterReducer from '../reducers/filterReducer'
import distributionGroupReducer from '../reducers/distributionGroupReducer'
import { loadState, saveState } from './localStorage'

const rootReducer = combineReducers({
  user: userReducer,
  landing: landingReducer,
  documents: documentsReducer,
  projects: projectReducer,
  conventions: conventionReducer,
  accessRights: accessRightsReducer,
  filters: filterReducer,
  distributionGroups: distributionGroupReducer,
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
