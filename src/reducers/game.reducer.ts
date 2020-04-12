
import { BaseAction, GameGeneratorActions } from './../common';
import {IBingoRow,IGame, IError, IGameParticipant, IVerifyPassowrd, IGameWinItem,IGameDetails} from "./../common/interfaces"

export type GameState={
    games:IGame[],
    gameParticipants:IGameParticipant[],
    activeGameId:string,
    activeParticipantId?:string,
    bingoCardNumbers:IBingoRow[],
    loading:boolean,

    loadingGameList?:boolean,
    loadingParticipant?:boolean,
    loadingCheckPassowrd?:boolean,
    loadingGameDetails?:boolean,

    hasError:boolean,
    error?:IError,
    validGame:boolean,
    winItems:IGameWinItem[],
    calledNumbers:number[],
    updateTime?:any,
    refreshedTime?:any

}

const defaultValues:GameState={
    games:[],
    gameParticipants:[],
    activeGameId:'',
    bingoCardNumbers:[],
    loading:false,
    hasError:false,
    validGame:false,
    winItems:[],
    calledNumbers:[],
}



export const gameReducer = (state: GameState = defaultValues,action: BaseAction) => {
    switch (action.type) {
        case GameGeneratorActions.GET_GAMELIST_START:
            return {...state, games:[], loading:true,loadingGameList:true};
        case GameGeneratorActions.GET_GAMELIST_ERROR:
            return {...state, games:[], loading:false,loadingGameList:false, hasError:true, error:action.payload};
        case GameGeneratorActions.GET_GAMELIST_COMPLETED:
            return {...state, games:action.payload, loading:false,loadingGameList:false, hasError:false};
        case GameGeneratorActions.GET_GAME_PARTICIPANT_START:
            return {...state, gameParticipants:[],activeGameId:action.payload.gameId, loading:true, loadingParticipant:true, validGame:false, activeParticipantId:""}
        case GameGeneratorActions.GET_GAME_PARTICIPANT_ERROR:
            return {...state, gameParticipants:[], loading:false, hasError:true, error:action.payload, loadingParticipant:false};
        case GameGeneratorActions.GET_GAME_PARTICIPANT_COMPLETED:
            return {...state, gameParticipants:action.payload, loading:false, hasError:false, loadingParticipant:false}
        case GameGeneratorActions.VERIFY_PASSWORD_START:
            return {...state, bingoCardNumbers:[], loading:true, validGame:false, loadingCheckPassowrd:true};
        case GameGeneratorActions.VERIFY_PASSWORD_COMPLETED:
            {
                const payload: IVerifyPassowrd = action.payload;
                return {...state, bingoCardNumbers: payload.bingoCardNumbers,validGame:true, loadingCheckPassowrd:false, activeParticipantId:payload.participantId }
            }
        case GameGeneratorActions.GET_GAME_DETAILS_START:
            return {...state, loading:true, loadingGameDetails:true};
        case GameGeneratorActions.GET_GAME_DETAILS_COMPLETED:
            {    
                const payload:IGameDetails = action.payload
                return {...state, winItems:payload.winItems, calledNumbers:payload.calledNumbers.map((n)=> Number.parseInt(n.toString())), updateTime:payload.updateTime, refreshedTime:payload.refreshedTime,
                    loading:false, loadingGameDetails:false
                }
            }
        case GameGeneratorActions.GET_GAME_DETAILS_ERROR:
            return {...state}
        case GameGeneratorActions.CLAIM_BINGO_START:
        case GameGeneratorActions.CLAIM_BINGO_ERROR:
        case GameGeneratorActions.CLAIM_BINGO_COMPLETED:
            return {...state}
    }
        
    return state;
};
