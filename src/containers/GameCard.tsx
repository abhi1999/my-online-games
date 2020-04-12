import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from 'react-cookie';
import { IApplicationState } from '../reducers';
import {Alert} from 'reactstrap'
import {Row, Col} from "reactstrap"
import {IGame,IGameParticipant, IBingoRow} from "./../common/interfaces";
/** Redux  */
import {connect} from 'react-redux';
import { NotificationActions, GameActions } from './../actions';
import {INotifyOptions} from "./../common";
import classnames from "classnames";
import {IGameWinItem} from "./../common/interfaces";
interface IGameProps extends RouteComponentProps, ReactCookieProps{
  applicationState:IApplicationState,
  onParticipantClicked:(gameId:string, participantId:string)=>void,
  stopPolling:()=>void
}
interface IGameState {
  validSession:boolean,
  calledNumbers:number[],
  lastCalledNumbers:number[],
  markedNumbers:number[]
}
class GameCard extends Component<IGameProps, IGameState> {

  public constructor(props:IGameProps){
    super(props);
    this.state ={
      validSession:true,
      calledNumbers:props.applicationState.gamesReducer.calledNumbers,
      lastCalledNumbers:[],
      markedNumbers:props.applicationState.gamesReducer.calledNumbers
    }
    
  }
  public componentDidMount(){
    this.checkValid(this.props);
    // start refresh
  }
  public componentWillUnmount(){
      this.props.stopPolling();
    // stop refresh
  }
  public componentWillReceiveProps(newProps:IGameProps){
    const {calledNumbers} = newProps.applicationState.gamesReducer
    this.setState({calledNumbers})
  }
  private checkValid=(props:IGameProps)=>{
      const params:any =props.match && props.match.params ? props.match.params:{}
      if(params.gameId !== props.applicationState.gamesReducer.activeGameId){
        this.setState({validSession:false, })
        setTimeout(()=>{props.history.push('/')}, 3000)
      }

  }
  private loading = (msg?:string) => <div className="animated fadeIn pt-1 text-center">{msg?msg:"Loading..."}</div>
 
  public render() {
    if(!this.state.validSession){
        return  <Alert color="danger">
        You have reached an invalid page.  Redirecting to home page.
      </Alert>
    }
    const {gamesReducer}= this.props.applicationState
    const game=gamesReducer.games.find((g:IGame)=> g.id===gamesReducer.activeGameId);
    const gameParticipant = gamesReducer.gameParticipants.find((gp:IGameParticipant)=> gp.id === gamesReducer.activeParticipantId)
    return (
        <div className="bingo-card">
            <h5 className="display-5">{game? game.name:""} - {gameParticipant? gameParticipant.name:""}</h5>
            <p className="lead">Play Your Bingo</p>
                <hr className="my-2" />
                <Row>
                    <Col className="bingo-table">
                        <span>My Bingo Card</span>
                        {this.myBingoCard()}
                    </Col>
                   
                    <Col>
                        <span>Available Prizes</span>
                        {this.listOfAvailablePrizes()}
                    </Col>
                </Row>
                <hr className="my-2" />
                <Row>
                    <Col>
                        <span>Called Numbers</span>
                       {this.getCalledNumbers()}
                    </Col>
                </Row>
            </div>       
    );
  }
  private listOfAvailablePrizes = ()=>{
      const {gamesReducer} = this.props.applicationState
      return <ul>
          {gamesReducer.winItems.map((w:IGameWinItem)=><li key={w.name}>{w.name}</li>)}
      </ul>
  }
  private bingoRow =(rowNumber:number)=>{
    const colTags =["B","I","N","G","O"];
    const {gamesReducer} = this.props.applicationState
    const {calledNumbers} = this.state;
    const bingoRow = gamesReducer.bingoCardNumbers;
    return <Row key={rowNumber}>
            {colTags.map((c, index)=>{
                if(rowNumber ===2 && index ===2){
                    return <Col key={index} className={classnames('fixed')}>FREE</Col>
                }
                let indexToUse = rowNumber;
                if(rowNumber >=2 && index===2){
                    indexToUse = rowNumber-1;
                }
                const row:IBingoRow|undefined = bingoRow.find(b=>b.letter.toLocaleLowerCase()===c.toLocaleLowerCase())
                const cellVal = row?row.numbers[indexToUse]:-1
                const checked = calledNumbers.find(n=> n.toString()===cellVal.toString())!== undefined
                console.log('cell Value')
                return <Col key={index} className={classnames({'checked':checked})}>{row?cellVal:""}</Col>
                }
            )}
        </Row>
  }
  private myBingoCard = () =>{
    const colTags =["B","I","N","G","O"];
    return <div>
            <Row className="header">
                {colTags.map(c=><Col color="info" key={c}>{c}</Col>)}
            </Row>
            {colTags.map((c, index)=>this.bingoRow(index))}
        </div>
   /* {gamesReducer.gameParticipants.map(p=> <ListGroupItem key={p.id} tag="button" onClick={()=>this.clickOnParticipant(gamesReducer.activeGameId, p.id)}>{p.id}-{p.name}</ListGroupItem>)}                     
    </ListGroup>
    */
  }
  private getCalledNumbers = ()=>{
    const rowsTags =["B","I","N","G","O"];
    const rows =[0,1,2,3,4];
    const cols =[1,2,3,4,5,6,7,8,9,10, 11, 12,13, 14, 15];
    const {calledNumbers}= this.state
    return <table className="table table-sm bingo-numbers">
            <tbody>
            {rows.map(r=>{
                return <tr key={r}>
                    <th scope="row">{rowsTags[r]}</th>
                    {cols.map(c=>{
                        const colVal = c+r*15;
                        const called=calledNumbers.find(c=> c.toString() === colVal.toString())!== undefined
                        return <td className={classnames({'called':called})} key={colVal}>{colVal}</td>
                    })}
                </tr>
            })}
            </tbody>
        </table>
  }
}




const mapStateToProps = (state: IApplicationState, ownProps?:any) => ({
    ...ownProps,
    applicationState:state
});

  
const mapDispatchToProps = (dispatch: any)  => ({
  NotifyError: (notification:INotifyOptions) => dispatch(NotificationActions.NotifyError(notification)),
  NotifySuccess: (notification:INotifyOptions) => dispatch(NotificationActions.NotifySuccess(notification)),
  onBingoCalled:()=>{
      alert('Bingo')
  },
  loadGameList:()=>{
    // start initializing the state
    // dispatch(LookupActions.getAllLookupAction());
    dispatch(GameActions.getGameListStartAction());
  },
  stopPolling:()=>{
      dispatch(GameActions.stopPolling())
  }
})

export default  connect(mapStateToProps, mapDispatchToProps)(withCookies(withRouter(GameCard)));