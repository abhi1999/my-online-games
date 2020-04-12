// IGame, IError, IGameParticipant, IVerifyPassowrd, WinType, IGameWinItem,IGameDetails,IClaimAck
export interface IGame{
    id:string,
    _id?:string,
    name:string
}
export interface IError{
    errorMsg:string,
    details:any
}
export interface IGameParticipant{
    id:string,
    name:string,
    gameId:string
}
export interface IVerifyPassowrd{
    message:string,
    isValid:boolean,
    participantId:string,
    bingoCardNumbers:IBingoRow[]
}
export interface IBingoRow{
    letter:string,
    numbers:number[]
}
export enum WinType{
    TopLine,
    MiddleLine,
    BottomLine,
    FullHouse1,
    FullHouse2,
    FullHouse3
}
export interface IGameWinItem{
    name:string,
    type:WinType,
    isAvailabe:boolean,
    winnerName?:string
}
export interface IGameDetails{
    gameId:string
    winItems:IGameWinItem[],
    calledNumbers:number[],
    updateTime:any,
    refreshedTime:any
}
export interface IClaimAck{
    message:string
}