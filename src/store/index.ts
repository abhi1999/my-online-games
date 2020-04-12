import { createStore, compose, applyMiddleware, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";
import { rootReducers } from '../reducers';
import { rootSaga } from '../sagas';

const sagaMiddleware = createSagaMiddleware();
declare const window:any;
declare const module:any;

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) ||
  compose;
/*
export const store = createStore(
    rootReducers,
    {},
    composeEnhancer(applyMiddleware(sagaMiddleware))
);


sagaMiddleware.run(rootSaga);
*/

const configureStore =(preloadedState?:any)=>{
  const middleware:Middleware[] = [ReduxThunk, sagaMiddleware];

  // if(process.env.NODE_ENV !== 'production') {
      middleware.push(createLogger());
  // }
  const store = createStore(
      rootReducers, 
      preloadedState,
      composeEnhancer(applyMiddleware(...middleware))
   )

  sagaMiddleware.run(rootSaga);
  if(module.hot){
      module.hot.accept("../reducers", ()=>{
          const nextRootReducer = require("../reducers");
          store.replaceReducer(nextRootReducer);
      })
  }
  return store;
}


export default configureStore;