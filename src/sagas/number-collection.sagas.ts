import { call, put, takeEvery } from 'redux-saga/effects';
import { generateNewNumber } from '../api/numberGenerator.api';
import { NumberActions } from '../actions/index';
import {NumberGeneratorActions}  from '../common';


// Watch for the start action and then trigger request generate number 
export function* watchNewGeneratedNumberRequestStart() {
  yield takeEvery(
    NumberGeneratorActions.GET_NUMBER_REQUEST_START,
    requestNewGeneratedNumber
  );
}

function* requestNewGeneratedNumber() {
    const generatedNumber = yield call(generateNewNumber);
    yield put(NumberActions.numberRequestCompletedAction(generatedNumber));
}