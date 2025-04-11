import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import rootReducer from './root-reducer'

const store = createStore(rootReducer, applyMiddleware(logger as any))

export type RootState = ReturnType<typeof store.getState>

export default store
