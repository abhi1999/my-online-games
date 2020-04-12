import { call, put, takeEvery, all, fork  } from 'redux-saga/effects';
import { // getJobSites, 
  createJobSite, updateJobSiteById } from '../api';
import { LookupActions } from '../actions/index';
import {JobsiteGeneratorActions, LookupGeneratorActions, BaseAction}  from '../common';


// Watch for the start action and then trigger request generate number 
function* watchJobsiteLookupRequestStart() {
  yield takeEvery(
    JobsiteGeneratorActions.GET_LOOKUP_SITES_START,
    requestAllJobSites
  );
}
function* watchAllLookupStartStart() {
    yield takeEvery(
      LookupGeneratorActions.GET_ALL_LOOKUP_START,
      requestAllLookup
    );
}
function* watchJobsiteCreateRequestStart() {
    yield takeEvery(
      JobsiteGeneratorActions.CREATE_JOB_SITES_START,
      requestCreateJobSite
    );
}
function* watchJobsiteUpdateRequestStart() {
  yield takeEvery(
    JobsiteGeneratorActions.UPDATE_JOB_SITE_START,
    requestUpdateJobSite
  );
}
function* requestAllLookup(){
    console.log('All Lookup Start')
   yield requestAllJobSites();
}

function* requestAllJobSites() {


    console.log('Jobsites Lookup Start')
    yield put(LookupActions.getJobSitesCompletedAction([]));
 //   const data = yield call(getJobSites);
 //   yield put(LookupActions.getJobSitesCompletedAction(data.data));
}

function* requestCreateJobSite(reduxAction:BaseAction) {
  debugger;
    console.log('Create jobsite Start')
    const data = yield call(createJobSite, reduxAction.payload);
    yield put(LookupActions.createJobSitesCompleteAction(data));
    yield put(LookupActions.getJobSitesStartAction())
}

function* requestUpdateJobSite(reduxAction:BaseAction) {
  debugger;
  console.log('update jobsite Start')
  const {payload}= reduxAction
  const data = yield call(updateJobSiteById, payload.id, payload.data);
  yield put(LookupActions.updateJobSitesCompleteAction(data));
  yield put(LookupActions.getJobSitesStartAction())
}

export default function* rootSaga() {
    yield all([
        fork(watchJobsiteLookupRequestStart),
        fork(watchAllLookupStartStart),
        fork(watchJobsiteCreateRequestStart),
        fork(watchJobsiteUpdateRequestStart)
    ]);
}
