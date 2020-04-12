import React, { Component } from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from 'react-cookie';
import InstagramEmbed from 'react-instagram-embed';
import {Row, Col,ListGroup, ListGroupItem} from "reactstrap"
import { IApplicationState } from '../../reducers';
// sidebar nav config


interface IDefaultLayoutProps extends RouteComponentProps, ReactCookieProps{
  onGameItemClicked:(gameId:string)=>void
  applicationState:IApplicationState
}
interface IDefaultLayoutState {
  validSession:boolean
}
class GameList extends Component<IDefaultLayoutProps, IDefaultLayoutState> {

  public constructor(props:IDefaultLayoutProps){
    super(props);
    this.state ={
      validSession:false
    }
  }

  private loading = () => <div className="animated fadeIn pt-1 text-center">Loading Game list...</div>
  private navigateToGame=(gameId:string)=> {
      const {history, onGameItemClicked} = this.props;
      onGameItemClicked(gameId);
      history.push("/Bingo/Games/"+gameId)
  }
  public render() {
    const gamesReducer = this.props.applicationState.gamesReducer
    const games = gamesReducer.games?gamesReducer.games:[];
    console.log('reducer', gamesReducer)
    return (
            <div>
                <h5 className="display-4">Aadi's Bingo Bash</h5>
                <p className="lead">Select a game that you would like to play.  You will need a password to enter the game</p>
                <hr className="my-2" />
                <Row>
                    <Col sm="12" md="6">
                        <ListGroup>
                            {gamesReducer.loading?this.loading():""}
                            {games.map(g=> <ListGroupItem key={g.id} tag="button" onClick={()=>this.navigateToGame(g.id)}>{g.name}</ListGroupItem>)}                     
                        </ListGroup>
                    </Col>
                    <Col sm="12" md="6">
                        <InstagramEmbed
                                        url='https://instagr.am/p/B-z9OkPBKmz/'
                                        maxWidth={320}
                                        hideCaption={false}
                                        containerTagName='div'
                                        protocol=''
                                        injectScript
                                        onLoading={() => {}}
                                        onSuccess={() => {}}
                                        onAfterRender={() => {}}
                                        onFailure={() => {}}
                                        />
                    </Col>
                </Row>
            </div>    
    );
  }
}

export default withCookies(withRouter(GameList));