import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from 'react-cookie';
import { IApplicationState } from '../../reducers';
import {Alert} from 'reactstrap'
import {Row, Col,ListGroup, ListGroupItem} from "reactstrap"
import {IGame} from "./../../common/interfaces";
interface IGameProps extends RouteComponentProps, ReactCookieProps{
  applicationState:IApplicationState,
  onParticipantClicked:(gameId:string, participantId:string, password:string)=>void
}
interface IGameState {
  validSession:boolean
}
class Game extends Component<IGameProps, IGameState> {

  public constructor(props:IGameProps){
    super(props);
    this.state ={
      validSession:true
    }
    
  }
  public componentDidMount(){
    this.checkValid(this.props)
  }
  public componentWillReceiveProps(newProps:IGameProps){
    const {gamesReducer} =newProps.applicationState ;
    // const oldGamesReducer = this.props.applicationState.gamesReducer; 
    if(gamesReducer.validGame){
        this.props.history.push('/Bingo/Games/'+gamesReducer.activeGameId +"/"+ gamesReducer.activeParticipantId)
    }
   /* else if(gamesReducer.loadingCheckPassowrd !== oldGamesReducer.loadingCheckPassowrd && oldGamesReducer.loadingCheckPassowrd!== undefined){
        debugger;
        alert('invalid password')
    }*/
  }
  private checkValid=(props:IGameProps)=>{
      const params:any =props.match && props.match.params ? props.match.params:{}
      if(params.gameId !== props.applicationState.gamesReducer.activeGameId){
        this.setState({validSession:false})
        setTimeout(()=>{props.history.push('/')}, 3000)
      }

  }
  private loading = (msg?:string) => <div className="animated fadeIn pt-1 text-center">{msg?msg:"Loading..."}</div>
  private clickOnParticipant = (gameId:string, participantId:string)=>{
    this.props.onParticipantClicked(gameId, participantId, participantId);
  }
  
  public render() {
    if(!this.state.validSession){
        return  <Alert color="danger">
        You have reached an invalid page.  Redirecting to home page.
      </Alert>
    }
    const {gamesReducer}= this.props.applicationState
    const game=gamesReducer.games.find((g:IGame)=> g.id===gamesReducer.activeGameId)
    return (
        <div>
                <h5 className="display-3">{game?.name}</h5>
                <p className="lead">Select the Participant</p>
                <hr className="my-2" />
                <Row>
                    <Col>
                        <ListGroup>
                            {gamesReducer.loadingParticipant?this.loading("Loading Participant"):""}
                            {gamesReducer.loadingCheckPassowrd?this.loading("Checking password"):""}
                            {gamesReducer.gameParticipants.map(p=> <ListGroupItem key={p.id} tag="button" onClick={()=>this.clickOnParticipant(gamesReducer.activeGameId, p.id)}>{p.id}-{p.name}</ListGroupItem>)}                     
                        </ListGroup>
                    </Col>
                    <Col>
                       
                    </Col>
                </Row>
            </div> 
            
    );
  }
}

export default withCookies(withRouter(Game));
