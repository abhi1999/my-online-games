import { all, fork } from 'redux-saga/effects';
import { watchNewGeneratedNumberRequestStart } from './number-collection.sagas';
import lookupSagas from "./lookup-collection.sagas";
import gameSagas  from "./game.sagas";

export const rootSaga = function* root() {
  yield all([
    fork(watchNewGeneratedNumberRequestStart),
    lookupSagas(),
    gameSagas()
  ]);
};