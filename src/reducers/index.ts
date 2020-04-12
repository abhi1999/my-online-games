import { combineReducers } from 'redux';

import {
  numberCollectionReducer,
  NumberCollectionState,
} from './number-collection.reducer';

import{
  LookupCollectionState,
  lookupCollectionReducer
} from "./lookup-collection.reducer";

import {reducer as notifications} from 'react-notification-system-redux';
 

export interface IApplicationState {
  numberCollection: NumberCollectionState;
  notifications: any
  lookupCollection:LookupCollectionState
}

export const rootReducers = combineReducers<IApplicationState>({
  numberCollection: numberCollectionReducer,
  notifications: notifications,
  lookupCollection:lookupCollectionReducer
});