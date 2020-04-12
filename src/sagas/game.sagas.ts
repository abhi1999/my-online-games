import { take,race, delay, select, call, put, takeEvery, all, fork  } from 'redux-saga/effects';
import { getGameList,getGameParticipants,verifyPassword,getGameDetails,claimBingo, createGame, updateGameById} from '../api';
import { GameActions } from '../actions/index';
import { BaseAction, GameGeneratorActions}  from '../common';
import { IGameDetails, IGameParticipant, IGame, IVerifyPassowrd, IClaimAck } from '../common/interfaces';
import { IApplicationState } from '../reducers';


// Watch for the start action and then trigger request generate number 
function* watchGameListLookupRequestStart() {
  yield takeEvery(
    GameGeneratorActions.GET_GAMELIST_START,
    requestGameListLookup
  );
}
function* requestGameListLookup(reduxAction:BaseAction){
  console.log('Requesting Game List')
  const data:IGame[] = (yield call (getGameList)).data
  data.forEach(d=> d.id = d._id?d._id:d.id)
  yield put(GameActions.getGameListCompletedAction(data)) ;
}
function* watchGameParticipantLookupStartStart() {
    yield takeEvery(
      GameGeneratorActions.GET_GAME_PARTICIPANT_START,
      requestGameParticipantsLookup
    );
}
function* requestGameParticipantsLookup(reduxAction:BaseAction){
  console.log('Requesting Game participants')
  const gameId:string = reduxAction.payload.gameId;
  const data:IGameParticipant[] = (yield call (getGameParticipants, gameId)).data
  yield put(GameActions.getGameParticipantCompletedAction(data)) ;
}
function* watchGameVerifyPasswordRequestStart() {
    yield takeEvery(
      GameGeneratorActions.VERIFY_PASSWORD_START,
      requestVerifyPassword
    );
}
function* requestVerifyPassword(reduxAction:BaseAction){
  console.log('Requesting Verify Password', reduxAction.payload)
  const {participantId, password} = reduxAction.payload;
  const state:IApplicationState = yield select();
  const gameId=state.gamesReducer.activeGameId;
  const data:IVerifyPassowrd = (yield call (verifyPassword, gameId,participantId, password)).data
  if(data.isValid){
    yield put(GameActions.getGameDetailsStartAction(gameId, participantId))
    yield put(GameActions.startPolling())
  }
  yield put(GameActions.verifyParticipantCompletedAction(data)) ;
}

function* watchGameDetailsRequestStart() {
  yield takeEvery(
    GameGeneratorActions.GET_GAME_DETAILS_START,
    requestGameDetails
  );
}
function* requestGameDetails(reduxAction:BaseAction){
  console.log('Requesting Game Details')
  const {gameId, participantId} = reduxAction.payload;
  const data:IGameDetails = (yield call (getGameDetails, gameId,participantId)).data
  yield put(GameActions.getGameDetailsCompletedAction(data)) ;
}

function* watchClaimBingRequestStart() {
  yield takeEvery(
    GameGeneratorActions.CLAIM_BINGO_START,
    requestClaimBingo
  );
}
function* requestClaimBingo(reduxAction:BaseAction){
  console.log('Requesting Game Details')
  const {gameId,participantId} = reduxAction.payload;
  const data:IClaimAck = (yield call (claimBingo, gameId, participantId)).data
  yield put(GameActions.claimBingoCompletedAction(data)) ;
}

/**
 * Saga worker.
 */
function* pollSagaWorker() {
  while (true) {
    try {
      const state:IApplicationState = yield select();
      const gameId =state.gamesReducer.activeGameId;
      const participantId =state.gamesReducer.activeParticipantId?state.gamesReducer.activeParticipantId:"";
      if(participantId !==""){
        yield put(GameActions.getGameDetailsStartAction(gameId, participantId))
      }
      yield delay(4000)
    } catch (err) {
      yield put(GameActions.stopPolling());
    }
  }
}

/**
 * Saga watcher.
 */
function* pollSagaWatcher() {
  while (true) {
    yield take(GameGeneratorActions.START_POLLING);
    yield race([
      call(pollSagaWorker),
      take(GameGeneratorActions.STOP_POLLING)
    ]);
  }
}


function* watchCreateGameRequestStart() {
  yield takeEvery(
    GameGeneratorActions.CREATE_GAME_START,
    requestCreateGame
  );
}
function* requestCreateGame(reduxAction:BaseAction){
  console.log('Creating Game Game Details')
  const {name} = reduxAction.payload;
  const data:IGameDetails = (yield call (createGame, name)).data
  yield put(GameActions.getGameListStartAction())
  yield put(GameActions.createGameCompletedAction(data))
}

function* watchUpdateGameRequestStart() {
  yield takeEvery(
    GameGeneratorActions.UPDATE_GAME_START,
    requestUpdateGame
  );
}
function* requestUpdateGame(reduxAction:BaseAction){
  console.log('Creating Game Game Details')
  const game :IGame = reduxAction.payload.game;
  const gameId: string = reduxAction.payload.gameId
  const data:IGameDetails = (yield call (updateGameById,gameId, game)).data
  yield put(GameActions.getGameListStartAction())
  yield put(GameActions.updateGameCompletedAction(data))
}

export default function* rootSaga() {
    yield all([
        fork(watchGameListLookupRequestStart),
        fork(watchGameParticipantLookupStartStart),
        fork(watchGameVerifyPasswordRequestStart),
        fork(watchGameDetailsRequestStart),
        fork(watchClaimBingRequestStart),
        pollSagaWatcher(),
        fork(watchCreateGameRequestStart),
        fork(watchUpdateGameRequestStart)
    ]);
}
