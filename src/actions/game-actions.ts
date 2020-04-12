import { BaseAction,GameGeneratorActions } from '../common';
import {IGame, IError, IGameParticipant, IVerifyPassowrd, IGameDetails,IClaimAck} from "../common/interfaces";

// Action Creators  Game List
export const getGameListStartAction = (): BaseAction => ({
    type: GameGeneratorActions.GET_GAMELIST_START,
    payload: null,
});
export const getGameListCompletedAction = (data:IGame[]): BaseAction => ({
    type: GameGeneratorActions.GET_GAMELIST_COMPLETED,
    payload: data,
});
export const getGameListErrorAction = (error:IError): BaseAction => ({
    type: GameGeneratorActions.GET_GAMELIST_ERROR,
    payload: error,
});

// Action Creators  Game Participant
export const getGameParticipantStartAction = (gameId:string): BaseAction => ({
    type: GameGeneratorActions.GET_GAME_PARTICIPANT_START,
    payload: {gameId},
});
export const getGameParticipantCompletedAction = (data:IGameParticipant[]): BaseAction => ({
    type: GameGeneratorActions.GET_GAME_PARTICIPANT_COMPLETED,
    payload: data,
});
export const getGameParticipantErrorAction = (error:IError): BaseAction => ({
    type: GameGeneratorActions.GET_GAME_PARTICIPANT_ERROR,
    payload: error,
});

// Verify password
export const verifyParticipantStartAction = (gameId:string, participantId:string, password:string): BaseAction => ({
    type: GameGeneratorActions.VERIFY_PASSWORD_START,
    payload: {gameId, participantId, password},
});
export const verifyParticipantCompletedAction = (response:IVerifyPassowrd): BaseAction => ({
    type: GameGeneratorActions.VERIFY_PASSWORD_COMPLETED,
    payload: response,
});


// Action Creators  Game Participant
export const getGameDetailsStartAction = (gameId:string,participantId:string): BaseAction => ({
    type: GameGeneratorActions.GET_GAME_DETAILS_START,
    payload: {gameId, participantId},
});
export const getGameDetailsCompletedAction = (data:IGameDetails): BaseAction => ({
    type: GameGeneratorActions.GET_GAME_DETAILS_COMPLETED,
    payload: data,
});
export const getGameDetailsErrorAction = (error:IError): BaseAction => ({
    type: GameGeneratorActions.GET_GAME_DETAILS_ERROR,
    payload: error,
});


/*
CLAIM_BINGO_START:'CLAIM_BINGO_START',
CLAIM_BINGO_COMPLETED:'CLAIM_BINGO_COMPLETED',
CLAIM_BINGO_ERROR:'CLAIM_BINGO_ERROR',
*/
export const claimBingoStartAction = (gameId:string, participantId:string): BaseAction => ({
    type: GameGeneratorActions.CLAIM_BINGO_START,
    payload: {gameId,  participantId},
});
export const claimBingoCompletedAction = (data:IClaimAck): BaseAction => ({
    type: GameGeneratorActions.CLAIM_BINGO_COMPLETED,
    payload: data,
});
export const claimBingoErrorAction = (error:IError): BaseAction => ({
    type: GameGeneratorActions.CLAIM_BINGO_ERROR,
    payload: error,
});

export const startPolling = ():BaseAction=>({
    type:GameGeneratorActions.START_POLLING,
    payload:null
})
export const stopPolling = ():BaseAction=>({
    type:GameGeneratorActions.STOP_POLLING,
    payload:null
})

export const createGameStartAction = (name:string):BaseAction=>({
    type:GameGeneratorActions.CREATE_GAME_START,
    payload:{name}
})
export const createGameCompletedAction = (data:any):BaseAction=>({
    type:GameGeneratorActions.CREATE_GAME_COMPLETED,
    payload:null
})
export const createGameErrorAction = ():BaseAction=>({
    type:GameGeneratorActions.CREATE_GAME_ERROR,
    payload:null
})
export const updateGameStartAction = (gameId:string, game:IGame):BaseAction=>({
    type:GameGeneratorActions.UPDATE_GAME_START,
    payload:{gameId, game}
})
export const updateGameCompletedAction = (data:any):BaseAction=>({
    type:GameGeneratorActions.UPDATE_GAME_COMPLETED,
    payload:data
})
export const updateGameErrorAction = (gameId:string):BaseAction=>({
    type:GameGeneratorActions.UPDATE_GAME_ERROR,
    payload:gameId
})